import React, { useState } from 'react';
import axios from 'axios';

export const Login = (props) => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    handleLogin();
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/auth/local`, {
        name,
        password,
      });
      if (res.data.token) {
        setToken(res.data.token);
      }
    } catch (err) {}
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};