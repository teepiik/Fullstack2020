import React, { useEffect } from 'react'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogListing from './components/BlogListing'
import Menu from './components/Menu'
import Blog from './components/Blog'
import User from './components/User'
import UserListing from './components/UserListing'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Button } from 'react-bootstrap'
import { notificationChange } from './reducers/notificationReducer'
import { setUser, logout } from './reducers/userReducer'
import blogService from './services/blogs'
import {
    BrowserRouter as Router,
    Switch, Route, Redirect
} from 'react-router-dom'
import './App.css'

let timeOutID = 0

const Logout = (props) => {
    props.logout()
    return (
        <Redirect to='/'/>
    )
}

const App = () => {
    const dispatch = useDispatch()
    let user = useSelector(({ user }) => {
        return user
    })

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    },[dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const parsed = JSON.parse(loggedUserJSON)
            dispatch(setUser(parsed))
            blogService.setToken(parsed.token)
        }
    }, [dispatch])

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

    // FIX USER.USER
    return (
        <Router>
            <div className='container'>
                <Menu />
                <Notification />
                <p>Logged in as {user.username}</p>
                <Button variant='dark' onClick={() => handleLogout()}>logout</Button>
                <Switch>
                    <Route path='/create'>
                        <BlogForm />
                    </Route>
                    <Route path='/blogs/:id'>
                        <Blog />
                    </Route>
                    <Route path='/blogs/'>
                        <BlogListing />
                    </Route>
                    <Route path='/users/:id'>
                        <User />
                    </Route>
                    <Route path='/users/'>
                        <UserListing />
                    </Route>
                    <Route path='/logout/'>
                        <Logout logout={handleLogout}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App