import React, { useEffect, useState } from "react";
import "./css/order.css";
import { useNavigate } from "react-router";
import axios from "axios";

const Order = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(
        localStorage.getItem("userData")
    );

    useEffect(() => {

        if (!user) {

            navigate("/");
            return;

        }

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const res = await axios.get(
                "http://localhost:3000/orders"
            );

            const userOrders = res.data.filter(
                order => order.email === user.email
            );

            setOrders(userOrders);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const cancelOrder = async (orderId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmCancel) return;

        try {

            await axios.patch(
                `http://localhost:3000/orders/${orderId}`,
                {
                    status: "Cancelled"
                }
            );

            setOrders(
                orders.map((order) =>
                    order.id === orderId
                        ? {
                              ...order,
                              status: "Cancelled"
                          }
                        : order
                )
            );

            alert("Order Cancelled Successfully");

        } catch (error) {

            console.log(error);

            alert("Failed to cancel order");

        }

    };

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        order =>
            order.status === "Pending" ||
            order.status === "Processing"
    ).length;

    const deliveredOrders = orders.filter(
        order => order.status === "Delivered"
    ).length;

    const totalSpent = orders.reduce(
        (sum, order) =>
            sum + Number(order.totalAmount),
        0
    );

    const getStatusClass = (status) => {

        switch (status?.toLowerCase()) {

            case "delivered":
                return "delivered";

            case "shipped":
                return "shipped";

            case "processing":
                return "processing";

            case "pending":
                return "pending";

            case "cancelled":
                return "cancelled";

            default:
                return "pending";

        }

    };

    return (

        <div className="order-page">

            <div className="container py-5">

                <div className="order-header">

                    <h1>My Orders</h1>

                    <p>
                        Track and manage your cake orders
                    </p>

                </div>

                {/* Statistics */}

                <div className="row g-4 mb-5">

                    <div className="col-md-3">

                        <div className="order-stat-card">

                            <h2>{totalOrders}</h2>

                            <p>Total Orders</p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="order-stat-card">

                            <h2>{pendingOrders}</h2>

                            <p>Pending</p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="order-stat-card">

                            <h2>{deliveredOrders}</h2>

                            <p>Delivered</p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="order-stat-card">

                            <h2>₹{totalSpent}</h2>

                            <p>Total Spent</p>

                        </div>

                    </div>

                </div>

                {/* Orders */}

                <div className="order-list-card">

                    <h3 className="mb-4">
                        Recent Orders
                    </h3>

                    {loading ? (

                        <h5>
                            Loading Orders...
                        </h5>

                    ) : orders.length === 0 ? (

                        <div className="text-center py-5">

                            <h4>
                                No Orders Found
                            </h4>

                            <button
                                className="track-btn mt-3"
                                onClick={() =>
                                    navigate("/products")
                                }
                            >
                                Start Shopping
                            </button>

                        </div>

                    ) : (

                        orders.map((order) => (

                            <div
                                className="single-order"
                                key={order.id}
                            >

                                <div className="order-left">

                                    <img
                                        src={`/productsImages/${order.cakes?.[0]?.image}`}
                                        alt={
                                            order.cakes?.[0]?.name
                                        }
                                        className="cake-order-img"
                                        onError={(e) => {
                                            e.target.src =
                                                `${order.cakes?.[0]?.image}`;
                                        }}
                                    />

                                    <div>

                                        <h5>
                                            {
                                                order.cakes
                                                    ?.length
                                            } Item(s)
                                        </h5>

                                        <p>
                                            Order ID :
                                            #{order.id}
                                        </p>

                                        <p>
                                            {order.fullName}
                                        </p>

                                        <span className="order-date">

                                            {new Date(
                                                order.orderDate
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric"
                                                }
                                            )}

                                        </span>

                                    </div>

                                </div>

                                <div className="order-right">

                                    <h4>
                                        ₹{order.totalAmount}
                                    </h4>

                                    <span
                                        className={`status ${getStatusClass(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </span>

                                    <div className="order-btn-group">

                                        <button
                                            className="track-btn"
                                            onClick={() =>
                                                navigate(
                                                    `/order/${order.id}`
                                                )
                                            }
                                        >
                                            View Details
                                        </button>

                                        {(order.status ===
                                            "Processing" ||
                                            order.status ===
                                                "Pending") && (

                                            <button
                                                className="cancel-order-btn"
                                                onClick={() =>
                                                    cancelOrder(
                                                        order.id
                                                    )
                                                }
                                            >
                                                Cancel Order
                                            </button>

                                        )}

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>

    );

};

export default Order;