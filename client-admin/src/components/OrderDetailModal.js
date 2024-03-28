import React from 'react';

const OrderDetailModal = ({ order, onBack }) => {
  if (!order) {
    return null;
  }

  const items = order.items.map((item, index) => (
    <tr key={item.product._id} className="datatable">
      <td>{index + 1}</td>
      <td>{item.product._id}</td>
      <td>{item.product.name}</td>
      <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
      <td>{item.product.price}</td>
      <td>{item.quantity}</td>
      <td>{item.product.price * item.quantity}</td>
      
    </tr>
  ));

  return (
    <div className="overlay">
      <div className="modal-content3">
        <h2 className="text-center">ORDER DETAILS</h2>
        <table className="datatable" border="1">
          <tbody>
            <tr className="datatable">
              <th>No.</th>
              <th>Prod.ID</th>
              <th>Prod.name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
            {items}
          </tbody>
        </table>
        <div className="button-container">
        <button id="back-order" onClick={() => onBack()}>Back</button>
        </div>
      </div>
    </div>
  );
};


export default OrderDetailModal;
