import React from 'react'

const Person = (props) => {
    return (
        <li key={props.name}>
            <p>Name: {props.name}</p>
            <p>Number: {props.number}</p>
        </li>
    )
}

const PersonListing = (props) => {
    const personsToShow = props.persons.filter(person => person.name.includes(props.filter))

    const showPersons = () => personsToShow.map(
        person => <Person key={person.name} name={person.name} number={person.number}/>
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