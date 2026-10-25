import React, { useState } from "react";
import "../controllers/css/forgotPassword.css";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router";


const ForgotPassword = () => {

    const navigate = useNavigate();

    // 1)  take email , password , and confirm password  

    const [user, setUser] = useState({

        email: "",
        password: "",
        confirm_password: ""
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // 2) validate data

            if (!user.email || !user.password || !user.confirm_password) {

                alert("please fill all the fields");
                return;
            }


            // 3) email and confirm password cheack 

            if (user.password !== user.confirm_password) {

                alert("password and cofirm password not matched");
                return;
            }

            //4) email check 

            let varifyEmail ;

            try {
                varifyEmail = await axios.get(`http://localhost:3000/users?email=${user.email}`);

                console.log(varifyEmail);

                if (varifyEmail.data.length === 0) {

                    alert("user not exists , plz enter correct email");
                    return;
                }
            } catch (error) {
                console.log("error", error);
                alert("server error");
            }


            // 5) password and confirm password encrepy 

            const encryptPassword = await bcrypt.hash(user.password, 10);

            // 6 ) store data 

          let  userId  = varifyEmail.data[0];

            
            try {

             const  storeData = await axios.put(`http://localhost:3000/users/${userId.id}`, {
                    ...userId,
                    password: encryptPassword
                });

                console.log(storeData);

                // 7) response

                if (storeData.status === 200) {

                    alert("password reset successfully");
                    navigate("/login");

                } else {

                    alert("password reset unsuccessfully ! please try again!");
                    return;
                }

            } catch (error) {

                console.error(error);
                console.log("error something... ", error);

            }

        } catch (error) {
            console.log("server error");
            alert("server error , plz try again");
        }



    }


    return (
        <div className="forgot-page">

            <div className="forgot-card">

                <div className="icon-box">
                    <i className="fa-solid fa-lock"></i>
                </div>

                <h2>Forgot Password?</h2>

                <p>
                    Don't worry! Enter your registered email
                    address and new password .
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="forgot-input" name="email" value={user.email} onChange={handleChange}
                        />

                    </div>
                    <div className="form-group">

                        <label>new Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="forgot-input" name="password" value={user.password} onChange={handleChange}
                        />

                    </div>
                    <div className="form-group">

                        <label>confirm Password</label>

                        <input
                            type="Password"
                            placeholder="confirm password"
                            className="forgot-input" name="confirm_password" value={user.confirm_password} onChange={handleChange}
                        />

                    </div>

                    <button className="send-btn">
                        Reset Password
                    </button>

                </form>

                <div className="back-login">

                    <a href="/login">
                        ← Back To Login
                    </a>

                </div>

            </div>

        </div>
    );
};

export default ForgotPassword;