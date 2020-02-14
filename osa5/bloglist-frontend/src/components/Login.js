import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const Login = (props) => {
    return (
        <div>
            <h2>Login</h2>
            <Row>
                <Col>
                    <Form onSubmit={props.handleLogin}>
                        <Form.Group>
                            <Form.Label>Username: </Form.Label>
                            <Form.Control
                                {...props.username}
                            />
                            <Form.Label>Password: </Form.Label>
                            <Form.Control
                                {...props.password}
                            />
                            <Button className='button' variant='dark' type='submit'>
                                login
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}

export default Login