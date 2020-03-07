import React from 'react'
import { useField } from '../hooks/index'
import { notificationChange } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/blogReducer'

let timeOutID = 0

const BlogForm = () => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const dispatch = useDispatch()

    const handleNewBlog = async (event) => {
        event.preventDefault()
        try {
            const blogObject = {
                title: title.field.value,
                url: url.field.value,
                author: author.field.value,
                likes: 0
            }
            dispatch(create(blogObject))
            title.setEmpty()
            author.setEmpty()
            url.setEmpty()
            timeOutID = dispatch(notificationChange(`You created "${title.field.value}"`, 5, timeOutID))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h4>New Blog</h4>
            <form onSubmit={handleNewBlog} id='form'>
                <div>
                    Title:
                    <input
                        {...title.field}
                    />
                </div>
                <div>
                    Author:
                    <input
                        {...author.field}
                    />
                </div>
                <div>
                    Url:
                    <input
                        {...url.field}
                    />
                </div>
                <button type="submit" >Create</button>
            </form>
        </div>
    )
}

export default BlogForm