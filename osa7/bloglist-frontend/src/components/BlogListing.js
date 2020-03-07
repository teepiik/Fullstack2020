import React from 'react'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'
import { like, destroy } from '../reducers/blogReducer'

let timeOutID = 0

const BlogListing = () => {
    const blogs = useSelector(({ blogs }) => {
        return blogs
    })

    const user = useSelector(({ user }) => {
        return user
    })

    const dispatch = useDispatch()

    /* try {
            blog.likes += 1
            const updatedBlog = await blogService.update(blog.id, blog)
            setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog).sort((a,b) => b.likes - a.likes))
        } catch (error) {
            setUpNotification(error)
        }*/

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

    return (
        <div>
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

export default BlogListing