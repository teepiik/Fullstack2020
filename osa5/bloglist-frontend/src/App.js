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
    const [username, setUsername] = useState([''])
    const [password, setPassword] = useState([''])
    const [title, setTitle] = useState([''])
    const [author, setAuthor] = useState([''])
    const [url, setUrl] = useState([''])

    useEffect(() => {
        const fetchData = async () => {
            const res = await blogService.getAll()
            setBlogs(res.sort((a,b) => b.likes - a.likes))
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
            const user = await loginService.login({ username:username, password:password })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
            setUpNotification(`Logged in as ${user.username}`)
        } catch (error) {
            setUpNotification('Login failed.')
            setPassword('')
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
                title: title,
                url: url,
                author: author,
                likes: 0
            }
            blogService.setToken(user.token)

            blogFormRef.current.toggleVisibility()
            const newBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(newBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
            setUpNotification(`${newBlog.title} created!`)
        } catch (error) {
            setUpNotification('New blog creation failed')
        }
    }

    const handleLike = async (blog) => {
        try {
            blog.likes += 1
            const updatedBlog = await blogService.update(blog.id, blog)
            setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog).sort((a,b) => b.likes - a.likes))
        } catch (error) {
            setUpNotification(error)
        }
    }

    const handleDelete = async (blog) => {
        try {
            blogService.setToken(user.token)
            await blogService.destroy(blog.id)
            setUpNotification(`${blog.title} deleted`)
            setBlogs(blogs.filter(b => b.id !== blog.id))
        } catch (error) {
            setUpNotification('Error with delete.')
        }
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
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
                    username={username}
                    password={password}
                    handleUsernameChange={handleUsernameChange}
                    handlePasswordChange={handlePasswordChange}
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
                    title={title}
                    author={author}
                    url={url}
                    handleTitleChange={handleTitleChange}
                    handleAuthorChange={handleAuthorChange}
                    handleUrlChange={handleUrlChange}
                />
            </Togglable>
            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={handleLike}
                    user={user}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    )
}

export default App