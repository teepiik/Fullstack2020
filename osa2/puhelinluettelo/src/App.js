import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './Components/Form'
import PersonListing from './Components/PersonListing'
import Filter from './Components/Filter'
import personService from './Services/personService'

const App = () => {
    const [ persons, setPersons ] = useState([''])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ nextId, setNextId ] = useState(10)

    const hook = () => {
        personService
            .getAll()
            .then(persons => setPersons(persons))
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
            number: newNumber,
            id: nextId
        }
        setNextId(nextId + 1)

        const names = persons.map(person => person.name)
        if(names.includes(newName)) {
            const result = window.confirm('Phonebook already contains that person. Would you like to update that number?')
            if(result) {
                const updatable = persons.find(person => person.name == newName)
                updatable.number = newNumber
                personService
                    .update(updatable.id, updatable)
                    .then(alert("Person updated."))
            }
        } else {
            personService
                .create(personObject)
                .then(response => {
                    setPersons(persons.concat(personObject))
                })
        }
        setNewName('')
        setNewNumber('')
    }

    const deletePerson = (id) => {
        const result = window.confirm("Confirm delete")
        if(result) {
            personService.destroy(id)
                .then(setPersons(persons.filter(person => person.id !== id)))
        }    
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
            <PersonListing persons={persons} filter={filter} deletePerson={deletePerson}/>
        </div>
    )
}

export default App

