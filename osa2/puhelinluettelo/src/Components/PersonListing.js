import React from 'react'

const Person = (props) => {
    return (
        <li key={props.name}>
            <p>Name: {props.person.name}</p>
            <p>Number: {props.person.number}</p>
            <button onClick={(event) => props.deletePerson(props.person.id)} >Delete</button>
        </li>
    )
}

const PersonListing = (props) => {
    const personsToShow = props.persons.filter(person => person.name.includes(props.filter))

    const showPersons = () => personsToShow.map(
        person => <Person key={person.id} person={person} deletePerson={props.deletePerson}/>
    )

    return (
        <div>
            <h2>Persons on phonebook</h2>
            <ul>
                {showPersons()}
            </ul>
        </div>
    )
}

export default PersonListing