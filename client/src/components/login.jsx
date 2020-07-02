import React, { useState } from 'react';
import axios from 'axios';
import store from '../store/store';
import { addToken, addLoginError } from '../actions/actions';
import { useSelector } from 'react-redux';

export const Login = (props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleSubmit = (event) => {
    handleLogin();
    event.preventDefault();
  };

  useSelector((state) => {
    if (loginError !== state.loginError) {
      setLoginError(state.loginError);
    }
  });

  const handleLogin = async () => {
    axios
      .post(`http://localhost:5000/auth/local`, {
        name,
        password,
      })
      .then((res) => {
        if (res.data) {
          store.dispatch(addLoginError(false));
          store.dispatch(addToken(res.data.token));
          sessionStorage.setItem('token', res.data.token);
          props.history.push('/entries');
        }
      })
      .catch((error) => {
        store.dispatch(addLoginError(true));
        setLoginErrorMessage(error.response.data.message);
        setPassword('');
      });
  };

  return (
    <div className="login">
      <br></br>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
          disabled={!name || !password}
        >
          Submit
        </button>
        {loginError ? (
          <div className="text-danger">
            <br />
            {loginErrorMessage}
          </div>
        ) : null}
      </form>
    </div>
  );
};
