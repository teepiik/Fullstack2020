import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
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
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

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

    const blogFormRef = React.createRef()

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

    const handleNewBlog = async (event) => {
        event.preventDefault()
        try {
            const blogObject = {
                title: title.field.value,
                url: url.field.value,
                author: author.field.value,
                user: {
                    username: user.username,
                    name: user.name
                },
                likes: 0
            }
            blogService.setToken(user.token)

            blogFormRef.current.toggleVisibility()
            const newBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(newBlog))
            setUpNotification(`${newBlog.title} created!`)
        } catch (error) {
            setUpNotification('New blog creation failed')
        }
    }

    const handleLike = async (blog) => {
        try {
            blog.likes += 1
            const updatedBlog = await blogService.update(blog.id, blog)
            setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
        } catch (error) {
            setUpNotification(error)
        }
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
            <Togglable buttonLabel='New Blog' ref={blogFormRef}>
                <BlogForm
                    handleNewBlog={handleNewBlog}
                    title={title.field}
                    author={author.field}
                    url={url.field}
                />
            </Togglable>
            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={handleLike}
                    user={user}
                />
            )}
        </div>
    )
}

export default App