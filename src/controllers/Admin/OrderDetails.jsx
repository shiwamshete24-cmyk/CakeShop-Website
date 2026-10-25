import React, { useEffect, useState } from "react";
import "/src/controllers/AdminCSS/orderdetails.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const OrderDetails = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {

    fetchOrder();

  }, []);

  const fetchOrder = async () => {

    try {

      const response = await axios.get(
        `http://localhost:3000/orders/${id}`
      );

      setOrder(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!order) {

    return (
      <div className="text-center mt-5">
        Loading...
      </div>
    );

  }

  return (
    <div className="order-details-page">

      <div className="container-fluid">

        <div className="details-header d-flex g-0 justify-content-between">

          <div>

            <h2>Order Details</h2>

            <p>
              View complete customer order information
            </p>

          </div>

          <div>

            <button
              className="btn btn-warning"
              onClick={() =>
                navigate("/orders")
              }
            >
              Back
            </button>

          </div>

        </div>

        <div className="row g-4">
                    <div className="col-lg-4">

            <div className="details-card">

              <h4>Order Information</h4>

              <div className="info-row">
                <span>Order ID</span>
                <strong>{order.id}</strong>
              </div>

              <div className="info-row">
                <span>Order Date</span>
                <strong>
                  {new Date(
                    order.orderDate
                  ).toLocaleDateString("en-IN")}
                </strong>
              </div>

              <div className="info-row">

                <span>Status</span>

                <span
                  className={`status-tag ${order.status?.toLowerCase()}`}
                >
                  {order.status}
                </span>

              </div>

              <div className="info-row">
                <span>Total Amount</span>
                <strong>
                  ₹{order.totalAmount}
                </strong>
              </div>

            </div>

          </div>

          <div className="col-lg-4">

            <div className="details-card">

              <h4>Customer Details</h4>

              <div className="info-row">
                <span>Name</span>
                <strong>
                  {order.fullName}
                </strong>
              </div>

              <div className="info-row">
                <span>Email</span>
                <strong>
                  {order.email}
                </strong>
              </div>

              <div className="info-row">
                <span>Phone</span>
                <strong>
                  {order.phone}
                </strong>
              </div>

            </div>

          </div>

          <div className="col-lg-4">

            <div className="details-card">

              <h4>Payment Details</h4>

              <div className="info-row">
                <span>Method</span>
                <strong>
                  {order.paymentMethod}
                </strong>
              </div>

              <div className="info-row">
                <span>Payment Status</span>

                <span className="status-tag paid">
                  Paid
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="details-card mt-4">

          <h4>Delivery Address</h4>

          <p className="address-text">
            {order.address}
          </p>

          <p>
            Pincode : {order.pincode}
          </p>

        </div>

        <div className="details-card mt-4">

          <h4>Ordered Items</h4>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>

              </thead>

              <tbody>

                {
                  order.cakes?.map(
                    (cake) => (

                      <tr key={cake.id}>

                        <td>
                          {cake.name}
                        </td>

                        <td>

                          <img
                            src={
                              cake.image?.startsWith(
                                "http"
                              )
                                ? cake.image
                                : `/productsImages/${cake.image}`
                            }
                            alt={cake.name}
                            width="60"
                            height="60"
                            style={{
                              objectFit: "cover",
                              borderRadius: "8px"
                            }}
                          />

                        </td>

                        <td>
                          {cake.quantity}
                        </td>

                        <td>
                          ₹{cake.price}
                        </td>

                        <td>
                          ₹{cake.subtotal}
                        </td>

                      </tr>

                    )
                  )
                }

              </tbody>

            </table>

          </div>

        </div>

        <div className="details-card mt-4">

          <h4>Update Order Status</h4>

          <div className="status-update">

            <select
              className="status-select"
              value={order.status}
              onChange={(e) =>
                setOrder({
                  ...order,
                  status:
                    e.target.value
                })
              }
            >

              <option>
                Processing
              </option>

              <option>
                Delivered
              </option>

              <option>
                Cancelled
              </option>

            </select>

            <button
              className="update-btn"
              onClick={async () => {

                try {

                  await axios.patch(
                    `http://localhost:3000/orders/${order.id}`,
                    {
                      status:
                        order.status
                    }
                  );

                  alert(
                    "Order Status Updated"
                  );

                } catch (error) {

                  console.log(error);

                }

              }}
            >
              Update Status
            </button>

          </div>

        </div>

      </div>

    </div>
  );

};

export default OrderDetails;