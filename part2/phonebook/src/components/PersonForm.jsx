const PersonForm =({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
const Persons = ({persons, newFilter, deletePerson}) => {
    return (
        <>
            {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
            .map(person => <Person key={person.id} person={person} deletePerson={deletePerson}/>)}
        </>
    )
}

const Person = ({person, deletePerson}) => {
    return (
        <div>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>
    )
}

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange} />
    </div>
  )
}     
export { PersonForm, Persons, Filter }