import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../../utils/withRouter';
import { FaStar } from 'react-icons/fa';
import { IoCart } from 'react-icons/io5';
import './ProductComponent.css';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      sortOption: 'asc', // Default sorting order is ascending
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="col-md-3" id="card1">
          <div className="card1 p-3">
            <Link to={'/product/' + item._id}>
              <img
                src={'data:image/jpg;base64,' + item.image}
                className="img-fluid mb-3"
                alt=""
              />
            </Link>
            <div className="product-details">
              <span className="font-weight-bold d-block">${item.price}</span>
              <span>
                <b>{item.name}</b>
              </span>

              <div className="star1">
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
              </div>

              <div className="buttons d-flex flex-row">
                <Link to={'/mycart'} className="cart-link">
                  <div className="cart">
                    <IoCart />
                  </div>
                </Link>
                <Link to={'/product/' + item._id} className="view-details-link">
                  <button className="btn btn-success cart-button btn-block">
                    <span className="dot"></span>View Details
                  </button>
                </Link>
              </div>
              <div className="kind">
                <small>Genre: {item.category.name}</small>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <h1 id="list-name" className="text-center mt-3">
          LIST PRODUCTS
        </h1>
        <section className="container">
          <div className="row py-5">
            {/* Sort options */}
            <div className="col-md-12 mb-3">
              <label htmlFor="sortSelect" className="form-label">
                Sort by Price:
              </label>
              <select
                id="sortSelect"
                className="form-select"
                onChange={(e) => this.handleSortChange(e)}
              >
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
            {prods}
          </div>
        </section>
      </div>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  // Event handler for sort change
  handleSortChange(event) {
    const selectedOption = event.target.value;
    this.setState({ sortOption: selectedOption }, () => {
      // Call the sorting function after updating the state
      this.sortProductsByPrice();
    });
  }

  // Sorting function
  sortProductsByPrice() {
    const sortedProducts = [...this.state.products].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);

      if (this.state.sortOption === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    this.setState({ products: sortedProducts });
  }

  // APIs
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  // APIs
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}

export default withRouter(Product);
