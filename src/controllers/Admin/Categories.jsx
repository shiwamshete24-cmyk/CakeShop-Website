import React, { useEffect, useState } from "react";
import "../AdminCSS/categories.css";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";

const Categories = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3000/products"
      );

      setProducts(response.data || []);

    } catch (error) {

      console.log(error);

    }

  };

  const categories = [
    ...new Set(
      products.map(
        (item) => item.category
      )
    )
  ];

  const filteredCategories =
    categories.filter((category) =>
      category
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

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

          <li
            style={{
              backgroundColor: "purple"
            }}
          >
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

        <div className="categories-page">

          <div className="container-fluid">

            <div className="categories-header">

              <div>

                <h2>
                  Categories
                </h2>

                <p>
                  Manage cake categories
                </p>

              </div>

            </div>
            <div className="row g-4 mb-4">

              <div className="col-md-4">

                <div className="category-stat-card">

                  <h3>
                    {categories.length}
                  </h3>

                  <p>
                    Total Categories
                  </p>

                </div>

              </div>

              <div className="col-md-4">

                <div className="category-stat-card">

                  <h3>
                    {products.length}
                  </h3>

                  <p>
                    Total Products
                  </p>

                </div>

              </div>

              <div className="col-md-4">

                <div className="category-stat-card">

                  <h3>
                    {categories.length}
                  </h3>

                  <p>
                    Active Categories
                  </p>

                </div>

              </div>

            </div>

            <div className="category-search-card">

              <input
                type="text"
                placeholder="Search Category..."
                className="category-search"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="categories-card">

              <div className="table-responsive">

                <table className="table align-middle">

                  <thead>

                    <tr>

                      <th>ID</th>

                      <th>
                        Category Name
                      </th>

                      <th>
                        Products
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Created Date
                      </th>

                      <th>
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredCategories.length >
                        0 ? (

                        filteredCategories.map(
                          (
                            category,
                            index
                          ) => {

                            const categoryProducts =
                              products.filter(
                                (
                                  item
                                ) =>
                                  item.category ===
                                  category
                              );

                            const createdDate =
                              categoryProducts[0]
                                ?.createdAt ||
                              "-";

                            return (

                              <tr
                                key={index}
                              >

                                <td>
                                  CAT
                                  {String(
                                    index +
                                    1
                                  ).padStart(
                                    3,
                                    "0"
                                  )}
                                </td>

                                <td>
                                  {category}
                                </td>

                                <td>
                                  {
                                    categoryProducts.length
                                  }
                                </td>

                                <td>

                                  <span className="cat-status active-cat">
                                    Active
                                  </span>

                                </td>

                                <td>
                                  {
                                    createdDate
                                  }
                                </td>

                                <td>

                                  <button
                                    className="cat-edit-btn"
                                    onClick={() =>
                                      navigate(
                                        `/categorydetails/${encodeURIComponent(category)}`
                                      )
                                    }
                                  >
                                    View
                                  </button>

                                  <button
                                    className="cat-delete-btn"
                                    onClick={() => {

                                      alert(
                                        "Category comes from products. Delete all products of this category first."
                                      );

                                    }}
                                  >
                                    Delete
                                  </button>

                                </td>

                              </tr>

                            );

                          }
                        )

                      ) : (

                        <tr>

                          <td
                            colSpan="6"
                            className="text-center"
                          >
                            No Categories Found
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

export default Categories;