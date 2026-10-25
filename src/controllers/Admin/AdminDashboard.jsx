import React, { useEffect, useState } from "react";
import "../AdminCSS/AdminDashboard.css";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const usersData = await axios.get("http://localhost:3000/users");
        setUsers(usersData.data || []);

        const productsData = await axios.get("http://localhost:3000/products");
        setProducts(productsData.data || []);

        const ordersData = await axios.get("http://localhost:3000/orders");
        setOrders(ordersData.data || []);

      } catch (error) {

        console.log(error);

      }

    };

    fetchData();

  }, []);

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0
  );

  const topSellingMap = {};

  orders.forEach((order) => {

    order.cakes?.forEach((cake) => {

      if (!topSellingMap[cake.name]) {

        topSellingMap[cake.name] = 0;

      }

      topSellingMap[cake.name] += Number(cake.quantity || 0);

    });

  });

  const topSellingCakes = Object.entries(topSellingMap)
    .map(([name, sold]) => ({ name, sold }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 3);

  return (
    <div className="admin-layout">

      <aside className="sidebar">

        <div className="sidebar-logo">
          <h3>CakeAdmin</h3>
        </div>

        <ul className="sidebar-menu">

          <li className="active-menu">
            <NavLink
              to="/admindashboard"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-chart-line"></i>
              <span className="px-2">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/product"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-cake-candles"></i>
              <span className="px-2">Products</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/addproduct"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-plus"></i>
              <span className="px-2">Add Product</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/orders"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-bag-shopping"></i>
              <span className="px-2">Orders</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/customers"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-users"></i>
              <span className="px-2">Customers</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/categories"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-layer-group"></i>
              <span className="px-2">Categories</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/viewmessages"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-layer-group"></i>
              <span className="px-2">Messages</span>
            </NavLink>
          </li>

          <li
            onClick={() => navigate("/adminLogin")}
            style={{ backgroundColor: "gray" }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </li>

        </ul>

      </aside>

      <div className="main-content">

        <div className="dashboard-header">

          <div>
            <h2>Dashboard</h2>
            <p>Welcome back Admin 👋</p>
          </div>

          <div className="header-right">

            <div className="admin-profile">

              <img
                src="https://img.magnific.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg?semt=ais_hybrid&w=740&q=80"
                alt=""
              />

              <div>
                <h6>Admin</h6>
                <p>cake@gmail.com</p>
              </div>

            </div>

          </div>

        </div>

        <div className="row g-4">

          <div className="col-lg-3 col-md-6">
            <div className="stats-box">
              <h3>{orders.length}</h3>
              <p>Total Orders</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-box">
              <h3>₹{totalRevenue}</h3>
              <p>Total Revenue</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-box">
              <h3>{users.length}</h3>
              <p>Customers</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-box">
              <h3>{products.length}</h3>
              <p>Products</p>
            </div>
          </div>

        </div>

        <div className="dashboard-card mt-4">

          <div className="card-header-custom">

            <h4>Recent Orders</h4>

            <button
              className="view-btn"
              onClick={() => navigate("/orders")}
            >
              View All
            </button>

          </div>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Cakes</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {
                  orders.length > 0 ? (

                    [...orders]
                      .reverse()
                      .slice(0, 5)
                      .map((order) => (

                        <tr key={order.id}>

                          <td>{order.id}</td>

                          <td>{order.fullName}</td>

                          <td>{order.cakes?.length}</td>

                          <td>₹{order.totalAmount}</td>

                          <td>

                            <span
                              className={`status ${order.status?.toLowerCase()}`}
                            >
                              {order.status}
                            </span>

                          </td>

                        </tr>

                      ))

                  ) : (

                    <tr>

                      <td colSpan="5" className="text-center">
                        No Orders Found
                      </td>

                    </tr>

                  )
                }

              </tbody>

            </table>

          </div>

        </div>

        <div className="dashboard-card mt-4">

          <h4 className="mb-4">
            Top Selling Cakes
          </h4>

          <div className="row g-4">

            {
              topSellingCakes.length > 0 ? (

                topSellingCakes.map((cake, index) => (

                  <div
                    className="col-md-4"
                    key={index}
                  >

                    <div className="cake-card">

                      <h5>{cake.name}</h5>

                      <p>Sold : {cake.sold} Cakes</p>

                    </div>

                  </div>

                ))

              ) : (

                <div className="col-12">

                  <div className="cake-card">

                    <h5>No Sales Yet</h5>

                    <p>Sold : 0 Cakes</p>

                  </div>

                </div>

              )
            }

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;