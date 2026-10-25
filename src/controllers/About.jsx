import React, { useEffect } from 'react'
import "../controllers/css/home.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import "../controllers/css/product.css"
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router';

const About = () => {


  const navigate = useNavigate();

  useEffect(() => {

    if (!(JSON.parse(localStorage.getItem("userData")))) {

      navigate("/");

    }

  }, []);

  const scrollToTop = ()=>{

    window.scrollTo({
      top:0 ,
      behavior:"smooth"
    })
  }

  return (
    <section>

      <div className='row g-0 justify-content-start align-items-buttom product-bg-img'>
        <div className='col-md-5 col-lg-3 d-none d-md-block'>
          <img src="src\assets\hero-shape.png" alt="" className='img-fluid' />
        </div>
        <div className='col-12 col-md-7 col-lg-9 align-content-center'>
          <h1 className='product-name'>About</h1>
        </div>
      </div>

      {/* third page  */}


      <div className='container-fluid  card-name2'>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 d-flex justify-content-center ">
          <div className="col mx-lg-5">
            <div className="card h-100 border-0">
              <img src="src\assets\about.png" className="card-img-top" alt="..." />

            </div>
          </div>
          <div className="col mx-lg-5">
            <div className="card h-100 border-0">
              <div className="card-body">
                <p className=' py-2 design11'>Fresh & Delicious</p>
                <h2 className=' pb-2 design2'>A Simple Way to <br /> Eating Delicious</h2>
                <p className="card-text text-black ab pb-3">Freshly baked, beautifully crafted, and made with love. Explore our collection of delicious cakes designed to make every occasion sweeter.</p>
                <button className='btn1' onClick={() => navigate("/products")}>Show Products</button>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* fourth page  */}


      <div className=' container-fluid fourth-bg-color g-0 py-0 my-0 pt-3'>
        <p className='text-center py-2 design11'>Most Popular</p>
        <h2 className='text-center design2'>Our Exclusive Cakes</h2>

        <div className='row g-0 fourth-1 text-center align-items-center py-2'>

          <div className='col col-md-6  col-lg-4 py-5 px-5'>
            <img src="src\assets\icon1.svg" alt="" className='pb-3 img-fluid' />
            <h6 className='fourth-h'>Royal Wedding Cake</h6>
            <p className="text-black ab pt-0 pb-3 fourth-p">Exquisite royal wedding cakes customized to make your special day unforgettable.</p>
          </div>
          <div className='col col-md-6  col-lg-4  py-5 px-5'>
            <img src="src\assets\icon1.svg" alt="" className='pb-3 img-fluid' />
            <h6 className='fourth-h'>Luxury Celebration Cake</h6>
            <p className="text-black ab pt-0 pb-3 fourth-p">Exquisite royal Celebration cakes customized to make your special day unforgettable</p>
          </div>
          <div className='col col-md-6  col-lg-4  py-5 px-5'>
            <img src="src\assets\icon1.svg" alt="" className='pb-3 img-fluid' />
            <h6 className='fourth-h'>Vanilla Birthday Cake</h6>
            <p className="text-black ab pt-0 pb-3 fourth-p">Exquisite  Birthday cakes customized to make your special day unforgettable</p>
          </div>

        </div>
      </div>

      {/* fifth section  */}


      <div className='fifth'>

        <i className="fa-solid fa-circle-play video"></i>

      </div>


      <div className="container py-5 my-5">

        <div className="text-center mb-5">
          <p
            className="mb-3"
            style={{
              color: "#f4511e",
              letterSpacing: "4px",
              fontSize: "14px",
              textTransform: "uppercase"
            }}
          >
            Testimonial
          </p>

          <h2 className="fw-bold display-5">
            What Customers Say
          </h2>
        </div>

        <div className="row g-0 align-items-center justify-content-center">

          {/* Testimonial 1 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="p-3">
              <p className="fs-6 text-secondary">
                "The Royal Wedding Cake was absolutely stunning and tasted incredible. Every guest loved it, and it became the highlight of our wedding celebration!"
              </p>

              <div className="d-flex align-items-center mt-4">
                <img
                  src="src/assets/Homepage_testi.png"
                  alt=""
                  className="rounded-circle me-3"
                  width="60"
                  height="60"
                />

                <div>
                  <h5 className="mb-0 text-danger">
                    Sarah Johnson ⭐⭐⭐⭐⭐
                  </h5>
                  <small className="text-muted">
                    Designer
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="p-3">
              <p className="fs-6 text-secondary">
                "Beautiful design, rich flavor, and exceptional service. The cake exceeded our expectations and made our special day even more memorable."
              </p>

              <div className="d-flex align-items-center mt-4">
                <img
                  src="src/assets/Homepage_testi2.png"
                  alt=""
                  className="rounded-circle me-3"
                  width="60"
                  height="60"
                />

                <div>
                  <h5 className="mb-0 text-danger">
                    Michael & Emma ⭐⭐⭐⭐
                  </h5>
                  <small className="text-muted">
                    Developer
                  </small>

                </div>
              </div>
            </div>

          </div>

        </div>

      </div>


      {/* six section  */}

      <div className='h-auto'>
        <div className='row g-0 justify-content-center six-height align-items-center text-center'>
          <div className="col-12 col-md-4 col-lg-3">
            <img src="src\assets\instra1.png" alt="" className='img-fluid' />
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <img src="src\assets\instra2.png" alt="" className='img-fluid' />
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <img src="src\assets\instra3.png" alt="" className='img-fluid' />
          </div>
          <div className="col-12 col-md-4 col-lg-3 d-md-none d-lg-block">
            <img src="src\assets\instra4.png" alt="" className='img-fluid' />
          </div>
        </div>
      </div>

      {/* footer section  */}

      <div className="footer-section">
        <div className="container">
          <div className="row gy-5">

            {/* Logo & About */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-logo d-flex align-items-center mb-4">
                <div className="logo-circle">
                  <i className="bi bi-cake2-fill"></i>
                </div>
                <h2 className="ms-3">Cake</h2>
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

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h5>Quick Links</h5>
              <ul className="footer-links">
                <li><NavLink to="/home" style={{ "textDecoration": "none" }}>Home</NavLink></li>
                <li><NavLink to="/about" style={{ "textDecoration": "none" }}>About</NavLink></li>
                <li><NavLink to="/products" style={{ "textDecoration": "none" }}>Products</NavLink></li>
                <li><NavLink to="/contact" style={{ "textDecoration": "none" }}>Contact</NavLink></li>
              </ul>
            </div>

            {/* Cakes */}
            <div className="col-lg-2 col-md-6">
              <h5>Cakes</h5>
              <ul className="footer-links">
                <li>Birthday Cake</li>
                <li>Celebration Cake</li>
                <li>Wedding Cake</li>
                <li>Fruit Cake</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-lg-4 col-md-6">
              <h5>Contact Us</h5>
              <p className="address">
                76/A, Green Lane, Dhanmondi, NYC
              </p>

              <h6 className="phone-number">
                +10 (78) 738-9083
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



    </section>
  )
}

export default About