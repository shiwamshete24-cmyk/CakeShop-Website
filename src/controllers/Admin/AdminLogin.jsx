import React, { useState } from "react";
import "../AdminCSS/adminLogin.css";
import { useNavigate } from "react-router";

const AdminLogin = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {

        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!email || !password) {
            alert("please fill all the fields");
            return;
        }

        if (email === "cake@gmail.com" && password === "cake@2003") {
            alert("Admin Login Successfully");
            navigate("/admindashboard");

        } else if (email !== "cake@gmail.com") {
            alert("please enter correct email");
            return;
        } else {
            alert("please enter correct password");
            return;
        }

    }

    return (
        <div className="admin-login-page">

            <div className="admin-login-container">

                {/* Left Side */}

                <div className="admin-left">

                    <div className="admin-brand">

                        <i className="fa-solid fa-cake-candles"></i>

                        <h1>Cake Admin</h1>

                    </div>

                    <h2>Admin Dashboard</h2>

                    <p>
                        Manage products, orders, customers,
                        categories and analytics from one place.
                    </p>

                    <div className="admin-features">

                        <div className="feature-box">
                            <i className="fa-solid fa-box"></i>
                            <span>Product Management</span>
                        </div>

                        <div className="feature-box">
                            <i className="fa-solid fa-bag-shopping"></i>
                            <span>Order Tracking</span>
                        </div>

                        <div className="feature-box">
                            <i className="fa-solid fa-users"></i>
                            <span>Customer Management</span>
                        </div>

                    </div>

                </div>

                {/* Right Side */}

                <div className="admin-right">

                    <div className="login-card">

                        <h2>Admin Login</h2>

                        <p>
                            Sign in to access admin dashboard
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">

                                <label>Email Address</label>

                                <input
                                    type="email"
                                    placeholder="admin@gmail.com" name="email" value={email} onChange={handleEmail}
                                />

                            </div>

                            <div className="form-group">

                                <label>Password</label>

                                <input
                                    type="password"
                                    placeholder="Enter password" name="password" value={password} onChange={handlePassword}
                                />

                            </div>

                            <div className="remember-row">

                                <label>
                                    <input type="checkbox"  required/>
                                    Remember Me
                                </label>

                                <a href="/">
                                    Forgot Password?
                                </a>

                            </div>

                            <button className="admin-login-btn">
                                Login Dashboard
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminLogin;