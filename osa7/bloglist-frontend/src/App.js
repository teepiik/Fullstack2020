import React, { useEffect } from 'react'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogListing from './components/BlogListing'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { Button } from 'react-bootstrap'
import { notificationChange } from './reducers/notificationReducer'
import { setUser, logout } from './reducers/userReducer'
import blogService from './services/blogs'
import './App.css'

let timeOutID = 0

const App = () => {
    const dispatch = useDispatch()
    let user = useSelector(({ user }) => {
        return user
    })

    useEffect(() => {
        dispatch(initializeBlogs())
    },[dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const parsed = JSON.parse(loggedUserJSON)
            dispatch(setUser(parsed))
            blogService.setToken(parsed.token)
        }
    }, [dispatch])

    const blogFormRef = React.createRef()

    const handleLogout = async () => {
        dispatch(logout())
        blogService.setToken('')
        timeOutID = dispatch(notificationChange('Logged out', 5, timeOutID))
    }

    if(user.user === null) {
        return (
            <div className='container'>
                <Notification />
                <Login />
            </div>
        )
    }

    return (
        <div className='container'>
            <h2>Blogs</h2>
            <Notification />
            <p>Logged in as {user.username}</p>
            <Button variant='dark' onClick={() => handleLogout()}>logout</Button>
            <Togglable buttonLabel='New Blog' ref={blogFormRef}>
                <BlogForm />
            </Togglable>
            <BlogListing />
        </div>
    )
}

export default App