import axios from 'axios';
import React, { Component } from 'react';

class Signup extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    return (
      <div className="align-center">
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">SIGN UP</h3>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter username" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
                />
              </div>
              <div className="form-group mt-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter your name" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }}
                />
              </div>
              <div className="form-group mt-3">
                <label>Phone number</label>
                <input
                  type="tel"
                  className="form-control mt-1"
                  placeholder="your number plz..." value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }}
                />
              </div>
              <div className="form-group mt-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="your email plz..." value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }}
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
                <button type="submit" className="btn btn-primary" value="SIGN-UP" onClick={(e) => this.btnSignupClick(e)}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
      alert('Sign up complete! Please ACTIVE your account before LOGIN');
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }
  
  /// apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Signup;