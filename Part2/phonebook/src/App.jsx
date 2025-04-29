import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Display from "./components/Display";
import Filter from "./components/Filter" ;
const App = () => {
  const [persons, setPersons] = useState([{name: 'Arto Hellas', number:'123'}])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log(newName)
    const newPerson = {
      name:newName,
      number:newNumber
    }
   const nameExists = persons.some(person => person.name === newPerson.name)
   if(nameExists){
    alert(`${newName} is already added to phonebook`)
    setNewName('')
    setNewNumber('')
    return
   }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <PersonForm addName={addName} 
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
       />
      <h2>Numbers</h2>
      <Display phonebook={filteredPersons}/>
    </div>
  )
}

export default App