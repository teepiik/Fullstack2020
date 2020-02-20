import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> tests', () => {
    let blogComponent
    const blog = {
        title: 'Top 5 Vodka Martinis',
        author: 'teepiik',
        url: 'www.alko.fi',
        likes: 7327423
    }
    const user = null // so DeleteButton component is null
    const mockHandler = jest.fn()
    const mockHandler2 = jest.fn()

    beforeEach(() => {
        blogComponent = render(
            <Blog blog={blog} user={user} handleLike={mockHandler} handleDelete={mockHandler2}/>
        )
    })

    test('Renders title and author but not url and likes.', () => {
        const titleAndAuthor = blogComponent.container.querySelector('#blogHeader')
        const url = blogComponent.container.querySelector('#blogUrl')
        const likes = blogComponent.container.querySelector('#blogLikes')
        expect(titleAndAuthor).toHaveTextContent(
            'Top 5 Vodka Martinis by teepiik'
        )
        expect(url).toBe(null)
        expect(likes).toBe(null)
    })

    test('Renders all info after show more is clicked.', () => {
        const button = blogComponent.getByText('show more')
        fireEvent.click(button)

        const titleAndAuthor = blogComponent.container.querySelector('#blogHeader')
        const url = blogComponent.container.querySelector('#blogUrl')
        const likes = blogComponent.container.querySelector('#blogLikes')

        expect(titleAndAuthor).toHaveTextContent(
            'Top 5 Vodka Martinis by teepiik'
        )
        expect(url).toBeDefined()
        expect(likes).toBeDefined()
    })

    test('Like button is clicked twice, calls function twice.', () => {
        const button = blogComponent.getByText('show more')
        fireEvent.click(button)

        const likeButton = blogComponent.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(mockHandler.mock.calls.length).toBe(2)
    })
})

