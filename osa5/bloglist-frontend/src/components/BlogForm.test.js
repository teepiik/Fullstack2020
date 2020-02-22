import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
// 5.16

test('BlogForm sends correct data.', () => {
    const createBlog = jest.fn()

    /* Not working
    const [title, setTitle] = useState([''])
    const [author, setAuthor] = useState([''])
    const [url, setUrl] = useState([''])
    */
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const component = render(
        <BlogForm
            handleNewBlog={createBlog}
            title={title}
            author={author}
            url={url}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
        />
    )

    const titleComp = component.container.querySelector('#title')
    const authorComp = component.container.querySelector('#author')
    const urlComp = component.container.querySelector('#url')
    const form = component.container.querySelector('#form')

    fireEvent.change(titleComp, {
        target: { value: 'What is love' }
    })

    fireEvent.change(authorComp, {
        target: { value: 'Haddaway' }
    })

    fireEvent.change(urlComp, {
        target: { value: 'greatesthits.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls.length).toBe(1)
    //expect(createBlog.mock.calls[0][0].content).toBe('What is love' )
    //console.log(createBlog.mock.calls)
    console.log(createBlog.mock.calls[0][0].content)
    console.log(createBlog.mock.calls[0][0])
})