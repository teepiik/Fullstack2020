import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { like, destroy } from '../reducers/blogReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'
import Comments from './Comments'

let timeOutID = 0

const Blog = () => {
    const dispatch = useDispatch()

    const blogs = useSelector(({ blogs }) => {
        return blogs
    })

    try {
        const match = useRouteMatch('/blogs/:id')
        const blog = blogs.find(u => u.id === match.params.id)

        const handleLike = async (blog) => {
            try {
                dispatch(like(blog))
                timeOutID = dispatch(notificationChange(`You liked "${blog.title}"`, 5, timeOutID))
            } catch (error) {
                console.log(error)
            }
        }

        const handleDelete = async (blog) => {
            dispatch(destroy(blog.id))
            timeOutID = dispatch(notificationChange(`You deleted "${blog.title}"`, 5, timeOutID))
        }

        if(blog==='' || blog===null || blog===undefined) {
            return <p>blog not found</p>
        }

        let comments = []
        console.log(blog)
        if(blog.comments) {
            comments = blog.comments
        }

        return (
            <div>
                <h3>{blog.title}</h3>
                <p>Url: {blog.url}</p>
                <p>This blog has {blog.likes} likes</p>
                <Button className='button' variant='dark' onClick={() => handleLike(blog)}>Like</Button>
                <Button className='button' variant='dark' onClick={() => handleDelete(blog)}>Delete</Button>
                <Comments id={blog.id} comments={comments}/>
            </div>
        )

    } catch (error) {
        console.log(error)
        return null
    }
}

export default Blog