import React from 'react'

// 5.7 don't use togglable, just component state and two versions
// 5.8 add like button to likes
const Blog = (props) => {
    return (
        <div>
            {props.blog.title}
        </div>
    )
}

export default Blog