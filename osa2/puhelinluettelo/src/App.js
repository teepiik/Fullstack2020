import React, { useState, useEffect } from 'react'
import Form from './Components/Form'
import PersonListing from './Components/PersonListing'
import Filter from './Components/Filter'
import personService from './Services/personService'
import Notification from './Components/Notification'
import Error from './Components/Error'
import './app.css'

const App = () => {
    const [ persons, setPersons ] = useState([''])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ message, setMessage] = useState(null)
    const [ error, setError] = useState(null)

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
        }

        try {
            const names = persons.map(person => person.name)
            if(names.includes(newName)) {
                const result = window.confirm('Phonebook already contains that person. Would you like to update that number?')
                if(result) {
                    const updatable = persons.find(person => person.name == newName)
                    updatable.number = newNumber
                    personService
                        .update(updatable.id, updatable)
                        .then(setMessage(`'${personObject.name}' was updated.`))
                        .catch(error => {
                            setError(`${error}`)
                        })
                        setTimeout(() => {
                            setMessage(null)
                            setError(null)
                          }, 5000)
                }
            } else {
                personService
                    .create(personObject)
                    .then(hook())
                    .catch(error => {
                        console.log(error.response.data)
                        setError(`${error.response.data.error}`)
                    })
                if(message === null) {
                    setMessage(`${personObject.name} was added.`)
                }      
                setTimeout(() => {
                  setMessage(null)
                  setError(null)
                }, 5000)
            }
            setNewName('')
            setNewNumber('')

        } catch(error) {
            setError('Oops we did a doopsie')
              setTimeout(() => {
                setError(null)
              }, 5000)
        }  
    }

    const deletePerson = (id) => {
        const result = window.confirm("Confirm delete")
        try {
            if(result) {
                personService.destroy(id)
                    .then(setPersons(persons.filter(person => person.id !== id)))
            }

        } catch(error) {
            setError('Error happened with delete.')
              setTimeout(() => {
                setMessage(null)
              }, 5000)
        }  
    }

    if(persons=='') {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div>
            <Notification message={message}/>
            <Error message={error}/>
            <Filter handleFilterChange={handleFilterChange} />
            <Form newName={newName} newNumber={newNumber} handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange} addNewPerson={addNewPerson}/> 
            <PersonListing persons={persons} filter={filter} deletePerson={deletePerson}/>
        </div>
    )
}

export default App

