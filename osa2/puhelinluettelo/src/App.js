import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './Components/Form'
import PersonListing from './Components/PersonListing'
import Filter from './Components/Filter'

const App = () => {
    const [ persons, setPersons ] = useState([''])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')

    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }

    useEffect(hook, []) // NOTE empty array means that effect is only activated on first render.
  
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
    if(persons=='') {
        return (
            <div>Loading</div>
        )
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

