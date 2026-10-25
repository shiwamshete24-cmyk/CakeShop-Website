import React from "react";
import { NavLink } from "react-router";
import "../controllers/css/PageNotFound.css";

const Page_Not_Found = () => {
  return (
    <section className="not-found">
      <div className="not-found-content">

        <span className="error-code">404</span>

        <h1>Oops! Page Not Found</h1>

        <p>
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to the homepage.
        </p>

        <NavLink to="/" className="home-btn">
          Back To Home
        </NavLink>

      </div>
    </section>
  );
};

export default Page_Not_Found;