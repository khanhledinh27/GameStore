// Customer.js
import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import OrderDetailModal from './OrderDetailModal';

class Customer extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null,
      isOrderDetailModalOpen: false,
    };
  }

  componentDidMount() {
    this.apiGetCustomers();
  }

  render() {
    const customers = this.state.customers.map((item, index) => (
      <tr key={item._id} className="datatable" onClick={() => this.trCustomerClick(item)}>
        <td>{index + 1}</td>
        <td>{item._id}</td>
        <td>{item.username}</td>
        <td>{item.password}</td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>{item.active}</td>
        <td>
          {item.active === 0 ? (
            <span className="link" onClick={() => this.lnkEmailClick(item)}>
              EMAIL
            </span>
          ) : (
            <span className="link" onClick={() => this.lnkDeactiveClick(item)}>
              DEACTIVE
            </span>
          )}
        </td>
      </tr>
    ));

    const orders = this.state.orders.map((item, index) => (
      <tr key={item._id} className="datatable" onClick={() => this.trOrderClick(item)}>
        <td>{index + 1}</td>
        <td>{item._id}</td>
        <td>{new Date(item.cdate).toLocaleString()}</td>
        <td>{item.customer.name}</td>
        <td>{item.customer.phone}</td>
        <td>{item.total}</td>
        <td>{item.status}</td>
      </tr>
    ));

    const items = this.state.order?.items.map((item, index) => (
      <tr key={item.product._id} className="datatable">
        <td>{index + 1}</td>
        <td>{item.product._id}</td>
        <td>{item.product.name}</td>
        <td>
          <img src={`data:image/jpg;base64,${item.product.image}`} width="70px" height="70px" alt="" />
        </td>
        <td>{item.product.price}</td>
        <td>{item.quantity}</td>
        <td>{item.product.price * item.quantity}</td>
      </tr>
    ));

    return (
      <div>
        <div className="align-center">
          <h2 className="text-center">CUSTOMER LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>STT</th>
                <th>ID</th>
                <th>Username</th>
                <th>Password</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
              {customers}
            </tbody>
          </table>
        </div>

        {this.state.orders.length > 0 && (
          <div className="overlay">
            <div className="modal-content3">
              <h2 className="text-center">ORDER LIST</h2>
              <table className="datatable" border="1">
                <tbody>
                  <tr className="datatable">
                    <th>STT</th>
                    <th>ID</th>
                    <th>Creation date</th>
                    <th>Cust.name</th>
                    <th>Cust.phone</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                  {orders}
                </tbody>
              </table>
              <button id="back-order2" onClick={this.goBackFromOrderList}>
                Back
              </button>
            </div>
          </div>
        )}

        {this.state.isOrderDetailModalOpen && (
          <OrderDetailModal order={this.state.order} onBack={this.goBackFromOrderDetail} />
        )}
      </div>
    );
  }

  goBackFromOrderList = () => {
    this.setState({ orders: [], isOrderDetailModalOpen: false });
  };

  goBackFromOrderDetail = () => {
    this.setState({ isOrderDetailModalOpen: false, order: null });
  };

  trCustomerClick = (item) => {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  };

  trOrderClick = (item) => {
    this.setState({ order: item, isOrderDetailModalOpen: true });
  };

  lnkEmailClick = (item) => {
    this.apiGetCustomerSendmail(item._id);
  };

  lnkDeactiveClick = (item) => {
    this.apiPutCustomerDeactive(item._id, item.token);
  };

  apiGetCustomers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      const result = res.data;
      this.setState({ customers: result });
    });
  }

  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/admin/orders/customer/${cid}`, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }

  apiGetCustomerSendmail(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/admin/customers/sendmail/${id}`, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }

  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/admin/customers/deactive/${id}`, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetCustomers();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default Customer;
