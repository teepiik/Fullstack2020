import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnec = await anecdoteService.create(content)
        dispatch(createAnecdote(newAnec))
        dispatch(notificationChange(`You created "${content}"`))
        setTimeout(() => {
            dispatch(notificationChange(null))
        }, 5000)
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

export default AnecdoteForm