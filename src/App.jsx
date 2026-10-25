import { useState } from 'react'
import Header from './controllers/Header'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './controllers/Home'
import Products from './controllers/Products'
import About from './controllers/About'
import Contact from './controllers/Contact'
import Page_Not_Found from './controllers/Page_Not_Found'
import Profile from './controllers/Profile'
import Order from './controllers/Order'
import Cart from './controllers/Cart'
import Checkout from './controllers/Checkout'

import AddProduct from './controllers/Admin/AddProduct.jsx'
import AdminDashboard from './controllers/Admin/AdminDashboard.jsx'
import Categories from './controllers/Admin/Categories.jsx'
import Customers from './controllers/Admin/Customers.jsx'
import Orders from './controllers/Admin/Orders.jsx'
import Product from './controllers/Admin/Product.jsx'
import OrderDetails from './controllers/Admin/OrderDetails.jsx'
import Signup from './controllers/SignUp.jsx'
import Login from './controllers/Login.jsx'
import AdminLogin from './controllers/Admin/AdminLogin.jsx'
import Navbar from "./controllers/Navbar.jsx";
import RoleSelection from './controllers/RoleSelection.jsx'
import ForgotPassword from './controllers/ForgotPassword.jsx'
import ChangePassword from './controllers/ChangePassword.jsx'
import AdminHomePageNavbar from './controllers/AdminHomePageNavbar.jsx'
import ProfileForm from './controllers/ProfileForm.jsx'
import ProductDetails from './controllers/ProductDetails.jsx'
import OrderDetail from './controllers/OrderDetail.jsx'
import CustomerDetails from './controllers/Admin/CustomerDetails.jsx'
import CategoryDetails from './controllers/Admin/CategoryDetails.jsx'
import EditProduct from './controllers/Admin/EditProduct.jsx'
import ViewMessages from './controllers/Admin/ViewMessages.jsx'


function App() {

  return (
    <React.Fragment>

      <BrowserRouter>

        <Routes>
          <Route element={<Header />}>
            <Route path='home' element={<Home />} />
            <Route path='products' element={<Products />} />
            <Route path='about' element={<About />} />
            {/* <Route path='blog' element={<Blog/>}/> */}
            <Route path='contact' element={<Contact />} />
            <Route path='profile' element={<Profile />} />
            <Route path='order' element={<Order />} />
            <Route path='cart' element={<Cart />} />
            <Route path='cart/:id' element={<ProductDetails />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path="profileform" element={<ProfileForm />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='productDetails' element={<ProductDetails />} />
            <Route path='products/:id' element={<ProductDetails />} />
            <Route path="order/:id" element={<OrderDetail/>}
            />
          </Route>

          {/* admin  */}
          <Route path='addproduct' element={<AddProduct />} />
          <Route path='adminDashboard' element={<AdminDashboard />} />
          <Route path='categories' element={<Categories />} />
          <Route path='customers' element={<Customers />} />
          <Route path='ordersdetails' element={<OrderDetails />} />
          <Route path='orders' element={<Orders />} />
          <Route path='product' element={<Product />} />
          <Route path="/orderdetails/:id" element={<OrderDetails />}/>
          <Route path="/customerdetails/:id" element={<CustomerDetails/>}/>
          <Route path="/categorydetails/:categoryName"  element={<CategoryDetails/>}/>
          <Route path="/editproduct/:id" element={<EditProduct/>}/>
          <Route  path="/viewmessages"  element={<ViewMessages/>}/>


          <Route element={<Navbar />}>
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
            <Route path='forget-password' element={<ForgotPassword />} />
          </Route>


          <Route element={<AdminHomePageNavbar />}>
            <Route path="adminLogin" element={<AdminLogin />} />
          </Route>

          <Route path='/' element={<RoleSelection />} />

          <Route path='*' element={<Page_Not_Found />} />

        </Routes>


      </BrowserRouter>

    </React.Fragment>
  )
}

export default App
