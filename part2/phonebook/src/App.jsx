import { useState, useEffect } from 'react'
import {PersonForm, Filter, Persons} from './components/PersonForm'
import axios from 'axios'
import phoneService from './services/phonebook'
import Notification from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    type: 'success'
  })

  useEffect(() => {
    phoneService.getAll().
    then((response) => {
      setPersons(response)
    })
  }, [])

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (person) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        updateNumber(person.id)
      return
      
    }
    phoneService.create({ name: newName, number: newNumber }).
    then((response) => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
      setNotification({message:`Added ${response.name}`, type:'success'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
  })}

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    console.log(person)
    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }
    phoneService.deleteObject(id).
    then(() => {
      setPersons(persons.filter(p => p.id !== id))
      setNotification({message:`Deleted ${person.name}`, type:'success'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
    .catch(error => {
      setNotification({message:`Information of ${person.name} has already been removed from server`, type:'error'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setPersons(persons.filter(p => p.id !== id))
    }
    )   
  }

  const updateNumber = (id) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number: newNumber }
    phoneService.update(id, changedPerson).
    then((response) => {
      setPersons(persons.map(p => p.id !== id ? p : response))
      setNewName('')
      setNewNumber('')
      setNotification({message:`Updated ${response.name}'s number`, type:'success'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...notification}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} /> 
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App