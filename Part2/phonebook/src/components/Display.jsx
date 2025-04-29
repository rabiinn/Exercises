const Display = ({phonebook}) => {
    return (
        <div>
            {phonebook.map((person,index) =>(
              <p key={index}>{person.name} {person.number}</p> 
            ))}
        </div>
      )
}

export default Display