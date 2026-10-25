import React, { useEffect, useState } from "react";
import "./css/checkout.css";
import { useNavigate } from "react-router";
import axios from "axios";

const Checkout = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userData"));

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [customer, setCustomer] = useState({
        fullName: "",
        email: user?.email || "",
        phone: "",
        pincode: "",
        address: "",
        paymentMethod: "COD"
    });

    useEffect(() => {

        if (!user) {
            navigate("/");
            return;
        }

        fetchCart();

    }, []);

    const fetchCart = async () => {

        try {

            const res = await axios.get(
                "http://localhost:3000/cart"
            );

            const userCart = res.data.filter(
                item => item.email === user.email
            );

            setCartItems(userCart);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const subtotal = cartItems.reduce(
        (total, item) => total + Number(item.subtotal),
        0
    );

    let deliveryCharge;

    if (subtotal === 0) {
        deliveryCharge = 0;
    }
    else if (subtotal > 1500) {
        deliveryCharge = 0;
    }
    else {
        deliveryCharge = 50;
    }

    const totalAmount = subtotal + deliveryCharge;

    const handlePlaceOrder = async () => {

        try {

            if (cartItems.length === 0) {
                alert("Cart is Empty");
                return;
            }

            if (
                !customer.fullName ||
                !customer.phone ||
                !customer.pincode ||
                !customer.address
            ) {
                alert("Please fill all details");
                return;
            }

            const order = {

                id: `ORD${Date.now()}`,

                email: customer.email,

                fullName: customer.fullName,

                phone: customer.phone,

                pincode: customer.pincode,

                address: customer.address,

                paymentMethod: customer.paymentMethod,

                orderDate: new Date().toISOString(),

                status: "Processing",

                totalAmount: totalAmount,

                cakes: cartItems

            };

            await axios.post(
                "http://localhost:3000/orders",
                order
            );

            for (const item of cartItems) {

                await axios.delete(
                    `http://localhost:3000/cart/${item.id}`
                );

            }

            alert("Order Placed Successfully");

            navigate("/order");

        } catch (error) {

            console.log(error);

            alert("Failed to place order");

        }

    };

    return (

        <div className="checkout-page">

            <div className="container py-5">

                <div className="checkout-header">

                    <h1>Checkout</h1>

                    <p>
                        Complete your order securely
                    </p>

                </div>

                <div className="row g-4">

                    {/* Left Side */}

                    <div className="col-lg-8">

                        {/* Customer Information */}

                        <div className="checkout-card">

                            <h3>
                                Customer Information
                            </h3>

                            <div className="row g-3">

                                <div className="col-md-6">

                                    <input
                                        type="text"
                                        className="form-control checkout-input"
                                        placeholder="Full Name"
                                        value={customer.fullName}
                                        onChange={(e) =>
                                            setCustomer({
                                                ...customer,
                                                fullName:
                                                    e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <input
                                        type="email"
                                        className="form-control checkout-input"
                                        value={customer.email}
                                        readOnly
                                    />

                                </div>

                                <div className="col-md-6">

                                    <input
                                        type="text"
                                        className="form-control checkout-input"
                                        placeholder="Phone Number"
                                        value={customer.phone}
                                        onChange={(e) =>
                                            setCustomer({
                                                ...customer,
                                                phone:
                                                    e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <input
                                        type="text"
                                        className="form-control checkout-input"
                                        placeholder="Pincode"
                                        value={customer.pincode}
                                        onChange={(e) =>
                                            setCustomer({
                                                ...customer,
                                                pincode:
                                                    e.target.value
                                            })
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Address */}

                        <div className="checkout-card mt-4">

                            <h3>
                                Delivery Address
                            </h3>

                            <textarea
                                rows="4"
                                className="form-control checkout-input"
                                placeholder="Enter Complete Delivery Address"
                                value={customer.address}
                                onChange={(e) =>
                                    setCustomer({
                                        ...customer,
                                        address:
                                            e.target.value
                                    })
                                }
                            />

                        </div>

                        {/* Payment */}

                        <div className="checkout-card mt-4">

                            <h3>
                                Payment Method
                            </h3>

                            <div className="payment-option">

                                <input
                                    type="radio"
                                    name="payment"
                                    checked={
                                        customer.paymentMethod ===
                                        "COD"
                                    }
                                    onChange={() =>
                                        setCustomer({
                                            ...customer,
                                            paymentMethod:
                                                "COD"
                                        })
                                    }
                                />

                                <label>
                                    Cash On Delivery
                                </label>

                            </div>

                            <div className="payment-option">

                                <input
                                    type="radio"
                                    name="payment"
                                    checked={
                                        customer.paymentMethod ===
                                        "UPI"
                                    }
                                    onChange={() =>
                                        setCustomer({
                                            ...customer,
                                            paymentMethod:
                                                "UPI"
                                        })
                                    }
                                />

                                <label>
                                    UPI Payment
                                </label>

                            </div>

                            <div className="payment-option">

                                <input
                                    type="radio"
                                    name="payment"
                                    checked={
                                        customer.paymentMethod ===
                                        "CARD"
                                    }
                                    onChange={() =>
                                        setCustomer({
                                            ...customer,
                                            paymentMethod:
                                                "CARD"
                                        })
                                    }
                                />

                                <label>
                                    Credit / Debit Card
                                </label>

                            </div>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="col-lg-4">

                        <div className="summary-card">

                            <h3>
                                Order Summary
                            </h3>

                            {loading ? (

                                <p>
                                    Loading...
                                </p>

                            ) : cartItems.length === 0 ? (

                                <p>
                                    No Items in Cart
                                </p>

                            ) : (

                                cartItems.map(item => (

                                    <div
                                        className="summary-item"
                                        key={item.id}
                                    >

                                        <span>
                                            {item.name} x{" "}
                                            {item.quantity}
                                        </span>

                                        <span>
                                            ₹{item.subtotal}
                                        </span>

                                    </div>

                                ))

                            )}

                            <hr />

                            <div className="summary-item">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    ₹{subtotal}
                                </span>

                            </div>

                            <div className="summary-item">

                                <span>
                                    Delivery Charge
                                </span>

                                <span>
                                    {deliveryCharge === 0
                                        ? "Free"
                                        : `₹${deliveryCharge}`}
                                </span>

                            </div>

                            <hr />

                            <div className="grand-total">

                                <span>
                                    Total
                                </span>

                                <span>
                                    ₹{totalAmount}
                                </span>

                            </div>

                           

                            <button
                                className="place-order-btn mt-3"
                                onClick={handlePlaceOrder}
                            >
                                Place Order
                            </button>


                             <div className="coupon-box">

                                <button
                                    className="coupon-btn"
                                    onClick={() =>
                                        navigate("/products")
                                    }
                                >
                                    Continue Shopping
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Checkout;