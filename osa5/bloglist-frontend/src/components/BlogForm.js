import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
    return (
        <div>
            <h4>New Blog</h4>
            <form onSubmit={props.handleNewBlog} id='form'>
                <div>
                    Title:
                    <input
                        id='title'
                        value={props.title}
                        onChange={props.handleTitleChange}
                    />
                </div>
                <div>
                    Author:
                    <input
                        id='author'
                        value={props.author}
                        onChange={props.handleAuthorChange}
                    />
                </div>
                <div>
                    Url:
                    <input
                        id='url'
                        value={props.url}
                        onChange={props.handleUrlChange}
                    />
                </div>
                <button type="submit" id='addBlogButton'>Create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    handleNewBlog: PropTypes.func.isRequired
}

export default BlogForm