import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';

class EditProductModal extends Component {
  static contextType = MyContext;

  state = {
    categories: [],
    txtID: '',
    txtName: '',
    txtPrice: 0,
    cmbCategory: '',
    imgProduct: '',
    isOpen: false,
  };

  componentDidMount() {
    // Fetch categories when the component mounts
    this.apiGetCategories();

    // If itemSelected is present, update the state with its values
    if (this.props.itemSelected) {
      const { _id, name, price, category, image } = this.props.itemSelected;
      this.setState({
        txtID: _id,
        txtName: name,
        txtPrice: price,
        cmbCategory: category._id,
        imgProduct: `data:image/jpg;base64,${image}`,
      });
    }

    // Set isOpen to true when the modal mounts to open it
    this.setState({ isOpen: true });
  }

  // ... (other lifecycle methods and event handlers)



  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (<option key={cate._id} value={cate._id} selected={cate._id === this.props.item.category._id}>{cate.name}</option>);
      } else {
        return (<option key={cate._id} value={cate._id}>{cate.name}</option>);
      }
    });
    return (
      <div className={`overlay ${this.props.isOpen ? 'show' : ''}`}>
        <div className="modal-content2">
          <h2 className="text-center">EDIT PRODUCT</h2>
          <form>
            <table>
              <tbody>
                {/* The form fields for editing a product */}
                <tr>
                  <td>ID</td>
                  <td>
                    <input type="text" value={this.state.txtID} readOnly />
                  </td>
                </tr>
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
              
                {/* Display the preview of the selected image */}
                <tr>
                  <td colSpan="2">
                    <img src={this.state.imgProduct} width="300px" height="300px" alt="" />
                  </td>
                </tr>
                <tr>
            <td colSpan="2" className="button-container">
              <button
                className="update-btn"
                type="submit"
                onClick={(e) => this.btnUpdateClick(e)}
              >
                Update
              </button>
              <button
                className="cancel-btn"
                type="button" // Use type="button" to prevent form submission on cancel
                onClick={this.props.onCancel}
              >
                Back
              </button>
            </td>
          </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    );
  }
  editProduct = () => {
    // Define the logic for editing a product here
    // You can use this function to perform any necessary actions when editing a product
    // For example, you can make an API call to update the product data
     console.log('Editing product:', this.state.txtID, this.state.txtName, this.state.txtPrice, this.state.cmbCategory, this.state.imgProduct);
  };

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }
  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      }
      reader.readAsDataURL(file);
    }
  }
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');

    if (id && name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPutProduct(id, prod);
      
      // Close the modal after updating
      this.setState({ isOpen: false });
    } else {
      alert('Please input id and name and price and category and image');
    }
  }
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPostProduct(prod);
    } else {
      alert('Please input name and price and category and image');
    }
  }


  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Please input id');
      }
    }
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetProducts();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetProducts();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages, result.curPage);
      } else {
        const curPage = this.props.curPage - 1;
        axios.get('/api/admin/products?page=' + curPage, config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages, curPage);
        });
      }
    });
  }
  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetProducts();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default EditProductModal;
