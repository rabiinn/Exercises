const Display = ({phonebook,handleDelete}) => {
    return (
        <div>
            {phonebook.map((person,index) =>(
              <p key={index}> 
              {person.name}
              {person.number}
              <button onClick={()=> {
                if(window.confirm(`Delete ${person.name} ?`))
                {
                  handleDelete(person.id)
                }
                
                }}>delete</button>
              </p> 
            ))}
        </div>
      )
}

export default Display