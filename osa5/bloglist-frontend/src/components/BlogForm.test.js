import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
// 5.16

test('BlogForm sends correct data.', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm handleNewBlog={createBlog}/>
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#form')

    fireEvent.change(title, {
        target: { value: 'What is love' }
    })

    fireEvent.change(author, {
        target: { value: 'Haddaway' }
    })

    fireEvent.change(url, {
        target: { value: 'greatesthits.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls.length).toBe(1)
    //expect(createBlog.mock.calls[0][0].content).toBe('What is love' )
    //console.log(createBlog.mock.calls)
    console.log(createBlog.mock.calls[0][0].content)
    console.log(createBlog.mock.calls[0][0])
})