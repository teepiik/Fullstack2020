import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
    return (
        <div>
            <h4>New Blog</h4>
            <Row>
                <Col>
                    <Form id='form' onSubmit={props.handleNewBlog}>
                        <Form.Group>
                            <Form.Label>Title: </Form.Label>
                            <Form.Control
                                id='title'
                                {...props.title}
                            />
                            <Form.Label>Author: </Form.Label>
                            <Form.Control
                                id='author'
                                {...props.author}
                            />
                            <Form.Label>Url: </Form.Label>
                            <Form.Control
                                id='url'
                                {...props.url}
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

BlogForm.propTypes = {
    handleNewBlog: PropTypes.func.isRequired
}

export default BlogForm