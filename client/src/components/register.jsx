import React, { useState } from 'react';
import axios from 'axios';
import store from '../store/store';
import { addToken } from '../actions/actions';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

export const Register = (props) => {
  const [form, setForm] = useState({
    name: '',
    password: '',
    retypePassword: '',
  });

  const [registerFailure, setRegisterFailure] = useState('');
  const [token, setToken] = useState(null);

  const handleSubmit = (event) => {
    handleRegister();
    event.preventDefault();
  };

  const handleRegisterFormChange = (e) => {
    let { name, value } = e.target;

    let newEntry = { ...form };
    if (name === 'name') {
      newEntry.name = value;
    } else if (name === 'password') {
      newEntry.password = value;
    } else if (name === 'retypePassword') {
      newEntry.retypePassword = value;
    }

    setForm({ ...form, ...newEntry });
  };

  const showRegisterFailureMessage = () => {
    return registerFailure ? (
      <span className="text-danger">
        <br />
        {registerFailure}
      </span>
    ) : null;
  };

  const formComplete = () => {
    return (
      form.name.trim().length > 0 &&
      form.password.trim().length > 0 &&
      form.retypePassword.trim().length &&
      form.password === form.retypePassword
    );
  };

  const handleLogin = async () => {
    try {
      const loginResponse = await fetch(`http://localhost:5000/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          password: form.password,
        }),
      });
      const res = await loginResponse.json();
      if (res) {
        store.dispatch(addToken(res.token));
        sessionStorage.setItem('token', res.token);
        setToken(res.token);
      }
    } catch (error) {
      console.log(error);
      setForm({ ...form, password: '', retypePassword: '' });
    }
  };

  const handleRegister = async () => {
    axios
      .post(`/api/users`, {
        body: {
          name: form.name,
          password: form.password,
        },
      })
      .then((res) => {
        if (res.data) {
          handleLogin();
        }
      })
      .catch((error) => {
        setRegisterFailure(error.response.data.message);
        setForm({
          name: '',
          password: '',
          retypePassword: '',
        });
      });
  };

  return token ? (
    <Redirect to="/entries"></Redirect>
  ) : (
    <div className="register">
      <br></br>
      <h3>Register</h3>
      <Form>
        <Form.Group controlId="registerName">
          <Form.Label>Name *</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            type="text"
            placeholder="Enter a name for your account"
            onChange={handleRegisterFormChange}
          />
        </Form.Group>
        <Form.Group controlId="registerPassword">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            name="password"
            value={form.password}
            type="password"
            placeholder="Enter a password for your account"
            onChange={handleRegisterFormChange}
          />
        </Form.Group>
        <Form.Group controlId="registerRetypePassword">
          <Form.Label>Retype Password *</Form.Label>
          <Form.Control
            name="retypePassword"
            value={form.retypePassword}
            type="password"
            placeholder="Retype the password for your account"
            onChange={handleRegisterFormChange}
          />
        </Form.Group>
        <Button
          onClick={handleSubmit}
          variant="success"
          type="submit"
          disabled={!formComplete()}
        >
          Submit
        </Button>
        <Form.Text className="text-muted">* required</Form.Text>
        {showRegisterFailureMessage()}
      </Form>
      <p>
        <br></br>
        <Link className="text-muted" to="/login">
          Already have an account?
        </Link>
      </p>
    </div>
  );
};
