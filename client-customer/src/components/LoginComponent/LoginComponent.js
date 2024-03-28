import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../../contexts/MyContext';
import withRouter from '../../utils/withRouter';
import './LoginComponent.css'

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }

  render() {
    return (
      <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">CUSTOMER LOGIN</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" value="LOGIN" onClick={(e) => this.btnLoginClick(e)}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    );
  }
  // event-handlers
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
  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }
}
export default withRouter(Login);