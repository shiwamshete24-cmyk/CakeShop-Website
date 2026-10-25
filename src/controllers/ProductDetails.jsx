import React, { useEffect, useState } from "react";
import "../controllers/css/singlecarddetails.css";
import axios from "axios";
import {  useNavigate, useParams } from "react-router";

const ProductDetails = () => {

    const navigate = useNavigate()

   

    const [product , setProduct] = useState({
        id: "",
        name: "",
        category: "",
        price: undefined,
        offerPrice: undefined,
        weight: "",
        flavor: "",
        description:"",
        image: "",
        stock: undefined,
        rating: undefined,
        reviews: undefined,
        deliveryTime: ""
    });
    

     const addToCart = async (product) => {
    
        try {
    
          const userData =
            JSON.parse(
              localStorage.getItem("userData")
            );
    
          const cartResponse =
            await axios.get(
              "http://localhost:3000/cart"
            );
    
          const existingProduct =
            cartResponse.data.find(
              (item) =>
                item.product_id === product.id &&
                item.email === userData.email
            );
    
          if (existingProduct) {
    
            const updatedQuantity =
              existingProduct.quantity + 1;
    
            const updatedSubtotal =
              updatedQuantity *
              existingProduct.price;
    
            await axios.patch(
              `http://localhost:3000/cart/${existingProduct.id}`,
              {
                quantity: updatedQuantity,
                subtotal: updatedSubtotal
              }
            );
    
            // alert(
            //   `Quantity Updated (${updatedQuantity})`
            // );
    
          } else {
    
            await axios.post(
              "http://localhost:3000/cart",
              {
                email: userData.email,
                product_id: product.id,
                quantity: 1,
                price: product.offerPrice,
                subtotal: product.offerPrice,
                image: product.image,
                name: product.name,
                category: product.category
              }
            );
    
            // alert("Product Added To Cart");
    
          }
    
          navigate("/cart");
    
        } catch (error) {
    
          console.log(error);
    
          alert(
            "Something went wrong. Please try again."
          );
    
        }
    
      };

    // const discount = Math.round(
    //     ((product.price - product.offerPrice) / product.price) * 100
    // );

    const {id} = useParams();

    console.log("product id=> ", id);


    

    useEffect(() => {

        const fetchResults = async () => {

            try {
               console.log("id +>" , id);
                const response1 = await axios.get(`http://localhost:3000/products/${id}`);

                console.log("products details", response1.data);
                setProduct(response1.data);
                


            } catch (error) {
                console.log(error);
                console.error(error);
            }
        }

        fetchResults();

    }, []);



    return (
        <div className="product-page-main">

            <div className="product-card-main">

                {/* LEFT IMAGE SECTION */}

                <div className="product-image-section">

                    <div className="product-image-glow"></div>

                    <img
                        src={`/productsImages/${product.image}`}
                        alt={product.name}
                        className="product-main-image"
                        onError={(e) => {
                                            e.target.src =
                                                `${product.image}`;
                                        }}
                    />

                </div>

                {/* RIGHT CONTENT SECTION */}

                <div className="product-content-section">

                    <span className="product-category-tag">
                        {product.category}
                    </span>

                    <div className="product-title-row">

                        <h1 className="product-title1">
                            {product.name}
                        </h1>

                        <button className="product-wishlist-btn">
                            ❤
                        </button>

                    </div>

                    <div className="product-rating-row">

                        <span className="product-rating-badge">
                            ⭐ {product.rating}
                        </span>

                        <span className="product-review-count">
                            {product.reviews}+ Reviews
                        </span>

                    </div>

                    <div className="product-price-row">

                        <span className="product-offer-price">
                            ₹{product.offerPrice}
                        </span>

                        <span className="product-actual-price">
                            ₹{product.price}
                        </span>

                        <span className="product-discount-badge">
                            { }% OFF
                        </span>

                    </div>

                    <p className="product-description-text">
                        {product.description} A celebration-ready cake topped with freshness, flavor, and happines
                    </p>

                    {/* PRODUCT FEATURES */}

                    <div className="product-feature-row">

                        <div className="product-feature-card">
                            🎂{product.weight}
                        </div>

                        <div className="product-feature-card">
                            🍫{product.flavor}
                        </div>

                        <div className="product-feature-card">
                            🚚{product.deliveryTime}
                        </div>

                        

                    </div>

                    {/* BENEFITS */}

                    <div className="product-benefits-grid">

                        <div className="product-benefit-card">
                            ✨ Freshly Baked Daily
                        </div>

                        <div className="product-benefit-card">
                            🚚 Same Day Delivery
                        </div>

                        <div className="product-benefit-card">
                            🎉 Birthday Special
                        </div>

                        <div className="product-benefit-card">
                            🍫 Premium Ingredients
                        </div>

                    </div>

                    {/* BUTTONS */}

                    <div className="product-button-row">

                        <button className="product-buy-btn" onClick={()=>navigate("/products")}>
                            go back
                        </button>

                        <button className="product-cart-btn" onClick={()=>addToCart(product)}>
                            Add To Cart
                        </button>

                        

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;