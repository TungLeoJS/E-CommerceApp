import React, { useState } from 'react';
import { login } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await login(dispatch, { username, password });
    if (res && res.status === 200) {
      history('/');
    } else {
      setUsername('');
      setPassword('');
    }
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
