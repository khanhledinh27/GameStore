import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import './LoginComponent.css'; // Updated import for the CSS file

class Login extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }

  componentDidMount() {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.context.setToken(storedToken);
    }
  }

  render() {
    if (this.context.token === '') {
      return (
        <div className="login-container">
          <h2 className="login-header">ADMIN LOGIN</h2>
          <form className="login-form">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={this.state.txtUsername}
              onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={this.state.txtPassword}
              onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
            />
            <button id="btn-login-admin" type="submit" onClick={(e) => this.btnLoginClick(e)}>LOGIN</button>
          </form>
        </div>
      );
    }
    return <div />;
  }

  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }

  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        localStorage.setItem('token', result.token);
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}

export default Login;
