import React, { useEffect, useState } from "react";
import "../AdminCSS/customerdetails.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const CustomerDetails = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchCustomerData();

  }, []);

  const fetchCustomerData = async () => {

    try {

      const userResponse =
        await axios.get(
          `http://localhost:3000/users/${id}`
        );

      const user =
        userResponse.data;

      setCustomer(user);

      const profileResponse =
        await axios.get(
          `http://localhost:3000/profile?email=${user.email}`
        );

      if (
        profileResponse.data.length > 0
      ) {

        setProfile(
          profileResponse.data[0]
        );

      }

      const ordersResponse =
        await axios.get(
          `http://localhost:3000/orders?email=${user.email}`
        );

      setOrders(
        ordersResponse.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  if (!customer) {

    return (
      <div className="text-center mt-5">
        Loading...
      </div>
    );

  }

  const totalSpent =
    orders.reduce(
      (total, order) =>
        total +
        Number(
          order.totalAmount || 0
        ),
      0
    );

  return (

    <div className="customer-details-page">

      <div className="container-fluid">

        <div className="details-header d-flex justify-content-between">

          <div>

            <h2>
              Customer Details
            </h2>

            <p>
              View customer information and order history
            </p>

          </div>

          <button
            className="btn btn-warning"
            onClick={() =>
              navigate("/customers")
            }
          >
            Back
          </button>

        </div>

        <div className="row g-4">

          <div className="col-lg-4">

            <div className="details-card text-center">

              <img
                src={
                  profile?.secure_image ||
                  `https://ui-avatars.com/api/?name=${customer.name}`
                }
                alt=""
                className="customer-profile-image"
              />

              <h4 className="mt-3">
                {customer.name}
              </h4>

              <p>
                {customer.email}
              </p>

              <p>
                {customer.phone}
              </p>

            </div>

          </div>

          <div className="col-lg-8">

            <div className="details-card">

              <h4>
                Personal Information
              </h4>

              <div className="info-row">
                <span>Gender</span>
                <strong>
                  {profile?.gender || "-"}
                </strong>
              </div>

              <div className="info-row">
                <span>Date Of Birth</span>
                <strong>
                  {profile?.dob || "-"}
                </strong>
              </div>

              <div className="info-row">
                <span>City</span>
                <strong>
                  {profile?.city || "-"}
                </strong>
              </div>

              <div className="info-row">
                <span>State</span>
                <strong>
                  {profile?.state || "-"}
                </strong>
              </div>

              <div className="info-row">
                <span>Country</span>
                <strong>
                  {profile?.country || "-"}
                </strong>
              </div>

            </div>

          </div>

        </div>
                <div className="details-card mt-4">

          <h4>Address Information</h4>

          <div className="info-row">
            <span>Home Address</span>
            <strong>
              {profile?.homeAddress || "-"}
            </strong>
          </div>

          <div className="info-row">
            <span>Office Address</span>
            <strong>
              {profile?.officeAddress || "-"}
            </strong>
          </div>

        </div>

        <div className="row g-4 mt-2">

          <div className="col-md-4">

            <div className="details-card text-center">

              <h3>
                {orders.length}
              </h3>

              <p>
                Total Orders
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="details-card text-center">

              <h3>
                ₹{totalSpent}
              </h3>

              <p>
                Total Spent
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="details-card text-center">

              <h3>
                {
                  orders.length > 0
                    ? new Date(
                        orders[
                          orders.length - 1
                        ].orderDate
                      ).toLocaleDateString(
                        "en-IN"
                      )
                    : "-"
                }
              </h3>

              <p>
                Last Order
              </p>

            </div>

          </div>

        </div>

        <div className="details-card mt-4">

          <h4>
            Order History
          </h4>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>

                  <th>
                    Order ID
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Payment
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
                  orders.length > 0 ? (

                    orders
                      .slice()
                      .reverse()
                      .map((order) => (

                        <tr
                          key={order.id}
                        >

                          <td>
                            {order.id}
                          </td>

                          <td>

                            {
                              new Date(
                                order.orderDate
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            }

                          </td>

                          <td>
                            ₹
                            {
                              order.totalAmount
                            }
                          </td>

                          <td>
                            {
                              order.paymentMethod
                            }
                          </td>

                          <td>

                            <span
                              className={`customer-status ${
                                order.status ===
                                "Delivered"
                                  ? "active1"
                                  : "inactive"
                              }`}
                            >
                              {
                                order.status
                              }
                            </span>

                          </td>

                          <td>

                            <button
                              className="view-customer-btn"
                              onClick={() =>
                                navigate(
                                  `/orderdetails/${order.id}`
                                )
                              }
                            >
                              View Order
                            </button>

                          </td>

                        </tr>

                      ))

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center"
                      >
                        No Orders Found
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

  );

};

export default CustomerDetails;