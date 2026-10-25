import React, { useEffect, useState } from "react";
import "../AdminCSS/customers.css";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";

const Customers = () => {

  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const usersResponse =
        await axios.get(
          "http://localhost:3000/users"
        );

      const ordersResponse =
        await axios.get(
          "http://localhost:3000/orders"
        );

      setCustomers(
        usersResponse.data || []
      );

      setOrders(
        ordersResponse.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  const totalRevenue =
    orders.reduce(
      (total, item) =>
        total +
        Number(
          item.totalAmount || 0
        ),
      0
    );

  const filteredCustomers =
    customers.filter((customer) => {

      return (
        customer.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        customer.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
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

          <li>
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

          <li
            style={{
              backgroundColor: "purple"
            }}
          >
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

        <div className="customers-page">

          <div className="container-fluid">

            <div className="customers-header">

              <div>

                <h2>
                  Customers
                </h2>

                <p>
                  Manage all registered customers
                </p>

              </div>

            </div>
            <div className="row g-4 mb-4">

              <div className="col-lg-3 col-md-6">

                <div className="customer-stat-card">

                  <h3>
                    {customers.length}
                  </h3>

                  <p>
                    Total Customers
                  </p>

                </div>

              </div>

              <div className="col-lg-3 col-md-6">

                <div className="customer-stat-card">

                  <h3>
                    {customers.length}
                  </h3>

                  <p>
                    Active Customers
                  </p>

                </div>

              </div>

              <div className="col-lg-3 col-md-6">

                <div className="customer-stat-card">

                  <h3>
                    {
                      customers.filter(
                        (item) => {

                          const joinedMonth =
                            new Date()
                              .getMonth();

                          return (
                            joinedMonth >= 0
                          );

                        }
                      ).length
                    }
                  </h3>

                  <p>
                    New This Month
                  </p>

                </div>

              </div>

              <div className="col-lg-3 col-md-6">

                <div className="customer-stat-card">

                  <h3>
                    ₹
                    {totalRevenue}
                  </h3>

                  <p>
                    Total Revenue
                  </p>

                </div>

              </div>

            </div>

            <div className="customer-search-box">

              <input
                type="text"
                placeholder="Search customer..."
                className="customer-search"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="customers-card">

              <div className="table-responsive">

                <table className="table align-middle">

                  <thead>

                    <tr>
                      <th>
                        Customer
                      </th>

                      <th>
                        Email
                      </th>

                      <th>
                        Phone
                      </th>

                      <th>
                        Orders
                      </th>

                      <th>
                        Total Spent
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Action
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredCustomers.length >
                        0 ? (

                        filteredCustomers.map(
                          (customer) => {

                            const customerOrders =
                              orders.filter(
                                (
                                  order
                                ) =>
                                  order.email ===
                                  customer.email
                              );

                            const totalSpent =
                              customerOrders.reduce(
                                (
                                  total,
                                  order
                                ) =>
                                  total +
                                  Number(
                                    order.totalAmount ||
                                    0
                                  ),
                                0
                              );

                            return (

                              <tr
                                key={
                                  customer.id
                                }
                              >

                                <td>

                                  <div className="customer-info">

                                    <img
                                      src={`https://ui-avatars.com/api/?name=${customer.name}`}
                                      alt=""
                                      className="customer-img"
                                    />

                                    <span>
                                      {
                                        customer.name
                                      }
                                    </span>

                                  </div>

                                </td>

                                <td>
                                  {
                                    customer.email
                                  }
                                </td>

                                <td>
                                  {
                                    customer.phone
                                  }
                                </td>

                                <td>
                                  {
                                    customerOrders.length
                                  }
                                </td>

                                <td>
                                  ₹
                                  {
                                    totalSpent
                                  }
                                </td>

                                <td>

                                  <span className="customer-status active1">
                                    Active
                                  </span>

                                </td>

                                <td>

                                  <button
                                    className="view-customer-btn"
                                    onClick={() =>
                                      navigate(
                                        `/customerdetails/${customer.id}`
                                      )
                                    }
                                  >
                                    View
                                  </button>

                                </td>

                              </tr>

                            );

                          }
                        )

                      ) : (

                        <tr>

                          <td
                            colSpan="7"
                            className="text-center"
                          >
                            No Customers Found
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

export default Customers;