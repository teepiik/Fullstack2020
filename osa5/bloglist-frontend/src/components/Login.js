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
                                type='text'
                                name='username'
                                value={props.username}
                                onChange={props.handleUsernameChange}
                            />
                            <Form.Label>Password: </Form.Label>
                            <Form.Control
                                type='password'
                                name='password'
                                value={props.password}
                                onChange={props.handlePasswordChange}
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