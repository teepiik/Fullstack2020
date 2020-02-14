import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Notification from './components/Notification'
import { Button } from 'react-bootstrap'
import './App.css'

const App = () => {
    const [blogs, setBlogs] = useState([''])
    const [message, setMessage] = useState(null)
    const [user, setUser] = useState(null)

    // Custon Hook for form fields.
    const useField = (type) => {
        const [value, setValue] = useState('')

        const onChange = (event) => {
            setValue(event.target.value)
        }

        const setEmpty = () => {
            setValue('')
        }

        return {
            setEmpty: setEmpty,
            field: { type, value, onChange }
        }
    }
    // Form field states
    const username = useField('text')
    const password = useField('password')

    useEffect(() => {
        const fetchData = async () => {
            const res = await blogService.getAll()
            setBlogs(res)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username:username.field.value, password:password.field.value })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUser(user)
            username.setEmpty()
            password.setEmpty()
            setUpNotification(`Logged in as ${user.username}`)
        } catch (error) {
            setUpNotification('Login failed.')
            password.setEmpty()
        }
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
        setUpNotification('Logged out')
    }

    const setUpNotification = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    if(user === null) {
        return (
            <div className='container'>
                <Notification message={message} />
                <Login handleLogin={handleLogin}
                    username={username.field}
                    password={password.field}
                />
            </div>
        )
    }

    return (
        <div className='container'>
            <h2>Blogs</h2>
            <Notification message={message} />
            <p>Logged in as {user.username}</p>
            <Button variant='dark' onClick={() => handleLogout()}>logout</Button>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App