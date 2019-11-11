import React from 'react'

const Form = (props) => {
    
    return (
        <div>
            <h2>Add new Person</h2>
            <form onSubmit={props.addNewPerson}>
                <div>
                    name: <input value={props.newName} onChange={props.handleNameChange}/>
                </div>
                <div>
                    number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default Form