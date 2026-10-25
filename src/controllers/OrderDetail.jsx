import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import "../controllers/css/orderdetail.css";

const OrderDetail = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    useEffect(() => {

        fetchOrder();

    }, []);

    const fetchOrder = async () => {

        try {

            const res = await axios.get(
                `http://localhost:3000/orders/${id}`
            );

            setOrder(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!order) {

        return (
            <div className="container py-5">
                Loading...
            </div>
        );

    }

    return (

        <div className="orderdetail-page">

            <div className="orderdetail-container">

                <button
                    className="orderdetail-back-btn"
                    onClick={() => navigate("/order")}
                >
                    Back
                </button>

                <div className="orderdetail-header-card">

                    <h2 className="orderdetail-main-title">
                        Order #{order.id}
                    </h2>

                </div>

                <div className="orderdetail-cakes-section">

                    <h4 className="orderdetail-section-title">
                        Cakes Ordered
                    </h4>

                    {order.cakes.map((cake, index) => (

                        <div
                            key={index}
                            className="orderdetail-cake-card"
                        >

                            <div className="orderdetail-cake-row">

                                <div className="orderdetail-image-wrapper">

                                    <img
                                        src={`/productsImages/${cake.image}`}
                                        alt={cake.name}
                                        className="orderdetail-cake-image"
                                        onError={(e) => {
                                            e.target.src =
                                                `${order.cakes?.[0]?.image}`;
                                        }}
                                    />

                                </div>

                                <div className="orderdetail-cake-info">

                                    <h5 className="orderdetail-cake-name">
                                        {cake.name}
                                    </h5>

                                    <p className="orderdetail-cake-text">
                                        Quantity :
                                        {cake.quantity}
                                    </p>

                                    <p className="orderdetail-cake-text">
                                        Price :
                                        ₹{cake.price}
                                    </p>

                                    <p className="orderdetail-cake-text">
                                        Subtotal :
                                        ₹{cake.subtotal}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                <div className="orderdetail-customer-card">

                    <h4 className="orderdetail-section-title">
                        Customer Details
                    </h4>

                    <p className="orderdetail-customer-text">
                        <strong>Name:</strong>
                        {order.fullName}
                    </p>

                    <p className="orderdetail-customer-text">
                        <strong>Email:</strong>
                        {order.email}
                    </p>

                    <p className="orderdetail-customer-text">
                        <strong>Phone:</strong>
                        {order.phone}
                    </p>

                    <p className="orderdetail-customer-text">
                        <strong>Pincode:</strong>
                        {order.pincode}
                    </p>

                    <p className="orderdetail-customer-text">
                        <strong>Address:</strong>
                        {order.address}
                    </p>

                    <p className="orderdetail-customer-text">
                        <strong>Payment:</strong>
                        {order.paymentMethod}
                    </p>

                    <p className="orderdetail-customer-text">
                        <strong>Status:</strong>
                        <span
                            className={`orderdetail-status-badge orderdetail-${order.status.toLowerCase()}`}
                        >
                            {order.status}
                        </span>
                    </p>

                </div>

                <div className="orderdetail-total-card">

                    <h3 className="orderdetail-total-amount">
                        Total Amount : ₹{order.totalAmount}
                    </h3>

                </div>

            </div>

        </div>

    );

};

export default OrderDetail;