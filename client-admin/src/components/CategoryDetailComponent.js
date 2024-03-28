import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

import Modal from './Modal'; // Import a Modal component (create this separately)

class CategoryDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: '',
      isModalOpen: false,
    };
  }
  

  render() {
    return (
      <div className="float-right2">


        {/* Modal for adding a new category */}
        {this.state.isModalOpen && (
          <Modal>
            <h2>Add New Category</h2>
            <form>
              {/* Input fields for id and name */}
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

              {/* Save and Back buttons */}
              <button type="button" onClick={() => this.saveCategory()}>
                Save
              </button>
              <button type="button" onClick={() => this.closeModal()}>
                Back
              </button>
            </form>
          </Modal>
        )}
      </div>
    );
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
      txtID: '',    // Reset txtID and txtName when closing modal
      txtName: '',
    });
  }

  saveCategory() {
    const id = this.state.txtID;
    const name = this.state.txtName;

    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
      this.closeModal();
    } else {
      alert('Please input name');
    }
  }
  btnEditClick(item) {
    this.setState({
      itemSelected: item,
      txtID: item._id,
      txtName: item.name,
      isModalOpen: true,
    });
  }
    btnDeleteClick(e) {
      e.preventDefault();
      if (window.confirm('ARE YOU SURE?')) {
        const id = this.state.txtID;
        if (id) {
          this.apiDeleteCategory(id);
        } else {
          alert('Please input id');
        }
      }
    }
    
    // apis
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
    
    apiGetCategories() {
      const config = { headers: { 'x-access-token': this.context.token } };
      axios.get('/api/admin/categories', config).then((res) => {
        const result = res.data;
        this.props.updateCategories(result);
      });
    }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
}
export default CategoryDetail;