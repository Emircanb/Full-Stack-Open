const Persons = ({persons, newFilter}) => {
    console.log('Persons', persons, newFilter)
    return (
        <ul>
            {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
            .map(person => <Person person={person} />)}
        </ul>
    )
}

const Person = ({person}) => {
    return (
        <li key={person.name}>{person.name} {person.number}</li>
    )
}

export default Persons