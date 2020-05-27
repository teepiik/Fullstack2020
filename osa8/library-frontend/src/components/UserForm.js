import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries'

const UserForm = ({ setError }) => {
    const [ username, setUsername ] = useState('')
    const [ favoriteGenre, setFavoriteGenre ] = useState('')

    const [ create, result ] = useMutation(CREATE_USER, {
        onError: (error) => {
            if(error.graphQLErrors.length > 0) {
                setError(error.graphQLErrors[0].message)
            } else {
                console.log(error)
            }
        }
    })

    useEffect(() => {
        if(result.data) {
            console.log(result.data)
        }
    }, [result.data]) // eslint-disable-line

    const submit = async (event) => {
        event.preventDefault()
        create({ variables: { username, favoriteGenre }})
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    favoriteGenre
                    <input
                        value={favoriteGenre}
                        onChange={({ target }) => setFavoriteGenre(target.value)}
                    />
                </div>
                <button type='submit'>create</button>
            </form>            
        </div>
    )
}

export default UserForm