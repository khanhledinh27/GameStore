import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';
import './Category.css'; // Import a CSS file for styling
import Modal from './Modal';

class Category extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null,
      isModalOpen: false,
      isEditMode: false,
      actionType: 'Add', // Thêm trạng thái actionType
    };
  }

  render() {
    const lastIndex = this.state.categories.length ;

    const cates = this.state.categories.map((item, index) => (
      <tr key={item._id} className="datatable">
        <td>{index + 1}</td>
        <td>{item._id}</td>
        <td>{item.name}</td>
        <td>
          <button id="btn-edit" type="button" onClick={() => this.btnEditClick(item)}>
            Edit
          </button>
        </td>
        <td>
          <button id="btn-delete" type="button" onClick={() => this.btnDeleteClick(item)}>
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <div className="float-left2">
          <h2 className="text-center">GENRE LIST</h2>
          <button
            id="btn-new"
            type="button"
            onClick={() => this.setState({ isModalOpen: true, isEditMode: false })}
          >
            Add New
          </button>
          <table className="datatable" border="2">
            <tbody>
              <tr className="datatable">
                <th>STT</th>
                <th>ID</th>
                <th>Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {cates}
            </tbody>
          </table>


          {/* Add New button below the category list */}
          
        </div>

        <CategoryDetail
          item={this.state.itemSelected}
          updateCategories={this.updateCategories}
        />

        {/* Modal for adding a new or editing a category */}
        {this.state.isModalOpen && (
          <Modal>
            <h2 id="edit">{this.state.actionType === 'Edit' ? 'Edit Genre' : 'Add New Genre'}</h2>
            <form>
              <label htmlFor="modalID">ID</label>
              <input
                type="text"
                id="modalID"
                value={this.state.txtID}
                onChange={(e) => this.setState({ txtID: e.target.value })}
                readOnly={true}
              />

              <label htmlFor="modalName">Name</label>
              <input
                type="text"
                id="modalName"
                value={this.state.txtName}
                onChange={(e) => this.setState({ txtName: e.target.value })}
              />

              <div className="save-back-container">
                <button id="btn-save" type="button" onClick={() => this.saveCategory()}>
                  Save
                </button>
                <button id="btn-back" type="button" onClick={() => this.closeModal()}>
                  Back
                </button>
              </div>
            </form>
          </Modal>
        )}

        <div className="float-clear" />
      </div>
    );
  }

  resetModalState() {
    this.setState({
      txtID: '',
      txtName: '',
      isEditMode: false,
      actionType: 'Add',
    });
  }

  btnEditClick(item) {
    this.setState({
      itemSelected: item,
      txtID: item._id,
      txtName: item.name,
      isModalOpen: true,
      isEditMode: true,
      actionType: 'Edit', // Nếu đang Edit, đặt actionType về 'Edit'
    });
  }

  closeModal() {
    this.resetModalState();
    this.setState({ isModalOpen: false });
  }

  btnDeleteClick(item) {
    if (window.confirm('ARE YOU SURE?')) {
      const id = item._id;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Please input id');
      }
    }
  }

  saveCategory() {
    const name = this.state.txtName;
  
    if (name) {
      const cate = { name: name };
      const id = this.state.itemSelected ? this.state.itemSelected._id : null;
  
      if (id) {
        // If itemSelected exists, it's an update
        this.apiPutCategory(id, cate);
      } else {
        // If itemSelected is null, it's an add
        this.apiPostCategory(cate);
      }
  
      this.closeModal();
    } else {
      alert('Please input name');
    }
  }
  componentDidUpdate() {
    console.log("Action Type:", this.state.actionType);
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default Category;
