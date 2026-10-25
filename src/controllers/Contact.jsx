import React, { useEffect, useState } from "react";
import "../controllers/css/contact.css";
import "../controllers/css/product.css";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import axios from "axios";

const Contact = () => {

  const navigate = useNavigate();

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {

    if (
      !JSON.parse(
        localStorage.getItem("userData")
      )
    ) {

      navigate("/");

    }

  }, [navigate]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setContactData({
      ...contactData,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:3000/contact",
        {
          ...contactData,
          createdAt:
            new Date().toISOString()
        }
      );

      alert(
        "Message Sent Successfully"
      );

      setContactData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Send Message"
      );

    }

  };

  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  return (
    <div>

      {/* Hero Section */}

      <div className='row g-0 justify-content-start align-items-buttom product-bg-img mb-5'>

        <div className='col-md-5 col-lg-3 d-none d-md-block'>

          <img
            src="src/assets/hero-shape.png"
            alt=""
            className='img-fluid'
          />

        </div>

        <div className='col-12 col-md-7 col-lg-9 align-content-center'>

          <h1 className='product-name'>
            Contact
          </h1>

        </div>

      </div>

      {/* Map Section */}

      <section className="container contact-map">

        <iframe
          title="map"
          src="https://www.google.com/maps?q=Pune&output=embed"
          loading="lazy"
        ></iframe>

      </section>

      {/* Contact Form */}

      <section className="contact-section">

        <div className="container">

          <div className="row g-5">

            <div className="col-lg-8">

              <div className="contact-form-box">

                <h2>
                  Send Message
                </h2>

                <form
                  onSubmit={handleSubmit}
                >

                  <div className="row g-3">
                    <div className="col-md-6">

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        value={contactData.name}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    <div className="col-md-6">

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        value={contactData.email}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    <div className="col-12">

                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="Subject"
                        value={contactData.subject}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    <div className="col-12">

                      <textarea
                        rows="6"
                        name="message"
                        className="form-control"
                        placeholder="Your Message"
                        value={contactData.message}
                        onChange={handleChange}
                        required
                      ></textarea>

                    </div>

                    <div className="col-12">

                      <button
                        type="submit"
                        className="send-btn"
                      >
                        Send Message
                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>

            {/* Contact Info */}

            <div className="col-lg-4">

              <div className="contact-info-card">
                <h4>Address</h4>
                <p>Pune, Maharashtra, India</p>
              </div>

              <div className="contact-info-card">
                <h4>Phone</h4>
                <p>+91 9876543210</p>
              </div>

              <div className="contact-info-card">
                <h4>Email</h4>
                <p>cakehouse@gmail.com</p>
              </div>

              <div className="contact-info-card">
                <h4>Working Hours</h4>
                <p>Mon - Sat : 9AM - 9PM</p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <div className="footer-section">

        <div className="container">

          <div className="row gy-5">

            <div className="col-lg-4 col-md-6">

              <div className="footer-logo d-flex align-items-center mb-4">

                <div className="logo-circle">
                  <i className="bi bi-cake2-fill"></i>
                </div>

                <h2 className="ms-3">
                  Cake
                </h2>

              </div>

              <p className="footer-text">
                Experience bakery perfection with cakes made fresh daily. Our expert bakers combine quality ingredients, beautiful designs, and unforgettable flavors to create desserts you'll love.
              </p>

              <div className="social-icons mt-4">
                <i className="bi bi-twitter-x"></i>
                <i className="bi bi-facebook"></i>
                <i className="bi bi-linkedin"></i>
                <i className="bi bi-pinterest"></i>
              </div>

            </div>

            <div className="col-lg-2 col-md-6">

              <h5>
                Quick Links
              </h5>

              <ul className="footer-links">

                <li>
                  <NavLink
                    to="/home"
                    style={{
                      textDecoration: "none"
                    }}
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/about"
                    style={{
                      textDecoration: "none"
                    }}
                  >
                    About
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/products"
                    style={{
                      textDecoration: "none"
                    }}
                  >
                    Products
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/contact"
                    style={{
                      textDecoration: "none"
                    }}
                  >
                    Contact
                  </NavLink>
                </li>

              </ul>

            </div>

            <div className="col-lg-2 col-md-6">

              <h5>
                Cakes
              </h5>

              <ul className="footer-links">

                <li>
                  Birthday Cake
                </li>

                <li>
                  Celebration Cake
                </li>

                <li>
                  Wedding Cake
                </li>

                <li>
                  Fruit Cake
                </li>

              </ul>

            </div>

            <div className="col-lg-4 col-md-6">

              <h5>
                Contact Us
              </h5>

              <p className="address">
                Akurdi, Pune, Maharashtra
              </p>

              <h6 className="phone-number">
                +91 9876543210
              </h6>

            </div>

          </div>

        </div>

        <button
          className="scroll-top"
          onClick={scrollToTop}
        >
          <i className="bi bi-arrow-up"></i>
        </button>

      </div>

    </div>

  );

};

export default Contact;