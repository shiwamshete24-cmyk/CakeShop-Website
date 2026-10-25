import React, { useEffect, useState } from "react";
import "../AdminCSS/orders.css";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";

const Orders = () => {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3000/orders"
      );

      setOrders(response.data || []);

    } catch (error) {

      console.log(error);

    }

  };

  const totalOrders = orders.length;

  const processingOrders =
    orders.filter(
      (item) =>
        item.status === "Processing"
    ).length;

  const deliveredOrders =
    orders.filter(
      (item) =>
        item.status === "Delivered"
    ).length;

  const cancelledOrders =
    orders.filter(
      (item) =>
        item.status === "Cancelled"
    ).length;

  const filteredOrders =
    orders.filter((order) => {

      const searchMatch =
        order.id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        order.fullName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const statusMatch =
        statusFilter === "All"
          ? true
          : order.status === statusFilter;

      return (
        searchMatch &&
        statusMatch
      );

    });

  return (
    <div className="admin-layout">

      <aside className="sidebar">

        <div className="sidebar-logo">
          <h3>CakeAdmin</h3>
        </div>

        <ul className="sidebar-menu">

          <li style={{ "backgroundColor": "red" }}>
            <NavLink
              to="/admindashboard"
              style={{
                textDecoration: "none",
                color: "white"
              }}
            >
              <i className="fa-solid fa-chart-line"></i>
              <span className="px-2">
                Dashboard
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/product"
              style={{
                textDecoration: "none",
                color: "white"
              }}
            >
              <i className="fa-solid fa-cake-candles"></i>
              <span className="px-2">
                Products
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/addproduct"
              style={{
                textDecoration: "none",
                color: "white"
              }}
            >
              <i className="fa-solid fa-plus"></i>
              <span className="px-2">
                Add Product
              </span>
            </NavLink>
          </li>

          <li
            style={{
              backgroundColor: "purple"
            }}
          >
            <NavLink
              to="/orders"
              style={{
                textDecoration: "none",
                color: "white"
              }}
            >
              <i className="fa-solid fa-bag-shopping"></i>
              <span className="px-2">
                Orders
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/customers"
              style={{
                textDecoration: "none",
                color: "white"
              }}
            >
              <i className="fa-solid fa-users"></i>
              <span className="px-2">
                Customers
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/categories"
              style={{
                textDecoration: "none",
                color: "white"
              }}
            >
              <i className="fa-solid fa-layer-group"></i>
              <span className="px-2">
                Categories
              </span>
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
            onClick={() =>
              navigate("/adminLogin")
            }
            style={{
              backgroundColor: "gray"
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </li>

        </ul>

      </aside>

      <div className="main-content">

        <div className="orders-page">

          <div className="container-fluid">

            <div className="orders-header">

              <div>

                <h2>
                  Orders Management
                </h2>

                <p>
                  Manage customer orders and deliveries
                </p>

              </div>

            </div>
                        <div className="row g-4 mb-4">

              <div className="col-lg-3 col-md-6">
                <div className="order-stat-card">
                  <h3>{totalOrders}</h3>
                  <p>Total Orders</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="order-stat-card">
                  <h3>{processingOrders}</h3>
                  <p>Processing Orders</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="order-stat-card">
                  <h3>{deliveredOrders}</h3>
                  <p>Delivered</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="order-stat-card">
                  <h3>{cancelledOrders}</h3>
                  <p>Cancelled</p>
                </div>
              </div>

            </div>

            <div className="order-filter-box">

              <input
                type="text"
                placeholder="Search Order ID / Customer..."
                className="order-search"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <select
                className="order-select"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >
                <option value="All">
                  All Status
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>

            </div>

            <div className="orders-card">

              <div className="table-responsive">

                <table className="table align-middle">

                  <thead>

                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Cakes</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredOrders.length > 0 ? (

                        filteredOrders
                          .slice()
                          .reverse()
                          .map((order) => (

                            <tr key={order.id}>

                              <td>
                                {order.id}
                              </td>

                              <td>
                                {order.fullName}
                              </td>

                              <td>
                                {
                                  order.cakes
                                    ?.map(
                                      (cake) =>
                                        cake.name
                                    )
                                    .join(", ")
                                }
                              </td>

                              <td>
                                ₹
                                {order.totalAmount}
                              </td>

                              <td>
                                {
                                  order.paymentMethod
                                }
                              </td>

                              <td>

                                <span
                                  className={`status-badge ${order.status?.toLowerCase()}`}
                                >
                                  {order.status}
                                </span>

                              </td>

                              <td>

                                {
                                  new Date(
                                    order.orderDate
                                  ).toLocaleDateString(
                                    "en-IN"
                                  )
                                }

                              </td>

                              <td>

                                <button
                                  className="view-order-btn"
                                  onClick={() =>
                                    navigate(
                                      `/orderdetails/${order.id}`
                                    )
                                  }
                                >
                                  View
                                </button>

                              </td>

                            </tr>

                          ))

                      ) : (

                        <tr>

                          <td
                            colSpan="8"
                            className="text-center"
                          >
                            No Orders Found
                          </td>

                        </tr>

                      )
                    }

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );

};

export default Orders;