import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const BlogForm = (props) => {
    return (
        <div>
            <h4>New Blog</h4>
            <Row>
                <Col>
                    <Form onSubmit={props.handleLogin}>
                        <Form.Group>
                            <Form.Label>Title: </Form.Label>
                            <Form.Control
                                {...props.title}
                            />
                            <Form.Label>Author: </Form.Label>
                            <Form.Control
                                {...props.author}
                            />
                            <Form.Label>Url: </Form.Label>
                            <Form.Control
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

export default BlogForm