import React, { useState } from 'react'
import Form from './Components/Form'
import PersonListing from './Components/PersonListing'
import Filter from './Components/Filter'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas',
        number: '040123456' },
        { name: 'Ronaldo',
        number: '040123456' },
        { name: 'Harry Kane',
        number: '040123456' }
    ])

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
  
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const addNewPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        const names = persons.map(person => person.name)
        if(names.includes(newName)) {
            alert('Phonebook contains that name. New person not added.')
        } else {
            setPersons(persons.concat(personObject))
        }
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <Filter handleFilterChange={handleFilterChange} />
            <Form newName={newName} newNumber={newNumber} handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange} addNewPerson={addNewPerson}/> 
            <PersonListing persons={persons} filter={filter}/>
        </div>
    )
}

export default App

