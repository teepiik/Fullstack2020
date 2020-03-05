import React from 'react'

const Login = (props) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={props.handleLogin}>
                <div>
                    Username
                    <input
                        id='username'
                        value={props.username}
                        onChange={props.handleUsernameChange}
                    />
                </div>
                <div>
                    Password
                    <input
                        id='password'
                        type="password"
                        value={props.password}
                        onChange={props.handlePasswordChange}
                    />
                </div>
                <button type="submit" id='loginButton'>login</button>
            </form>
        </div>
    )
}

export default Login