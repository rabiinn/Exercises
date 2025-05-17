import {useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Display from "./components/Display";
import Filter from "./components/Filter" ;
import server from "./services/server";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [msg, setMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(
    () => {
      server.getAll().then((res) =>{
        setPersons(res.data)
      })
    },[]
  )

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };

    const existingPerson = persons.find(person => person.name === newPerson.name);

    if (existingPerson) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, 
      replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        server.updateNum(existingPerson.id, updatedPerson)
          .then(res => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : res.data
            ));
          })
          .catch(() => {
            setErrorMsg(`Information of ${updatedPerson.name} has already been removed from server`);
            setTimeout(() => {
              setErrorMsg(null);
            }, 5000);
          });
        setNewName('');
        setNewNumber('');
      }
      
    else {
      setNewName('');
      setNewNumber('');
      }
    return;
    }
    
    server.create(newPerson).then((res) => {
      setPersons(persons.concat(res.data));
      setNewName('');
      setNewNumber('');
      setMsg(`Added ${newPerson.name}`);
      setTimeout(() => {
        setMsg(null);
      }, 5000);
    });
  }

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()))


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
   setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    server.update(id)
    .then(() => {
      const newPersons = persons.filter(person => person.id !== id)
      setPersons(newPersons)
    })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={msg} type="success"/>
      <Notification msg={errorMsg} type="error"/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <PersonForm addName={addName} 
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
       />
      <h2>Numbers</h2>
      <Display phonebook={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App