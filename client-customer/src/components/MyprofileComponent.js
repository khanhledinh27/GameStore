import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';

class Myprofile extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: '',
      avatarFile: null,
      avatarPreview: '',
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email,
        avatarPreview: localStorage.getItem('avatarPreview') || this.context.customer.avatar || '',
      });
    }
  }

  render() {
    if (this.context.token === '') return <Navigate replace to="/login" />;
    return (
      <section style={{ backgroundColor: 'white' }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <label htmlFor="avatarInput">
                    <MDBCardImage
                      src={this.state.avatarPreview}
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: '300px' }}
                      fluid
                    />
                  </label>
                  <input
                    type="file"
                    id="avatarInput"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={(e) => this.handleAvatarChange(e)}
                  />
                  <hr></hr>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn outline className="ms-1" type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)}>
                      UPDATE
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>User Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"><input type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Password</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"><input type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"><input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"><input type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} /></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"><input type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} /></MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
              
            </MDBCard>
            <hr></hr>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </section>
    );
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = { username, password, name, phone, email };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please input username, password, name, phone, and email');
    }
  }

  handleAvatarChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          avatarFile: file,
          avatarPreview: reader.result,
        });
        localStorage.setItem('avatarPreview', reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/customer/customers/${id}`, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.context.setCustomer(result);
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default Myprofile;
