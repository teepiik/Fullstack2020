import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useField } from '../hooks/index'
import { makeComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Comments = (props) => {
    const newComment = useField('text')

    const dispatch = useDispatch()

    const handleComment = async (event) => {
        event.preventDefault()
        try {
            dispatch(makeComment(props.id, newComment.field.value))
            newComment.setEmpty()
        } catch (error) {
            console.log(error)
        }
    }

    const rows = () =>
        props.comments.map(c =>
            <li key={c}>
                {c}
            </li>)

    return (
        <div>
            <h4>Comments</h4>
            <ul>
                {rows()}
            </ul>
            <div>
                <Row>
                    <Col>
                        <Form onSubmit={handleComment}>
                            <Form.Group>
                                <Form.Label>Add a comment </Form.Label>
                                <Form.Control
                                    {...newComment.field}
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
        </div>
    )
}

export default Comments