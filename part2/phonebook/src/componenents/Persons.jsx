const Persons = ({persons, newFilter}) => {
    return (
        <>
            {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
            .map(person => <Person person={person} />)}
        </>
    )
}

const Person = ({person}) => {
    return (
        <div key={person.name}>{person.name} {person.number}</div>
    )
}

export default Persons