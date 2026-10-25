import React, { useEffect, useState } from "react";
import "../controllers/css/myproducts.css";
import axios from "axios";
import { useNavigate } from "react-router";

const Products = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Birthday Cakes",
    "Chocolate Cakes",
    "Wedding Cakes",
    "Anniversary Cakes",
    "Designer Cakes",
    "Photo Cakes",
    "Eggless Cakes",
    "Fruit Cakes",
    "Kids Special Cakes",
    "Cupcakes",
    "Pastries",
    "Jar Cakes",
    "Bento Cakes",
    "Theme Cakes",
    "Dry Cakes",
    "Tea Cakes",
    "Cheesecakes",
    "Brownies",
    "Donuts",
    "Premium Luxury Cakes",
    "Festival Cakes"
  ];

  useEffect(() => {

    if (!JSON.parse(localStorage.getItem("userData"))) {
      navigate("/");
    }



  }, []);

  const fetchProducts = async (category) => {

    try {

      setLoading(true);

      let url = "http://localhost:3000/products";

      if (category !== "All") {
        url =
          `http://localhost:3000/products?category=${category}`;
      }

      const response = await axios.get(url);

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchProducts("All");

  }, []);

  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const userData = JSON.parse(localStorage.getItem("userData"));



  // const addToCart = async (product) => {

  //   try {

  //     console.log("product id : ", typeof product.id);
  //     console.log("product id : ", product.id);

  //     const cartResponse = await axios.post(`http://localhost:3000/cart`, {

  //       email: userData.email,
  //       product_id: product.id,
  //       quantity: 1,
  //       price: product.offerPrice,
  //       subtotal: product.offerPrice,
  //       image: product.image,
  //       name: product.name,
  //       category: product.category
  //     });

  //     if (cartResponse.data) {
  //       navigate("/cart");
  //     } else {
  //       alert("product not added to cart , please try again!");
  //       return;
  //     }

  //   } catch (error) {
  //     console.log("something went wrong......", error);
  //     console.error(error);

  //   }

  // }


  const addToCart = async (product) => {

    try {

      const userData =
        JSON.parse(
          localStorage.getItem("userData")
        );

      const cartResponse =
        await axios.get(
          "http://localhost:3000/cart"
        );

      const existingProduct =
        cartResponse.data.find(
          (item) =>
            item.product_id === product.id &&
            item.email === userData.email
        );

      if (existingProduct) {

        const updatedQuantity =
          existingProduct.quantity + 1;

        const updatedSubtotal =
          updatedQuantity *
          existingProduct.price;

        await axios.patch(
          `http://localhost:3000/cart/${existingProduct.id}`,
          {
            quantity: updatedQuantity,
            subtotal: updatedSubtotal
          }
        );

        // alert(
        //   `Quantity Updated (${updatedQuantity})`
        // );

      } else {

        await axios.post(
          "http://localhost:3000/cart",
          {
            email: userData.email,
            product_id: product.id,
            quantity: 1,
            price: product.offerPrice,
            subtotal: product.offerPrice,
            image: product.image,
            name: product.name,
            category: product.category
          }
        );

        // alert("Product Added To Cart");

      }

      navigate("/cart");

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong. Please try again."
      );

    }

  };

  const sendData = (id) => {

    navigate(`/products/${id}`);
    console.log(id);
  }


  return (

    <section className="product-page">

      <div className='row g-0 justify-content-start align-items-buttom product-bg-img'>
        <div className='col-md-5 col-lg-3 d-none d-md-block'>
          <img src="src\assets\hero-shape.png" alt="" className='img-fluid' />
        </div>
        <div className='col-12 col-md-7 col-lg-9 align-content-center'>
          <h1 className='product-name'>Our Delicious Cakes</h1>
          {/* <h3>Our Delicious products</h3> */}
        </div>
      </div>

      <div className="container">

        <div className="search-section">

          <input
            type="text"
            placeholder="Search Cakes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="search-input"
          />

        </div>

      </div>

      <div className="container">

        <div className="category-tabs">

          {
            categories.map((category) => (

              <button
                key={category}
                className={
                  activeCategory === category
                    ? "tab-btn active-tab"
                    : "tab-btn"
                }
                onClick={() => {

                  setActiveCategory(category);

                  fetchProducts(category);

                }}
              >
                {category}
              </button>

            ))
          }

        </div>

      </div>

      <div className="container py-5">

        {
          loading ?

            (
              <h2 className="loading-text">
                Loading Cakes...
              </h2>
            )

            :

            (
              <div className="row">

                {
                  filteredProducts.map((product) => (

                    <div
                      className="col-lg-3 col-md-4 col-sm-6 mb-4"
                      key={product.id}
                    >

                      <div className="product-card">

                        <div className="image-wrapper">

                          {
                            product.stock > 0 ?

                              (
                                <span className="stock-badge available">
                                  In Stock
                                </span>
                              )

                              :

                              (
                                <span className="stock-badge out-stock">
                                  Out Of Stock
                                </span>
                              )
                          }

                          <img
                            src={`/productsImages/${product.image}`}
                            alt={product.name}
                            onError={(e) => {
                              e.target.src =
                                `${product.image}`;
                            }}
                            className="product-image"
                          />

                        </div>

                        <div className="product-body">

                          <span className="category-badge">

                            {product.category}

                          </span>

                          <h5 className="product-title">

                            {product.name}

                          </h5>



                          <div className="product-info">

                            <span>
                              🍓 {product.flavor}
                            </span>

                            <span>
                              ⚖️ {product.weight}
                            </span>

                          </div>

                          <div className="extra-info">

                            <p>
                              📦 Stock :
                              <strong>
                                {" "}
                                {product.stock}
                              </strong>
                            </p>

                            <p>
                              🚚 Delivery :
                              <strong>
                                {" "}
                                {product.deliveryTime}
                              </strong>
                            </p>

                          </div>

                          <div className="rating-row">

                            ⭐ {product.rating}

                            <span>
                              {" "}
                              ({product.reviews} Reviews)
                            </span>

                          </div>

                          <div className="discount-row">

                            <span className="discount-badge">

                              {
                                Math.round(
                                  (
                                    (
                                      product.price -
                                      product.offerPrice
                                    )
                                    /
                                    product.price
                                  ) * 100
                                )
                              }
                              % OFF

                            </span>

                          </div>

                          <div className="price-row">

                            <span className="offer-price">

                              ₹{product.offerPrice}

                            </span>

                            <span className="original-price">

                              ₹{product.price}

                            </span>

                          </div>

                          <div className="button-group">

                            <button
                              className="view-btn1"
                              onClick={() => sendData(product.id)}
                              disabled={product.stock === 0}
                            >
                              View Details
                            </button>

                            <button
                              className="cart-btn1"
                              onClick={() => addToCart(product)}
                              disabled={product.stock === 0}
                            >
                              {
                                product.stock === 0
                                  ? "Out Of Stock"
                                  : "Add To Cart"
                              }
                            </button>

                          </div>

                        </div>

                      </div>

                    </div>

                  ))
                }

              </div>
            )
        }

      </div>

    </section>

  );

};

export default Products;