import React from 'react'
import { useField } from '../hooks/index'
import { notificationChange } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/blogReducer'
import { Form, Button, Row, Col } from 'react-bootstrap'

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
            <Row>
                <Col>
                    <h2>New Blog</h2>
                    <Form onSubmit={handleNewBlog}>
                        <Form.Group>
                            <Form.Label>Title: </Form.Label>
                            <Form.Control
                                {...title.field}
                            />
                            <Form.Label>Author: </Form.Label>
                            <Form.Control
                                {...author.field}
                            />
                            <Form.Label>Url: </Form.Label>
                            <Form.Control
                                {...url.field}
                            />
                            <Button className='button' variant='dark' type='submit'>
                                Create
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}

export default BlogForm