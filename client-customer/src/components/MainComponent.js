import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent/HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Product from './ProductComponent/ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent/LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';
import Footer from './FooterComponent/FooterComponent'
import AboutUs from './AboutUsComponent/AboutUsComponent'
import Gmap from './GmapComponent';
import TawkMessenger from './TawkMessengerComponent';
class Main extends Component {
  render() {
    return (
        <div className="body-customer">
          <Menu />
          <Routes>
            <Route path='/' element={<Navigate replace to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/product/category/:cid' element={<Product />} />
            <Route path='/product/search/:keyword' element={<Product />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/active' element={<Active />} />
            <Route path='/login' element={<Login />} />
            <Route path='/myprofile' element={<Myprofile />} />
            <Route path='/mycart' element={<Mycart />} />
            <Route path='/myorders' element={<Myorders />} />
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/gmap' element={<Gmap />} />
            
          </Routes>
          <TawkMessenger />
          <Footer />
        </div>
      );
  }
}
export default Main;