import React, { useEffect, useState } from "react";
import "./css/profile.css";
// import userImg from "../assets/user.jpg";
import { useNavigate } from "react-router";
import axios from "axios";

const Profile = () => {


  const navigate = useNavigate();

  // const [profile, setProfile] = useState({

  //   "email": "",
  //   "gender": "",
  //   "dob": "",
  //   "homeAddress": "",
  //   "officeAddress": "",
  //   "city": "",
  //   "state": "",
  //   "country": "",
  //   "secure_image": "",
  //   "id": ""

  // });

  const [profile, setProfile] = useState([]);

  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [processing, setProcessing] = useState([]);


  useEffect(() => {

    if (!(JSON.parse(localStorage.getItem("userData")))) {

      navigate("/");

    }
  }, []);


  const userprofile =
    JSON.parse(localStorage.getItem("userData"));


  const handleLogout = () => {

    localStorage.removeItem("userData");

    navigate("/login");

  };


  let userAdditionalInfo;
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        userAdditionalInfo = await axios.get(`http://localhost:3000/profile?email=${userprofile.email}`);
        // console.log(userAdditionalInfo.data);
        setProfile(userAdditionalInfo.data[0] || {});


        const userCartData = await axios.get(`http://localhost:3000/cart?email=${userprofile.email}`);
        // console.log("usercarddata : ",userCartData.data.length);
        setCart(userCartData.data || {});

        const userOrderData = await axios.get(`http://localhost:3000/orders?email=${userprofile.email}`);
        console.log("userOrderData : ", userOrderData.data);
        setOrder(userOrderData.data || {});

        const userOrderDeliveredData = await axios.get(`http://localhost:3000/orders?email=${userprofile.email}&status=Delivered`);
        // console.log("userOrderDeliveredData : ",userOrderDeliveredData.data.length);
        setDelivery(userOrderDeliveredData.data || {});

        const userOrderProcessingData = await axios.get(`http://localhost:3000/orders?email=${userprofile.email}&status=Processing`);
        // console.log("userOrderProcessingData : ",userOrderProcessingData.data.length);
        setProcessing(userOrderProcessingData.data || {});

      } catch (error) {

        console.log(error);

      }

    }



    fetchProfile();

  }, [])

  // console.log(order[0].id);


  // console.log(profile);
  return (
    <div className="profile-wrapper-page">

      <div className="container py-5">

        {/* Profile Banner */}
        <div className="profile-banner">

          <div className="profile-left">

            {
              profile.secure_image ? (< img
                src={profile?.secure_image}
                alt="User"
                className="customer-image"
              />) : (<div className="profile-avatar1">
                {
                  userprofile.name
                    .split(" ")
                    .map(word => word[0].toUpperCase())
                    .join("")
                }
              </div>)
            }

            <div>
              <h2 className="customer-name">
                {userprofile.name}
              </h2>

              <p className="customer-email">
                {userprofile.email}
              </p>

              <span className="member-badge">
                customer
              </span>
            </div>

          </div>

          <button className="edit-profile-btn">
            <a href="/profileform" style={{ "textDecoration": "none", "color": "blue" }}>Edit form</a>
          </button>

        </div>

        {/* Statistics */}

        <div className="row g-4 mt-3">

          <div className="col-md-3">
            <div className="stats-card">
              <h3>{order.length}</h3>
              <p>Total Orders</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stats-card">
              <h3>{delivery.length}</h3>
              <p>Delivered</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stats-card">
              <h3>{cart.reduce((total, item) => total + (item.quantity || 1), 0)}</h3>
              <p>Total Cart</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stats-card">
              <h3>{processing.length}</h3>
              <p>Processing Orders</p>
            </div>
          </div>

        </div>

        {/* Personal Information */}

        <div className="info-section mt-5">

          <h3 className="section-title">
            Personal Information
          </h3>

          <div className="row">

            <div className="col-md-6">

              <div className="info-item">
                <label>Full Name</label>
                <p>{userprofile.name}</p>
              </div>

              <div className="info-item">
                <label>Email</label>
                <p>{userprofile.email}</p>
              </div>

              <div className="info-item">
                <label>Phone Number</label>
                <p>{userprofile.phone}</p>
              </div>
              <div className="info-item">
                <label>country</label>
                <p>{profile.country || "Undefined"}</p>
              </div>

            </div>

            <div className="col-md-6">

              <div className="info-item">
                <label>Gender</label>
                <p>{profile?.gender || "Null"}</p>
              </div>

              <div className="info-item">
                <label>Date of Birth</label>
                <p>{profile?.dob || "Undefined"}</p>
              </div>

              <div className="info-item">
                <label>city</label>
                <p>{profile.city || "Null"}</p>
              </div>
              <div className="info-item">
                <label>state</label>
                <p>{profile.state || "Null"}</p>
              </div>


            </div>

          </div>

        </div>

        {/* Recent Orders */}

        <div className="info-section mt-5">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h3 className="section-title mb-0">
              Recent Orders
            </h3>

            <button className="view-all-btn" onClick={() => navigate("/order")}>
              View All
            </button>

          </div>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>
                <tr>
                  <th>order id</th>
                  <th>Cake</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {
                  order.length > 0 ? (

                    order
                      .slice(-2)
                      .reverse()
                      .map((item, index) => (

                        <tr key={index}>

                          <td>
                            {item.id}
                          </td>

                          <td>
                            {
                              item.fullName ||
                              "Cake Order"
                            }
                          </td>

                          <td>
                            {item.orderDate}
                          </td>

                          <td>
                            ₹{item.totalAmount}
                          </td>

                          <td>

                            <span
                              className={`status ${item.status?.toLowerCase()}`}
                            >
                              {item.status}
                            </span>

                          </td>

                        </tr>

                      ))

                  ) : (

                    <tr>

                      <td
                        colSpan="5"
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

        {/* Saved Address */}

        <div className="info-section mt-5">

          <h3 className="section-title">
            Saved Addresses
          </h3>

          <div className="row g-4">

            <div className="col-md-6">

              <div className="address-card">

                <h5>Home Address</h5>

                <p>
                  {profile?.homeAddress}
                </p>

              </div>

            </div>

            <div className="col-md-6">

              <div className="address-card">

                <h5>Office Address</h5>

                <p>
                  {profile?.officeAddress}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Actions */}

        <div className="account-actions">

          <button className="change-password-btn">
            <a href="/change-password" style={{ "color": "white", "textDecoration": "none" }}>Change Password</a>
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;