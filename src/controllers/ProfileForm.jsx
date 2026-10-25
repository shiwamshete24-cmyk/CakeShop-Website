import React, { useState, useEffect } from "react";
import "../controllers/css/profileform.css";
import axios from "axios";
import { useNavigate } from "react-router";
const ProfileForm = () => {

    const navigate = useNavigate();


    useEffect(() => {

        if (!(JSON.parse(localStorage.getItem("userData")))) {

            navigate("/");

        }

    }, [navigate]);

    const userData = JSON.parse(localStorage.getItem("userData"));
    const userEmail = userData.email;
    // console.log("userEmail :" , userEmail);


    const [user, setUser] = useState({
        gender: "",
        dob: "",
        homeAddress: "",
        officeAddress: "",
        city: "",
        state: "",
        country: ""
    });

    const [image, setImage] = useState("");

    const handleImage = (e) => {

        setImage(e.target.files[0]);

    }
    // console.log(image);


    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })


    };

    // console.log(user);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            //all data required
            if (!user.city || !user.country || !user.dob || !user.gender || !user.homeAddress || !user.officeAddress || !user.state || !image) {
                alert("fill all the fields");
                return;
            }

            //all image in cloudnari



            const formData = new FormData();

            formData.append("file", image);

            formData.append("upload_preset", "cake_profile");

            const cloudinaryResponse = await axios.post("https://api.cloudinary.com/v1_1/drplkjebm/image/upload",
                formData
            )

            if(!cloudinaryResponse.data){
               alert("image not uploaded in cloudinary , so plz try again");
               return;
            }

            const imageUrl = cloudinaryResponse.data.secure_url;
            console.log(imageUrl);


            localStorage.setItem("profileImage", JSON.stringify(imageUrl));




            const profileResponse = await axios.get(`http://localhost:3000/profile?email=${userEmail}`);
            
            // console.log("userID   :" , userID);

            if (profileResponse.data.length == 0) {

                // post data 
                const responce = await axios.post("http://localhost:3000/profile", {
                    email: userEmail,
                    gender: user.gender,
                    dob: user.dob,
                    homeAddress: user.homeAddress,
                    officeAddress: user.officeAddress,
                    city: user.city,
                    state: user.state,
                    country: user.country,
                    secure_image: imageUrl
                })

                // console.log(responce);
                // responce 
                if (responce.data) {
                    alert("profile data changed");
                    navigate("/profile");

                } else {
                    alert("profile data not changed , plz try again.....");
                    return;
                }
            } else {

                const userID = profileResponse.data[0];
                const responce = await axios.put(`http://localhost:3000/profile/${userID.id}`, {
                    email: userEmail,
                    gender: user.gender,
                    dob: user.dob,
                    homeAddress: user.homeAddress,
                    officeAddress: user.officeAddress,
                    city: user.city,
                    state: user.state,
                    country: user.country,
                    secure_image: imageUrl
                })


                if (responce.status === 200) {
                    alert("profile data changed");
                    navigate("/profile");

                } else {
                    alert("profile data not changed , plz try again.....");
                    return;
                }

            }


        } catch (error) {

            alert("404 error.....");
            console.log("error ", error);
            console.error(error);

        }

    };

    return (

        <>

            <div className="container mt-5">

                <div className="card1 shadow p-4">

                    <h2 className="mb-4">
                        Customer Profile
                    </h2>

                    <form onSubmit={handleSubmit}>

                        {/* Profile Image */}

                        <div className="mb-3">

                            <label className="form-label">
                                Profile Image URL
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                name="profileImage"
                                onChange={handleImage}
                                placeholder="select user image"
                            />

                        </div>


                        {/* Gender */}

                        <div className="mb-3">

                            <label className="form-label">
                                Gender
                            </label>

                            <select
                                className="form-control"
                                name="gender"
                                value={user.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>

                        </div>

                        {/* DOB */}

                        <div className="mb-3">

                            <label className="form-label">
                                Date Of Birth
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="dob"
                                value={user.dob}
                                onChange={handleChange}
                            />

                        </div>

                        {/* Home Address */}

                        <div className="mb-3">

                            <label className="form-label">
                                Home Address
                            </label>

                            <textarea
                                className="form-control"
                                rows="3"
                                name="homeAddress"
                                value={user.homeAddress}
                                onChange={handleChange}
                            ></textarea>

                        </div>

                        {/* Office Address */}

                        <div className="mb-3">

                            <label className="form-label">
                                Office Address
                            </label>

                            <textarea
                                className="form-control"
                                rows="3"
                                name="officeAddress"
                                value={user.officeAddress}
                                onChange={handleChange}
                            ></textarea>

                        </div>

                        {/* City */}

                        <div className="mb-3">

                            <label className="form-label">
                                City
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={user.city}
                                onChange={handleChange}
                            />

                        </div>

                        {/* State */}

                        <div className="mb-3">

                            <label className="form-label">
                                State
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="state"
                                value={user.state}
                                onChange={handleChange}
                            />

                        </div>

                        {/* Country */}

                        <div className="mb-3">

                            <label className="form-label">
                                Country
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="country"
                                value={user.country}
                                onChange={handleChange}
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-danger w-100"
                        >
                            Save Profile
                        </button>

                    </form>

                </div>

            </div>

        </>
    );
};

export default ProfileForm;