import React, { useState } from "react";
import "./css/login.css";
import axios from "axios";
import { useNavigate } from "react-router";
import bcrypt from "bcryptjs";

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // email and password check filled or not 
            if (!user.email || !user.password) {
                alert("please fill the all fields");
                return;
            }

            // data fetch
            // email checked 
            const matchedData = await axios.get(`http://localhost:3000/users?email=${user.email}`);

            // console.log(matchedData);

            if (matchedData.data.length === 0) {
                alert("user not exist");
                navigate("/signup");
                return;
            }

            const dbUser = matchedData.data[0];

            // password match 
            const varifyPassword = await bcrypt.compare(user.password, dbUser.password);

            //  console.log(varifyPassword);

            if (varifyPassword) {

                // token created 

                localStorage.setItem("userData",
                    JSON.stringify({
                        ...dbUser,
                        password: "",
                        confirm_password: ""
                    })
                );

                setUser({
                    email: "",
                    password: ""
                });

                // response 
                alert("user login successfully");
                navigate("/home");

            } else {

                alert("password not matched , plz enter correct password");
                return;
            }

        } catch (error) {

            console.log("server error :", error);
            alert("server error");

        }

    }

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="login-page">

            <div className="login-container">

                {/* Left Side */}

                <div className="login-left">

                    <h1>Welcome  🎂</h1>

                    <p>
                        Login to your account and order
                        delicious cakes for every occasion.
                    </p>

                    <img
                        src="https://images.unsplash.com/photo-1578985545062-69928b1d9587"
                        alt="Cake"
                        className="login-image"
                    />

                </div>

                {/* Right Side */}

                <div className="login-right">

                    <h2>Login Account</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Email Address</label>

                            <input
                                type="email"
                                placeholder="Enter your email" value={user.email} name="email" onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Enter password" value={user.password} name="password" onChange={handleChange}
                            />

                        </div>

                        <div className="forgot-password">
                            <a href="/forget-password">Forgot Password?</a>
                        </div>

                        <button className="login-btn">
                            Login
                        </button>

                    </form>

                    <div className="signup-link">
                        Don't have an account?
                        <a href="/signup"> Sign Up</a>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;