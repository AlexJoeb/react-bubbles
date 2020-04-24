import React, { useState } from "react";
import axios from 'axios';
import { AxiosWithoutAuth } from '../utils/AxiosWithAuth';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState('')

  const handleSubmit = e => {
    e.preventDefault();

    AxiosWithoutAuth().post(`/api/login`, {
      username, password
    })
      .then(({ data }) => {
        setErrors('')
        const token = data.payload;
        localStorage.setItem('token', token);
      })
      .catch(error => {
        setErrors(error.message);
      })

  }
  return (
    <div className='login'>
      <h1>Login</h1>
      {errors && <p className='login__errors'>{errors}</p>}
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' value={username} onChange={({ target }) => setUsername(target.value)}/>
        <input type='password' placeholder='Password' value={password} onChange={({ target }) => setPassword(target.value)} />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
