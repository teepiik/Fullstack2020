import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({ setError, setToken, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      if (error.graphQLErrors.length > 0) {
        setError(error.graphQLErrors[0].message);
      } else {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      console.log(result.data);
      setUser(result.data.login.user);
      localStorage.setItem('user-token', token);
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
