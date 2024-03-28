import React, { Component } from 'react';
import withRouter from '../../utils/withRouter';
import './AboutUsComponent.css'

class About extends Component {
  

  render() {
    return (
      <>
        <div class="about-section">
            <h1>About Our Website</h1>
            <p>This is an e-commerce portal that specializes in the distribution of PC games.</p>
            <p>It was founded in November 2023 and has generated quite a stir in the gaming business.</p>
            <p>Sponsored and endorsed by notable businesses, companies, and studios including: FromSoftware,...</p>
        </div>
        <h2 className='title-h2'>Our Team</h2>
        <div class="row">
            <div class="column">
                <div class="card">
                    <div class="container">
                        <h2>Lê Đình Khánh</h2>
                        <p class="title">Full stack developer</p>
                        <p>Become a good developer in the future</p>
                        <p>khanhle@gmail.com</p>
                        <hr></hr>
                        <p><a href='https://www.facebook.com/tenchi.takumi/?locale=vi_VN'><button class="button">Contact</button></a></p>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="card">
                    <div class="container">
                        <h2>Hoàng Đức Anh</h2>
                        <p class="title">Full stack developer</p>
                        <p>Want to learn more about technology </p>
                        <p>ducanh@gmail.com</p>
                        <hr></hr>
                        <p><a href='https://www.facebook.com/ducanh.hoang.0412?locale=vi_VN'><button class="button">Contact</button></a></p>
                    </div>
                </div>
            </div>
            
        </div>
        
      </>
    );
  }
}
export default withRouter(About);