import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

let timeOutID = 0

const AnecdoteForm = (props) => {

    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        timeOutID = await props.notificationChange(`You created "${content}"`, 10, timeOutID)
    }

    return (
        <div>
            <h2>create new</h2> 
            <form onSubmit={addNew}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}


export default connect(
    null,
    {createAnecdote, notificationChange}
    )(AnecdoteForm)