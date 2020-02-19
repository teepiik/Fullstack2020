import React, { useState } from 'react'

const Blog = (props) => {
    const [extended, setExtended] = useState(false)

    if(extended===false) {
        return (
            <div>
                {props.blog.title}
                <button onClick={() => setExtended(true)}>show more</button>
            </div>
        )
    }
    return (
        <div>
            <h4>{props.blog.title}</h4>
            Author: {props.blog.author}<br></br>
            Url: {props.blog.url}<br></br>
            {props.blog.likes} likes
            <button onClick={() => props.handleLike(props.blog)}>like</button><br></br>
            <button onClick={() => setExtended(false)}>show less</button>
        </div>
    )
}

export default Blog