import React from "react";
import { useNavigate } from "react-router";
import "../controllers/css/roleSelection.css";
// import cakeBanner from "../assets/cake-banner.jpg";

const RoleSelection = () => {

  const navigate = useNavigate();

  return (

    <div className="landing-page">

      <img
        src="src\assets\Bento_Desktop_Banner.webp"
        alt="Cake Banner"
        className="banner-image"
      />

      <div className="banner-overlay"></div>

      <div className="hero-content">

        <span className="welcome-tag">
          🎂 Welcome To Cake World
        </span>

        <h1>
          Every Celebration Starts
          With A Perfect Cake
        </h1>

        <p>
          Experience delicious handcrafted cakes,
          beautiful designs and unforgettable flavors
          made for birthdays, weddings, anniversaries
          and every special moment.
        </p>

        <div className="hero-buttons">

          <button
            className="customer-btn"
            onClick={() => navigate("/login")}
          >
            Enter Cake World
          </button>

          <button
            className="admin-btn"
            onClick={() => navigate("/adminLogin")}
          >
            Admin Portal
          </button>

        </div>

        

      </div>

    </div>

  );
};

export default RoleSelection;