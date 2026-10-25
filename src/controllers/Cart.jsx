import React, { useEffect, useState } from "react";
import "./css/cart.css";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";

const Cart = () => {

  const navigate = useNavigate();

  const [results, setResults] = useState([]);

  useEffect(() => {


    const userData = JSON.parse(
      localStorage.getItem("userData")
    );

    if (!userData) {
      navigate("/");
    }


  }, [navigate]);

  const userData = JSON.parse(
    localStorage.getItem("userData")
  );

  const userEmail = userData?.email;

  useEffect(() => {


    const fetchCartData = async () => {

      try {

        const cartResponse =
          await axios.get(
            `http://localhost:3000/cart?email=${userEmail}`
          );

        setResults(cartResponse.data);

      } catch (error) {

        console.log(error);

      }

    };

    if (userEmail) {
      fetchCartData();
    }


  }, [userEmail]);

  const sendData = (id) => {


    navigate(`/products/${id}`);


  };

  const increaseQty = async (item) => {


    try {

      const updatedQty =
        item.quantity + 1;

      const updatedSubtotal =
        updatedQty * item.price;

      const response =
        await axios.patch(
          `http://localhost:3000/cart/${item.id}`,
          {
            quantity: updatedQty,
            subtotal: updatedSubtotal
          }
        );

      if (response.status === 200) {

        setResults(prev =>
          prev.map(cartItem =>
            cartItem.id === item.id
              ? {
                ...cartItem,
                quantity: updatedQty,
                subtotal: updatedSubtotal
              }
              : cartItem
          )
        );

      }

    } catch (error) {

      console.log(error);

    }


  };

  const decreaseQty = async (item) => {


    try {

      if (item.quantity <= 1) {
        return;
      }

      const updatedQty =
        item.quantity - 1;

      const updatedSubtotal =
        updatedQty * item.price;

      const response =
        await axios.patch(
          `http://localhost:3000/cart/${item.id}`,
          {
            quantity: updatedQty,
            subtotal: updatedSubtotal
          }
        );

      if (response.status === 200) {

        setResults(prev =>
          prev.map(cartItem =>
            cartItem.id === item.id
              ? {
                ...cartItem,
                quantity: updatedQty,
                subtotal: updatedSubtotal
              }
              : cartItem
          )
        );

      }

    } catch (error) {

      console.log(error);

    }


  };

  const removeCard = async (product) => {

    
try {

  const removeCartResponse =
    await axios.delete(
      `http://localhost:3000/cart/${product.id}`
    );

if (
  removeCartResponse.status === 200
) {

  alert(
    "Cart Item Removed Successfully"
  );

  setResults(prev =>
    prev.filter(
      item =>
        item.id !== product.id
    )
  );

}

} catch (error) {

  console.log(error);

}


};

const totalItems = results.reduce(
  (sum, item) =>
    sum + item.quantity,
  0
);

const subtotal = results.reduce(
  (sum, item) =>
    sum + item.subtotal,
  0
);

const deliveryCharge =
  results.length > 0 ? 50 : 0;

const discount =
  subtotal >= 1000 ? 100 : 0;

const grandTotal =
  subtotal +
  deliveryCharge -
  discount;

return (


  <div className="cart-page">

    <div className="container py-5">

      <div className="cart-header">

        <h1>
          Shopping Cart
        </h1>

        <p>
          Review your selected cakes
          before checkout
        </p>

      </div>

      <div className="row g-4">

        <div className="col-lg-8">

          <div className="cart-card">

            {
              results.length > 0 ? (

                results.map((item) => (

                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    <img
                      src={
                              item.image
                                ? `/productsImages/${item.image}`
                                : `${item.image}`
                            }
                      alt=""
                      className="cart-img"

                      onError={(e)=>{e.target.src = item.image}}
                    />

                    <div className="cart-info">

                      <h4>
                        {item.name}
                      </h4>

                      <p>
                        {item.category}
                      </p>

                      <div className="qty-box">

                        <button
                          onClick={() =>
                            decreaseQty(
                              item
                            )
                          }
                        >
                          -
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQty(
                              item
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <div className="cart-price">

                      <h5>
                        ₹{item.subtotal}
                      </h5>

                      <button
                        className="btn btn-warning me-2"
                        onClick={() =>
                          sendData(
                            item.product_id
                          )
                        }
                      >
                        View Details
                      </button>

                      <button
                        className="btn btn-outline-danger"
                        onClick={() =>
                          removeCard(item)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                ))

              ) : (

                <div
                  className="text-center py-5"
                >

                  <h2>
                    Your Cart Is Empty
                  </h2>

                  <button
                    className="btn btn-primary mt-3"
                    onClick={() =>
                      navigate(
                        "/products"
                      )
                    }
                  >
                    Browse Products
                  </button>

                </div>

              )
            }

          </div>

        </div>

        <div className="col-lg-4">

          <div className="summary-card">

            <h3>
              Order Summary
            </h3>

            <div className="summary-row">

              <span>
                Total Items
              </span>

              <span>
                {totalItems}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <span>
                ₹{subtotal}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <span>
                ₹{deliveryCharge}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Discount
              </span>

              <span>
                -₹{discount}
              </span>

            </div>

            <hr />

            <div className="summary-total">

              <span>
                Total
              </span>

              <span>
                ₹{grandTotal}
              </span>

            </div>

            <button
              className="checkout-btn"
              disabled={grandTotal==0}
              onClick={() =>
                navigate(
                  "/checkout",
                  {
                    state: {
                      cartItems:
                        results,
                      total:
                        grandTotal
                    }
                  }
                )
              }
            >
              Proceed To Checkout
            </button>

            <button
              className="continue-btn"
              onClick={() =>
                navigate(
                  "/products"
                )
              }
            >
              Continue Shopping
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>

);

};

export default Cart;
