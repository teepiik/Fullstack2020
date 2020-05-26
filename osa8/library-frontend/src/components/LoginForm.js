import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ login, result ] = useMutation('LOGIN', {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if(result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
        }
    }, [result.data]) // eslint-disable-line

    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password }})
    }

    // CONTINUE HERE, TODO LOGINFORM, createUser form + functionality etc.
    return (
        <div>
            
        </div>
    )
}

export default LoginForm