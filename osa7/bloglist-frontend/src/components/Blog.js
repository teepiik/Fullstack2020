import React, { useState } from 'react'

const Blog = (props) => {
    const [extended, setExtended] = useState(false)

    if(extended===false) {
        return (
            <div>
                <p id='blogHeader'>{props.blog.title} by {props.blog.author}</p>
                <button id={`show${props.blog.title}`} onClick={() => setExtended(true)}>show more</button>
            </div>
        )
    }
    return (
        <div>
            <h4 id='blogHeader'>{props.blog.title} by {props.blog.author}</h4>
            <p id='blogUrl'>Url: {props.blog.url}</p>
            <p id='blogLikes'>{props.blog.likes} likes</p>
            <button onClick={() => props.handleLike(props.blog)}>like</button><br></br>
            <button onClick={() => props.handleDelete(props.blog)}>delete</button>
            <button onClick={() => setExtended(false)}>show less</button>
        </div>
    )
}

export default Blog