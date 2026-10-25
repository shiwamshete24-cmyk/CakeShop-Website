import React, { useEffect, useState } from "react";
import "./css/signup.css";
import axios from "axios";
import { useNavigate } from "react-router";
import bcrypt from "bcryptjs";

const Signup = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",

    })

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            // check all field filled 

            if (!user.name || !user.email || !user.phone || !user.password || !user.confirm_password) {

                alert("please fill all data");
                return;
            }


            // password match 

            if (user.password !== user.confirm_password) {

                alert("password not match");
                return;
            }


            // check email already exist or not 

            const response = await axios.get(`http://localhost:3000/users?email=${user.email}`);

            console.log(response);
            if (response.data.length > 0) {
                alert("user already exist");
                navigate("/login");
            }


            // encrypt the password 

           const encryptPassword = await bcrypt.hash(user.password , 10);


            // insert the data 
          // destructing object
          const  {confirm_password , ...userData} =  user;

          console.log("userdata : " , userData);

            const responseData = await axios.post("http://localhost:3000/users", {
                ...userData ,
                password : encryptPassword ,
            });

            if (responseData.data) {
               

                setUser({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirm_password: "",

                });


                alert("signup successfully");
                navigate("/login");
            }

        } catch (error) {
            console.log(error);
            alert("something wrong , server issue!");
        }

    }



    return (
        <div className="signup-page">

            <div className="signup-container">

                {/* Left Side */}

                <div className="signup-left">

                    <h1>Welcome! Cake 🎂</h1>

                    <p>
                        Create your account and start ordering
                        delicious cakes for every celebration.
                    </p>

                    <img
                        src="https://images.unsplash.com/photo-1578985545062-69928b1d9587"
                        alt="cake"
                        className="signup-image"
                    />

                </div>

                {/* Right Side */}

                <div className="signup-right">

                    <h2>Create Account</h2>

                    <form  onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Full Name</label>

                            <input
                                type="text"
                                placeholder="Enter your full name" value={user.name} name="name" onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>

                            <input
                                type="email"
                                placeholder="Enter your email" value={user.email} name="email" onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>

                            <input
                                type="text"
                                placeholder="Enter phone number" value={user.phone} name="phone" onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Enter password" value={user.password} name="password" onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>

                            <input
                                type="password"
                                placeholder="Confirm password" value={user.confirm_password} name="confirm_password" onChange={handleChange}
                            />
                        </div>

                        <button className="signup-btn">
                            Create Account
                        </button>

                    </form>

                    <div className="login-link">
                        Already have an account?
                        <a href="/login"> Login</a>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Signup;