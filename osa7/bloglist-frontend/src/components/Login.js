import React from 'react'
import { useField } from '../hooks/index'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'
import { Form, Button, Row, Col } from 'react-bootstrap'

let timeOutID = 0

const Login = () => {
    const username = useField('text')
    const password = useField('password')
    const dispatch = useDispatch()

    const handleLogin = async () => {
        try {
            await dispatch(login({ username: username.field.value , password: password.field.value }))
            username.setEmpty()
            password.setEmpty()
            timeOutID = dispatch(notificationChange('Logged in', 5, timeOutID))

        } catch (error) {
            console.log(error)
            timeOutID = dispatch(notificationChange('Login failed', 5, timeOutID))
        }
    }

    return (
        <div>
            <Row>
                <Col>
                    <h2>Login</h2>
                    <Form onSubmit={handleLogin}>
                        <Form.Group>
                            <Form.Label>Username: </Form.Label>
                            <Form.Control
                                {...username.field}
                            />
                            <Form.Label>Password: </Form.Label>
                            <Form.Control
                                {...password.field}
                            />
                            <Button className='button' variant='dark' type='submit'>
                                Login
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