import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

const User = () => {
    const users = useSelector(({ users }) => {
        return users
    })

    try {
        const match = useRouteMatch('/users/:id')
        const user = users.find(u => u.id === match.params.id)

        if(user==='' || user===null || user===undefined) {
            return <p>User not found</p>
        }

        const rows = () =>
            user.blogs.map(blog => <li key={blog.title}>{blog.title}</li>)

        return (
            <div>
                <h3>{user.username}</h3>
                <p>Blogs added</p>
                <ul>
                    {rows()}
                </ul>

            </div>
        )

    } catch (error) {
        console.log(error)
        return null
    }
}

export default User