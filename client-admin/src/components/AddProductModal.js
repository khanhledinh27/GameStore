import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import './AddProductModal.css';


class AddProductModal extends Component {
  static contextType = MyContext;

  state = {
    categories: [],
    txtName: '',
    txtPrice: 0,
    cmbCategory: '',
    imgProduct: '',
    isAddModalOpen: false,
  };

  render() {
    const cates = this.state.categories.map((cate) => (
      <option key={cate._id} value={cate._id}>
        {cate.name}
      </option>
    ));

    return (
      <div className={`overlay ${this.state.isAddModalOpen ? 'show' : ''}`}>
        <div className="modal-content2">
          <h2 className="text-center">ADD PRODUCT</h2>
          <form>
            <table>
              <tbody>
                {/* The form fields for adding a new product */}
                <tr>
                  <td>Name</td>
                  <td>
                    <input
                      type="text"
                      value={this.state.txtName}
                      onChange={(e) => this.setState({ txtName: e.target.value })}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>
                    <input
                      type="text"
                      value={this.state.txtPrice}
                      onChange={(e) => this.setState({ txtPrice: e.target.value })}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Image</td>
                  <td>
                    <input
                      type="file"
                      name="fileImage"
                      accept="image/jpeg, image/png, image/gif"
                      onChange={(e) => this.previewImage(e)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Genre</td>
                  <td>
                    <select onChange={(e) => this.setState({ cmbCategory: e.target.value })}>{cates}</select>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                {/* Display the preview of the selected image */}
                <tr>
                  <td colSpan="2">
                    <img src={this.state.imgProduct} width="300px" height="300px" alt="" />
                  </td>
                </tr>
              </tbody>
            </table>
            <button id="add-add" type="submit" onClick={(e) => this.btnAddClick(e)}>
              Add
            </button>
            <button id="back-add" onClick={this.props.onBack}>
              Back
            </button>
          </form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // Fetch categories when the component mounts
    this.apiGetCategories();
  }

  // Additional methods for handling events, API calls, etc.

  // Event handler for previewing the selected image
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  // Event handler for adding a new product
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');

    if (name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPostProduct(prod);
    } else {
      alert('Please input name, price, category, and image');
    }
  }

  // Additional methods for API calls, etc.

  // Fetch categories from the API
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  // API call for adding a new product
  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Product added successfully!');
  
        // Gọi hàm addProduct để cập nhật danh sách sản phẩm trong component Product
        this.props.addProduct(result);
  
        // Đóng cửa sổ modal
        this.props.onClose();  // Trigger modal closure
      } else {
        alert('Failed to add the product. Please try again.');
      }
    });
  }
  
}

export default AddProductModal;