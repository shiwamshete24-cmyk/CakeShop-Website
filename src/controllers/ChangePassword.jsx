import React, { useState , useEffect}  from "react";
import "../controllers/css/changePassword.css";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router";

const ChangePassword = () => {

    const navigate = useNavigate();

      useEffect(()=>{
    
        if(!(JSON.parse(localStorage.getItem("userData")))){
              
          navigate("/");
            
        }
    
      } , []);
  
    // 1) data fetch from user 

    const [user, setUser] = useState({
        old_password: "",
        password: "",
        confirm_password: ""
    })


    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // check all field filled 
            if (!user.password || !user.old_password || !user.confirm_password) {
                alert("please fill all the field");
                return;
            }

            // check password and confirm password 
            if (user.password !== user.confirm_password) {

                alert("password and confirm password  not matched");
                return;
            }

            // session data fetch (email)
            const userData = JSON.parse(localStorage.getItem("userData"));
            const userEmail = userData.email;
            // console.log("login user email ", userEmail);


            // check old password correct or not


            // fetch data from database server 
            const userResponse = await axios.get(`http://localhost:3000/users?email=${userEmail}`);

            // console.log("userresponse", userResponse);

            const userPassword = userResponse.data[0].password;
            // console.log("userpassword", userPassword);


            // decrept password 

            let encreptedPassword;

            try {

                encreptedPassword = await bcrypt.hash(user.password, 10);

                // console.log("encrypted password : ", encreptedPassword);

            } catch (error) {
                alert("password not encrypted , plz try again....");
                return;
            }

            const verifiedPassword = await bcrypt.compare(user.old_password, userPassword);

            // console.log("verify password : ", verifiedPassword);

            if (!verifiedPassword) {
                alert("user old password wrong , plz write correct password");
                return;
            }

            //3) update data in database 

            const userID = userResponse.data[0].id;
            const existingUser = userResponse.data[0];

            const response = await axios.put(`http://localhost:3000/users/${userID}`,
                {
                    ...existingUser,
                    password: encreptedPassword
                }
            );

            // console.log(response);
            //4) return response 

            if (response.status === 200) {
                alert("password changed successfully");
                navigate("/profile");

            } else {

                alert("password not changed please try again.........");
                return;
            }


        } catch (error) {
            alert("due to server error ,something went wrong , plz try again");
            console.log(error);
            console.error(error);
        }


    }




    return (

        <div className="change-password-page">

            <div className="change-password-card">

                <div className="password-icon">
                    <i className="fa-solid fa-key"></i>
                </div>

                <h2>Change Password</h2>

                <p>
                    Create a new password for your account.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Old Password</label>

                        <input
                            type="password"
                            name="old_password"
                            placeholder="Enter old Password"
                            className="password-input"
                            value={user.old_password}
                            onChange={handleChange}

                        />

                    </div>

                    <div className="form-group">

                        <label>New Password</label>

                        <input
                            type="password"
                            name="password"

                            placeholder="Enter New Password"
                            className="password-input"
                            value={user.password}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirm_password"

                            placeholder="Confirm Password"
                            className="password-input"
                            value={user.confirm_password}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        type="submit"
                        className="update-password-btn"
                    >
                        Update Password
                    </button>

                </form>

            </div>

        </div>

    );

};

export default ChangePassword;