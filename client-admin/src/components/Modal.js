import React from 'react';
import './Modal.css'; // Import the modal styling

const Modal = ({ children }) => {
  return (
    <div className="modal-overlay3">
      <div className="modal-content3">
        {children}
      </div>
    </div>
  );
};

export default Modal;
