import React, { useState } from "react";
import "../AdminCSS/addProduct.css";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";

const AddProduct = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    offerPrice: "",
    weight: "",
    flavor: "",
    description: "",
    image: "",
    stock: "",
    rating: 0,
    reviews: 0,
    deliveryTime: "1 Hour",
    status: "Active"
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  const handleImageUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      // Replace with your upload preset
      formData.append("upload_preset", "cake_profile");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/drplkjebm/image/upload",
        formData
      );

      console.log("secure image url : ", response.data.secure_url);

      setProductData((prev) => ({
        ...prev,
        image: response.data.secure_url
      }));

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

      alert("Image Upload Failed");

    }

  };

  const handleReset = () => {

    setProductData({
      name: "",
      category: "",
      price: "",
      offerPrice: "",
      weight: "",
      flavor: "",
      description: "",
      image: "",
      stock: "",
      rating: 0,
      reviews: 0,
      deliveryTime: "1 Hour",
      status: "Active"
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:3000/products",
        {
          ...productData,
          createdAt: new Date()
            .toISOString()
            .split("T")[0]
        }
      );

      alert("Product Added Successfully");

      navigate("/product");

    } catch (error) {

      console.log(error);

      alert("Failed To Add Product");

    }

  };

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

          <li style={{ backgroundColor: "purple" }}>
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
            onClick={() => navigate("/adminLogin")}
            style={{ backgroundColor: "gray" }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </li>

        </ul>

      </aside>

      <div className="main-content">

        <div className="page-header">

          <div>
            <h2>Add New Cake</h2>
            <p>Create and manage cake products</p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/product")}
          >
            ← Back
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="row g-4">
            <div className="col-lg-12">

              <div className="form-card">

                <h4>Product Information</h4>

                <div className="row g-4">

                  <div className="col-md-6">
                    <label>Cake Name</label>
                    <input
                      type="text"
                      name="name"
                      className="custom-input"
                      placeholder="Chocolate Truffle Cake"
                      value={productData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Category</label>
                    <select
                      name="category"
                      className="custom-input"
                      value={productData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select Category
                      </option>
                      <option>Birthday Cakes</option>
                      <option>Wedding Cakes</option>
                      <option>Chocolate Cakes</option>
                      <option>Anniversary Cakes</option>
                      <option>Designer Cakes</option>
                      <option>Cup Cakes</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      className="custom-input"
                      value={productData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Offer Price</label>
                    <input
                      type="number"
                      name="offerPrice"
                      className="custom-input"
                      value={productData.offerPrice}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Weight</label>
                    <select
                      name="weight"
                      className="custom-input"
                      value={productData.weight}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select Weight
                      </option>
                      <option>500 gm</option>
                      <option>1 Kg</option>
                      <option>2 Kg</option>
                      <option>3 Kg</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label>Flavor</label>
                    <input
                      type="text"
                      name="flavor"
                      className="custom-input"
                      value={productData.flavor}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Stock</label>
                    <input
                      type="number"
                      name="stock"
                      className="custom-input"
                      value={productData.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Delivery Time</label>
                    <input
                      type="text"
                      name="deliveryTime"
                      className="custom-input"
                      value={productData.deliveryTime}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      name="rating"
                      className="custom-input"
                      value={productData.rating}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Reviews</label>
                    <input
                      type="number"
                      name="reviews"
                      className="custom-input"
                      value={productData.reviews}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">

                    <label>Status</label>

                    <select
                      name="status"
                      className="custom-input"
                      value={productData.status}
                      onChange={handleChange}
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>

                  </div>

                  <div className="col-12">

                    <label>Description</label>

                    <textarea
                      rows="5"
                      name="description"
                      className="custom-input"
                      value={productData.description}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-12">

                    <label>Product Image</label>

                    <input
                      type="file"
                      className="custom-input"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />

                    {
                      loading && (
                        <p
                          style={{
                            marginTop: "10px",
                            color: "green"
                          }}
                        >
                          Uploading Image...
                        </p>
                      )
                    }

                    {
                      productData.image && (
                        <div
                          style={{
                            marginTop: "15px"
                          }}
                        >

                          <img
                            src={productData.image}
                            alt="preview"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "cover",
                              borderRadius: "10px"
                            }}
                          />

                        </div>
                      )
                    }

                  </div>

                </div>

                <div className="button-group">

                  <button
                    type="button"
                    className="reset-btn"
                    onClick={handleReset}
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="save-btn"
                    disabled={loading}
                  >
                    {
                      loading
                        ? "Uploading..."
                        : "Save Product"
                    }
                  </button>

                </div>

              </div>

            </div>

          </div>

        </form>

      </div>

    </div>
  );

};

export default AddProduct;