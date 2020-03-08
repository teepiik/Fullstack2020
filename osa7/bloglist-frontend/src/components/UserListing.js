import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserListing = () => {
    const users = useSelector(({ users }) => {
        return users
    })
    if(users==='') {
        return null
    }

    const rows = () =>
        users.map(user =>
            <li key={user.id}>
                <Link to={`/users/${user.id}`}>{user.username}</Link>, has {user.blogs.length} blogs.
            </li>)

    return (
        <div>
            <h3>Users</h3>
            <ul>
                {rows()}
            </ul>
        </div>
    )
}

export default UserListing