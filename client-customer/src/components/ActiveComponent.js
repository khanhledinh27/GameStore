import axios from 'axios';
import React, { Component } from 'react';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      <div className="align-center">
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">ACTIVE ACCOUNT</h3>
              <div className="form-group mt-3">
                <label>ID</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter ID HERE" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }}
                />
              </div>
              <div className="form-group mt-3">
                <label>TOKEN</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter TOKEN HERE" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)}>
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
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Active;