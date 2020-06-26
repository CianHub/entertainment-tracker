import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: null, form: { name: null, password: null } };
  }

  handleNameChange = (event) => {
    this.setState({
      form: { name: event.target.value, password: this.state.form.password },
    });
  };
  handlePasswordChange = (event) => {
    this.setState({
      form: { name: this.state.form.name, password: event.target.value },
    });
  };

  handleSubmit = (event) => {
    this.handleLogin();
    event.preventDefault();
  };

  handleLogin = async () => {
    // TODO: Store token in Redux
    // TODO: Redirect to entry list page
    try {
      const res = await axios.post(`http://localhost:5000/auth/local`, {
        ...this.state.form,
      });
      if (res.data.token) {
        this.setState({ token: res.data.token });
      }
      console.log(res.data.token);
    } catch (err) {}
  };

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
              placeholder="Enter name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
