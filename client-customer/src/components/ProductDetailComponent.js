import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import './ProductDetails.css'
class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1,
    };
  }

  render() {
    const prod = this.state.product;

    if (prod != null) {
      return (
        <div className="container mt-5" >
          <h2 className="col-lg-12 text-center">PRODUCT DETAILS</h2>
          <div className="row" id="img-details">
            <div className="col-lg-6 col-md-6">
              <img id="img-img"
                src={`data:image/jpg;base64,${prod.image}`}
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-lg-6 col-md-6">
              <form>
                <table className="table">
                  <tbody>

                    <tr>
                      <td align="left">Name:</td>
                      <td>{prod.name}</td>
                    </tr>
                    <tr>
                      <td align="left">Price:</td>
                      <td>{prod.price}</td>
                    </tr>
                    <tr>
                      <td align="left">Genre:</td>
                      <td>{prod.category.name}</td>
                    </tr>
                    <tr>
                      <td align="left">Quantity:</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={this.state.txtQuantity}
                          onChange={(e) =>
                            this.setState({ txtQuantity: e.target.value })
                          }
                          className="form-control"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <input id="btn-details"
                          type="submit"
                          className="btn btn-primary"
                          value="ADD TO CART"
                          onClick={(e) => this.btnAdd2CartClick(e)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return <div />;
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }

  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);

    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex((x) => x.product._id === product._id);

      if (index === -1) {
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else {
        mycart[index].quantity += quantity;
      }

      this.context.setMycart(mycart);
      alert('OK BABY!');
    } else {
      alert('Please input quantity');
    }
  }
}

export default withRouter(ProductDetail);
