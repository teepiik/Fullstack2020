import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleVote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if(filter === '') {
            return anecdotes
        }
        const filtered = anecdotes.filter(anecdote => anecdote.content.includes(filter))
        return filtered
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(handleVote(anecdote.id))
        dispatch(notificationChange(`You voted "${anecdote.content}"`))
        setTimeout(() => {
            dispatch(notificationChange(null))
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList