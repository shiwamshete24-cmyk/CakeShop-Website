import React from "react";
import "../controllers/css/header.css"
import logo from "../assets/logo.png";
import { NavLink, Outlet } from "react-router";

const AdminHomePageNavbar = () => {
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
                                    <button className="btn btn-danger">
                                        <NavLink
                                            to="/"
                                            className="text-white px-3 py-2"
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
                            <li><NavLink to="/">Home</NavLink></li>
                        </ul>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}

export default AdminHomePageNavbar