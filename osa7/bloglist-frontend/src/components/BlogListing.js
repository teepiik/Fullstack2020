import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const BlogListing = () => {
    const blogs = useSelector(({ blogs }) => {
        return blogs
    })

    if(blogs==='') {
        return null
    }
    const rows = () =>
        blogs.map(blog =>
            <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>)

    return (
        <div>
            <h3>Blogs</h3>
            <ul>
                {rows()}
            </ul>
        </div>
    )
}

export default BlogListing