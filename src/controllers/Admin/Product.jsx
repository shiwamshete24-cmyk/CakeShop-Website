import React, { useEffect, useState } from "react";
import "../AdminCSS/Products.css";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";

const Products = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:3000/products/${id}`
      );

      fetchProducts();

    } catch (error) {

      console.log(error);

    }

  };

  const categories = [
    "All",
    ...new Set(
      products.map((item) => item.category)
    ),
  ];

  const filteredProducts = products.filter(
    (item) => {

      const categoryMatch =
        selectedCategory === "All"
          ? true
          : item.category === selectedCategory;

      const searchMatch =
        item.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return categoryMatch && searchMatch;

    }
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

          <li
            style={{
              backgroundColor: "purple"
            }}
          >
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

        <div className="container-fluid">

          <div className="products-top">

            <div>
              <h2>Products</h2>
              <p>
                Manage all cake products
              </p>
            </div>

            <div className="header-right">

              <button
                className="add-btn"
                onClick={() =>
                  navigate("/addproduct")
                }
              >
                + Add Product
              </button>

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

          <div className="category-tabs">

            {
              categories.map(
                (category, index) => (

                  <button
                    key={index}
                    className={`tab-btn ${selectedCategory === category
                      ? "active-tab"
                      : ""
                      }`}
                    onClick={() =>
                      setSelectedCategory(
                        category
                      )
                    }
                  >
                    {category}
                  </button>

                )
              )
            }

          </div>

          <div className="search-box">

            <input
              type="text"
              placeholder="Search Product..."
              className="product-search"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>
          {/* Products */}

          <div className="row g-4">

            {
              filteredProducts.length > 0 ? (

                filteredProducts.map((product) => (

                  <div
                    className="col-lg-3 col-md-6"
                    key={product.id}
                  >

                    <div className="product-card">

                      <img
                        src={`/productsImages/${product.image}`}
                        alt={product.name}
                        className="cake-img"
                        onError={(e) => {
                          e.target.src = `${product.image}`;
                        }}
                      />

                      <div className="product-content">

                        <h5>
                          {product.name}
                        </h5>

                        <p>
                          {product.category}
                        </p>

                        <h4>
                          ₹{product.offerPrice}
                        </h4>

                        <small
                          style={{
                            textDecoration:
                              "line-through",
                            color: "gray"
                          }}
                        >
                          ₹{product.price}
                        </small>

                        <br />

                        <small>
                          Weight :
                          {" "}
                          {product.weight}
                        </small>

                        <br />

                        <small>
                          Flavor :
                          {" "}
                          {product.flavor}
                        </small>

                        <br />

                        <small>
                          Stock :
                          {" "}
                          {product.stock}
                        </small>

                        <br />

                        <small>
                          Rating :
                          {" "}
                          ⭐
                          {product.rating}
                        </small>

                        <br />

                        <small>
                          Reviews :
                          {" "}
                          {product.reviews}
                        </small>

                        <br />

                        <small>
                          Delivery :
                          {" "}
                          {product.deliveryTime}
                        </small>

                        <br />

                        <span
                          className={`status ${product.status ===
                            "Active"
                            ? "active-status"
                            : "inactive-status"
                            }`}
                        >
                          {product.status}
                        </span>

                        <div
                          className="product-actions"
                          style={{
                            marginTop: "15px"
                          }}
                        >

                          <button
                            className="edit-btn"
                            onClick={() =>
                              navigate(`/editproduct/${product.id}`)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                product.id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                ))

              ) : (

                <div className="col-12">

                  <div
                    style={{
                      textAlign: "center",
                      padding: "50px"
                    }}
                  >

                    <h4>
                      No Products Found
                    </h4>

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

export default Products;