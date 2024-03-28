
import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import {MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }
  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} onClick={() => this.trItemClick(item)} className='dataorder'>
          <td>
            <div className='d-flex align-items-center'>
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{item._id}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{new Date(item.cdate).toLocaleString()}</p>
          </td>

          <td><p className='fw-normal mb-1'>{item.customer.name}</p></td>
          <td>
            <p className='fw-normal mb-1'>{item.customer.phone}</p>
          </td>
	        <td>
            <p className='fw-normal mb-1'>{item.total}</p>
          </td>
	        <td>
            <p className='fw-normal mb-1'>{item.status}</p>
          </td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
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
            <img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" />
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
        </tr>
        );
      });
    }
    
    return (
      <div className="table-responsive" >
        <br></br>
        <MDBTable autoWidth striped  className='caption-top'>
        <caption>List Of Orders</caption>
        <MDBTableHead>
          

              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Creation date</th>
                <th scope='col'>Cust.name</th>
                <th scope='col'>Cust.phone</th>
                <th scope='col'>Total</th>
                <th scope='col'>Status</th>
              </tr>
              

        </MDBTableHead>
        <MDBTableBody>
        {orders}
        </MDBTableBody>
        </MDBTable>
        
        {this.state.order ?
        <div className="align-center">
        <hr></hr>
          <MDBTable autoWidth striped  className='caption-top'>
          <caption>Order Detail</caption>
          <MDBTableHead>
            
  
                <tr>
                  <th scope='col'>No.</th>
                  <th scope='col'>Prod.ID</th>
                  <th scope='col'>Prod.name</th>
                  <th scope='col'>Image</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Amount</th>
                </tr>
                
  
          </MDBTableHead>
          <MDBTableBody>
          {items}
          </MDBTableBody>
          </MDBTable>
          </div>
          : <div />}
          </div>
      
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}
export default Myorders;