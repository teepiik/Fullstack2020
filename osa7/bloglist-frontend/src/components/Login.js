import React from 'react'
import { useField } from '../hooks/index'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'

let timeOutID = 0

const Login = () => {
    const username = useField('text')
    const password = useField('password')
    const dispatch = useDispatch()

    const handleLogin = async () => {
        try {
            await dispatch(login({ username: username.field.value , password: password.field.value }))
            username.setEmpty()
            password.setEmpty()
            timeOutID = dispatch(notificationChange('Logged in', 5, timeOutID))

        } catch (error) {
            console.log(error)
            timeOutID = dispatch(notificationChange('Login failed', 5, timeOutID))
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input
                        {...username.field}
                    />
                </div>
                <div>
                    Password
                    <input
                        {...password.field}
                    />
                </div>
                <button type="submit" id='loginButton'>login</button>
            </form>
        </div>
    )
}

export default Login