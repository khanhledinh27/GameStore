import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomeComponent.css';
import Carousel from './CarouselComponent';
import { FaStar } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }

  renderProductCards(products) {
    return products.map((item) => (
      <div key={item._id} className="col-md-3" id='product-details2'>
        <div className="card1 p-3">
          <Link to={'/product/' + item._id}>
            <img id='img-hom'src={"data:image/jpg;base64," + item.image} className="img-fluid mb-3" alt="" />
          </Link>
          <div id='text' className="product-details ">
            <span className="font-weight-bold d-block">${item.price}</span>
            <span><b>{item.name}</b></span>
            <div className="star1">
              <span><FaStar /></span>
              <span><FaStar /></span>
              <span><FaStar /></span>
              <span><FaStar /></span>
              <span><FaStar /></span>
            </div>

            <div className="buttons d-flex flex-row">
              <Link to={'/mycart'} className="cart-link">
                <div className="cart"><IoCart /></div>
              </Link>
              <Link to={'/product/' + item._id} className="view-details-link">
                <button className="btn btn-success cart-button btn-block"><span className="dot"></span>View Details</button>
              </Link>
            </div>
            <div className="kind">
              <small>Genre: {item.category.name}</small>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  renderSection(title, products) {
    return (
      <div className="text-center mt-3">
        <h1><b>{title}</b></h1>
        <section className='container'>
          <div className='row py-5 justify-content-center'>
            {this.renderProductCards(products)}
          </div>
        </section>
      </div>
    );
  }

  render() {
    const { hotprods, newprods } = this.state;

    return (
      <div >
        <Carousel />

        {hotprods.length > 0 && (
          <div>
            <br></br>
            {this.renderSection("HOT PRODUCTS", hotprods)}
          </div>
        )}

        <div className="text-center">
          {newprods.length > 0 && this.renderSection("NEW PRODUCTS", newprods)}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}

export default Home;
