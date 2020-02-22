import React, { useState } from 'react'

const DeleteButton = (props) => {
    // To prevent crashing when user is not defined
    if (props.user === null || props.blog.user === null) {
        return null
    }

    if (props.blog.user.id !== props.user.id) {
        return null
    }

    return (
        <div>
            <button onClick={() => props.handleDelete(props.blog)}>delete</button>
        </div>
    )
}

const Blog = (props) => {
    const [extended, setExtended] = useState(false)

    if(extended===false) {
        return (
            <div>
                <p id='blogHeader'>{props.blog.title} by {props.blog.author}</p>
                <button onClick={() => setExtended(true)}>show more</button>
            </div>
        )
    }
    return (
        <div>
            <h4 id='blogHeader'>{props.blog.title} by {props.blog.author}</h4>
            <p id='blogUrl'>Url: {props.blog.url}</p>
            <p id='blogLikes'>{props.blog.likes} likes</p>
            <button onClick={() => props.handleLike(props.blog)}>like</button><br></br>
            <DeleteButton
                blog={props.blog}
                user={props.user}
                handleDelete={props.handleDelete}
            />
            <button onClick={() => setExtended(false)}>show less</button>
        </div>
    )
}

export default Blog