import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import OrderDetailModal from './OrderDetailModal';
import './OrderDetailModal.css';
class Order extends Component {
  static contextType = MyContext;

  state = {
    orders: [],
    order: null,
    orderCount: 0,
    isOrderDetailModalOpen: false,
    selectedOrder: null,
  };

  render() {
    const { orders, order, orderCount, isOrderDetailModalOpen } = this.state;

    const orderRows = orders.map((item, index) => (
      <tr key={item._id} className="datatable">
        <td>{index + 1}</td>
        <td>{item._id}</td>
        <td>{new Date(item.cdate).toLocaleString()}</td>
        <td>{item.customer ? item.customer.name : 'N/A'}</td>
        <td>{item.customer ? item.customer.phone : 'N/A'}</td>
        <td>{item.total}</td>
        <td>{item.status}</td>
        <td>
          <button id="View"className="link-button" onClick={() => this.viewOrderDetail(item)}>
            View
          </button>
        </td>
        <td>
          {item.status === 'PENDING' && (
            <div>
              <button id="Approve"className="link-button" onClick={() => this.lnkApproveClick(item._id)}>
              Approve
              </button>
            </div>
          )}
        </td>
        <td>
          {item.status === 'PENDING' && (
            <div>
              <button id="Cancel" className="link-button" onClick={() => this.lnkCancelClick(item._id)}>
              Cancel
              </button>
            </div>
          )}
        </td>
        
      </tr>
    ));

    return (
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <div className="float-left4">
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
              <th>Details</th>
              <th>Approve</th>
              <th>Cancel</th>
            </tr>
            {orderRows}
          </tbody>
        </table>

        {/* Render Order Detail Modal */}
        {isOrderDetailModalOpen && (
          <OrderDetailModal
            order={order}
            onBack={this.goBackFromOrderDetail}
          />
        )}
      </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetOrders();
  }

  trItemClick(item, index) {
    this.setState({ order: item, orderCount: index + 1, isOrderDetailModalOpen: true });
  }

  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }

  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }

  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }

  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  goBackFromOrderDetail = () => {
    this.setState({ isOrderDetailModalOpen: false });
  };

  viewOrderDetail = (order) => {
    this.setState({ order, isOrderDetailModalOpen: true });
  };
}

export default Order;
