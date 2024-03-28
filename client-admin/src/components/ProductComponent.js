import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal'; 
class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null,
      isAddModalOpen: false,
      isEditModalOpen: false, // Add state for Edit modal
      currentPage: 1, 
      itemsPerPage: 4
      
    };
  }

  addProduct = (newProduct) => {
    const updatedProducts = [...this.state.products, newProduct];
    this.setState({ products: updatedProducts });
  };
  onUpdateClick = (e) => {
    console.log('Updating product:', this.state.itemSelected._id);
    this.setState({ isEditModalOpen: false });
  };

  editProduct = (e, item) => {
    this.setState({ itemSelected: item, isEditModalOpen: true });
  };
  updateProducts = (products, noPages, curPage) => {
    const newCurrentPage = this.state.currentPage < curPage ? curPage : this.state.currentPage;
    this.setState({ products, noPages, curPage, currentPage: newCurrentPage });
  };

  render() {
    const prods = this.state.products.map((item,index) => (
      <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
        <td>{(this.state.currentPage - 1) * this.state.itemsPerPage + index + 1}</td>
        <td>{item._id}</td>
        <td><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
        <td>{item.category.name}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{new Date(item.cdate).toLocaleString()}</td> 
        <td><button id="edit-product" onClick={(e) => this.editProduct(e, item)}>Edit</button></td>
        <td><button id="delete-product"className="edit-button"  onClick={(e) => this.deleteProduct(e, item)}>Delete</button></td>
      </tr>
    ));
    

    const pagination = Array.from({ length: this.state.noPages }, (_, index) => (
      (index + 1) === this.state.curPage ?
        <span key={index}>| <b>{index + 1}</b> |</span> :
        <span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>| {index + 1} |</span>
    ));

    return (
      <div>
        <div className="float-left3">
          <h2 className="text-center">PRODUCT LIST</h2>
          <button id="btn-new" type="button" onClick={() => this.setState({ isAddModalOpen: true })}>
            Add New
          </button>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>STT</th> 
                <th>ID</th>
                <th>Image</th>
                <th>Genre</th>
                <th>Name</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Edit</th>
                <th>Delete</th>
                
              </tr>
              {prods}
              <tr>
                <td id="page"colSpan="6">{pagination}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Conditionally render the AddProductModal component */}
        {this.state.isAddModalOpen && (
          <AddProductModal
            onBack={() => this.setState({ isAddModalOpen: false })} // Pass a callback to close the modal
            addProduct={this.addProduct} // Truyền hàm addProduct xuống
            onClose={() => this.setState({ isAddModalOpen: false })}
          />
        )}
        {this.state.isEditModalOpen && (
          <EditProductModal
            isOpen={this.state.isEditModalOpen}
            onCancel={() => this.setState({ isEditModalOpen: false })}
            onUpdateClick={(e) => this.btnUpdateClick(e)}
            itemSelected={this.state.itemSelected}
            editProduct={this.editProduct} // Pass the editProduct function
            updateProducts={this.updateProducts} // Make sure to pass the updateProducts function
            onClose={() => this.setState({ isAddModalOpen: false })}
          />
        )}
        
        <div className="float-clear" />
      </div>
    );
  }
  updateProducts = (products, noPages, curPage) => { // arrow-function
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  btnUpdateClick(e) {
    console.log('Updating product:', this.state.itemSelected._id);
  }

  
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      console.log('Current Page:', page); // Thêm dòng này để kiểm tra giá trị của currentPage
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
  lnkPageClick(index) {
    console.log('Clicked Page:', index);
    this.setState({ currentPage: index });
    this.apiGetProducts(index);
  }
   deleteProduct = (e, item) => {
    e.stopPropagation(); // Prevent the row click event from triggering

    // Show a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');

    if (isConfirmed) {
      // Perform delete action by making an API call
      const config = { headers: { 'x-access-token': this.context.token } };
      axios.delete('/api/admin/products/' + item._id, config).then((res) => {
        const result = res.data;
        if (result) {
          alert('Product deleted successfully!');
          // Update the state to remove the deleted product
          const updatedProducts = this.state.products.filter(product => product._id !== item._id);
          this.setState({ products: updatedProducts });
        } else {
          alert('Failed to delete the product. Please try again.');
        }
      });
    }}
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;