import React from "react";
import "../controllers/css/header.css"
import logo from "../assets/logo.png";
import { NavLink, Outlet } from "react-router";

const Navbar = () => {
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header-content">

                        {/* Logo */}
                        <div className="logo-section">
                            <img src={logo} alt="Logo" className="logo" />
                        </div>

                        {/* Desktop Menu */}
                        <nav className="desktop-menu">
                            <ul>
                                <li>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            isActive ? "active-link" : ""
                                        }
                                    >
                                        Login
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/signup"
                                        className={({ isActive }) =>
                                            isActive ? "active-link" : ""
                                        }
                                    >
                                        SignUp
                                    </NavLink>
                                </li>

                                <li>
                                   <button className="btn btn-danger">
                                     <NavLink
                                        to="/"
                                       className="text-white"
                                    >
                                        Home
                                    </NavLink>
                                   </button>
                                </li>
                                 


                            </ul>
                        </nav>



                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-btn"
                            data-bs-toggle="collapse"
                            data-bs-target="#mobileMenu"
                        >
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div className="collapse mobile-menu d-lg-none" id="mobileMenu">
                        <ul>
                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/signup">SignUp</NavLink></li>
                            <li><NavLink to="/adminLogin">AdminLogin</NavLink></li>
                        </ul>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default Navbar;