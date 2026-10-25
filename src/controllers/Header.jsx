import React , {useEffect} from "react";
import "../controllers/css/header.css";
import logo from "../assets/logo.png";
import { NavLink, Outlet, useNavigate } from "react-router";

const Header = () => {

  const navigate = useNavigate();

  useEffect(() => {

    if (!(JSON.parse(localStorage.getItem("userData")))) {

      navigate("/");

    }

  }, []);


  const userprofile =
    JSON.parse(localStorage.getItem("userData")) || {};

  const handleLogout = () => {

    localStorage.removeItem("userData");

    navigate("/login");

  };

  return (
    <>
      <header className="header">

        <div className="container">

          <div className="header-content">

            {/* Logo */}

            <div className="logo-section">

              <img
                src={logo}
                alt="SweetBloom"
                className="logo"
              />

            </div>

            {/* Desktop Menu */}

            <nav className="desktop-menu">

              <ul>

                <li>
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    Products
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    About
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    Contact
                  </NavLink>
                </li>

              </ul>

            </nav>

            {/* Right Side */}

            <div className="header-right d-none d-lg-flex">

              {/* Cart Button */}

              <NavLink
                to="/cart"
                className="cart-btn"
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </NavLink>

              

              {/* Profile Dropdown */}

              <div className="dropdown ms-4">

                <button
                  className="profile-btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >

                  <div className="profile-avatar">

                    {
                      userprofile?.name
                        ?.charAt(0)
                        ?.toUpperCase()
                    }

                  </div>

                  <span className="profile-name">

                    {userprofile?.name}

                  </span>

                </button>

                <ul className="dropdown-menu custom-dropdown">

                  {/* Top Section */}

                  <li className="profile-header">

                    <div className="profile-avatar-large">

                      {
                        userprofile?.name
                          ?.charAt(0)
                          ?.toUpperCase()
                      }

                    </div>

                    <h6>
                      {userprofile?.name}
                    </h6>

                    <p>
                      {userprofile?.email}
                    </p>

                  </li>

                  {/* Menu */}

                  <li>

                    <NavLink
                      className="dropdown-item"
                      to="/profile"
                    >

                      <i className="fa-solid fa-user"></i>

                      My Profile

                    </NavLink>

                  </li>

                  <li>

                    <NavLink
                      className="dropdown-item"
                      to="/order"
                    >

                      <i className="fa-solid fa-box"></i>

                      My Orders

                    </NavLink>

                  </li>

                  <li>

                    <NavLink
                      className="dropdown-item"
                      to="/change-password"
                    >

                      <i className="fa-solid fa-key"></i>

                      Change Password

                    </NavLink>

                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li className="text-center">

                    <button
                      className="logout-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>

                  </li>

                </ul>

              </div>

            </div>

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

          <div
            className="collapse mobile-menu"
            id="mobileMenu"
          >

            <ul>

              <li>
                <NavLink to="/home">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/products">
                  Products
                </NavLink>
              </li>

              <li>
                <NavLink to="/about">
                  About
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact">
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink to="/cart">
                  Cart
                </NavLink>
              </li>

              <li>
                <NavLink to="/profile">
                  Profile
                </NavLink>
              </li>

              <li>

                <button
                  className="mobile-logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </li>

            </ul>

          </div>

        </div>

      </header>

      <Outlet />

    </>
  );
};

export default Header;