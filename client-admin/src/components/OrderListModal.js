// OrderListModal.js

import React, { Component } from 'react';

class OrderListModal extends Component {
  render() {
    const { orders, onBack } = this.props;

    const orderRows = orders.map((item) => (
      <tr key={item._id} className="datatable" onClick={() => this.trOrderClick(item)}>
        <td>{item._id}</td>
        <td>{new Date(item.cdate).toLocaleString()}</td>
        <td>{item.customer.name}</td>
        <td>{item.customer.phone}</td>
        <td>{item.total}</td>
        <td>{item.status}</td>
      </tr>
    ));

    return (
      <div className="order-modal">
        <h2 className="text-center">ORDER LIST</h2>
        <table className="datatable" border="1">
          <tbody>
            <tr className="datatable">
              <th>ID</th>
              <th>Creation date</th>
              <th>Cust.name</th>
              <th>Cust.phone</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
            {orderRows}
          </tbody>
        </table>
        <button className="back-button" onClick={onBack}>
          Back
        </button>
      </div>
    );
  }
}

export default OrderListModal;
