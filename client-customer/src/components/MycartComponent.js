import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';
import {MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className='dataorder'>
          <td>
            <div className='d-flex align-items-center'>
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{index + 1}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{item.product._id}</p>
          </td>

          <td><p className='fw-normal mb-1'>{item.product.name}</p></td>
          <td>
            <p className='fw-normal mb-1'>{item.product.category.name}</p>
          </td>
	        <td>
            <p className='fw-normal mb-1'><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></p>
          </td>
	        <td>
            <p className='fw-normal mb-1'>{item.product.price}</p>
          </td>
	        <td>
            <p className='fw-normal mb-1'>{item.quantity}</p>
          </td>
	        <td>
            <p className='fw-normal mb-1'>{item.product.price * item.quantity}</p>
          </td>
	        <td>
            <span className="link" onClick={() => this.lnkRemoveClick(item.product._id)}>Remove</span>
          </td>
        </tr>

        
      );
    });
    return (
      <div className="table-responsive" >
        <br></br>
        <MDBTable responsive align='middle' className='caption-top'>
        <caption>My Cart</caption>
        <MDBTableHead>
              <tr>
                <th scope='col'>No.</th>
                <th scope='col'>ID</th>
                <th scope='col'>Name</th>
                <th scope='col'>Category</th>
                <th scope='col'>Image</th>
                <th scope='col'>Price</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Action</th>
              </tr>
        </MDBTableHead>
        <MDBTableBody>
        {mycart}
        </MDBTableBody>
        <br></br>
	          <tr>
              <td colSpan="6"></td>
              <td>Total</td>
              <td>{CartUtil.getTotal(this.context.mycart)}</td>
              <td><span className="link" onClick={() => this.lnkCheckoutClick()}>CHECKOUT</span></td>
            </tr>
        </MDBTable>
      </div>
    );
  }
  // event-handlers
  lnkCheckoutClick() {
    if (window.confirm('ARE YOU SURE?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Your cart is empty');
      }
    }
  }
  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
}

export default withRouter(Mycart);