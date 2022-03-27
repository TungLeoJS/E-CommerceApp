import React, { useState } from 'react';
import { login } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password }).then((res) => {
      if (res?.status === 200) {
        history.push('/')
      }
      setUsername('');
      setPassword('');
    })
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type='text'
        placeholder='username'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      ></input>
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type='password'
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>
      <button onClick={handleClick} style={{ padding: 10, width: '100px' }}>
        Login
      </button>
    </div>
  );
};
