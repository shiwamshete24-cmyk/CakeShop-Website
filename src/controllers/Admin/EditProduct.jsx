import React, {useEffect,useState} from "react";
import "../AdminCSS/addProduct.css";
import {useNavigate, useParams} from "react-router";
import axios from "axios";

const EditProduct = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] =
        useState(false);

    const [productData, setProductData] =
        useState({
            name: "",
            category: "",
            price: "",
            offerPrice: "",
            weight: "",
            flavor: "",
            description: "",
            image: "",
            stock: "",
            rating: "",
            reviews: "",
            deliveryTime: "",
            status: ""
        });

    useEffect(() => {

        fetchProduct();

    }, []);

    const fetchProduct =
        async () => {

            try {

                const response =
                    await axios.get(
                        `http://localhost:3000/products/${id}`
                    );

                setProductData(
                    response.data
                );

            } catch (error) {

                console.log(error);

            }

        };

    const handleChange = (
        e
    ) => {

        const {
            name,
            value
        } = e.target;

        setProductData(
            (prev) => ({
                ...prev,
                [name]: value
            })
        );

    };

    const handleImageUpload =
        async (e) => {

            const file =
                e.target.files[0];

            if (!file) return;

            try {

                setLoading(true);

                const formData =
                    new FormData();

                formData.append(
                    "file",
                    file
                );

                formData.append("upload_preset", "cake_profile");

                const response =
                    await axios.post(
                        "https://api.cloudinary.com/v1_1/drplkjebm/image/upload",
                        formData
                    );

                setProductData(
                    (prev) => ({
                        ...prev,
                        image:
                            response.data
                                .secure_url
                    })
                );

                setLoading(false);

            } catch (error) {

                console.log(error);

                setLoading(false);

            }

        };

    const handleUpdate =
        async (e) => {

            e.preventDefault();

            try {

                await axios.put(
                    `http://localhost:3000/products/${id}`,
                    productData
                );

                alert(
                    "Product Updated Successfully"
                );

                navigate(
                    "/product"
                );

            } catch (error) {

                console.log(error);

            }

        };

    return (

        <div className="container py-5">


            <div className="page-header">

                <div>

                    <h2>
                        Edit Product
                    </h2>

                    <p>
                        Update Product Information
                    </p>

                </div>

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate(
                            "/product"
                        )
                    }
                >
                    Back
                </button>

            </div>

            <form
                onSubmit={
                    handleUpdate
                }
            >

                <div className="row g-4">
                    <div className="col-lg-12">

                        <div className="form-card">

                            <h4>
                                Product Information
                            </h4>

                            <div className="row g-4">

                                <div className="col-md-6">

                                    <label>
                                        Cake Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="custom-input"
                                        value={
                                            productData.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label>
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        className="custom-input"
                                        value={
                                            productData.category
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    >

                                        <option>
                                            Birthday Cakes
                                        </option>

                                        <option>
                                            Wedding Cakes
                                        </option>

                                        <option>
                                            Chocolate Cakes
                                        </option>

                                        <option>
                                            Anniversary Cakes
                                        </option>

                                        <option>
                                            Designer Cakes
                                        </option>

                                        <option>
                                            Cup Cakes
                                        </option>

                                    </select>

                                </div>

                                <div className="col-md-6">

                                    <label>
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        className="custom-input"
                                        value={
                                            productData.price
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label>
                                        Offer Price
                                    </label>

                                    <input
                                        type="number"
                                        name="offerPrice"
                                        className="custom-input"
                                        value={
                                            productData.offerPrice
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label>
                                        Weight
                                    </label>

                                    <input
                                        type="text"
                                        name="weight"
                                        className="custom-input"
                                        value={
                                            productData.weight
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label>
                                        Flavor
                                    </label>

                                    <input
                                        type="text"
                                        name="flavor"
                                        className="custom-input"
                                        value={
                                            productData.flavor
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label>
                                        Stock
                                    </label>

                                    <input
                                        type="number"
                                        name="stock"
                                        className="custom-input"
                                        value={
                                            productData.stock
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label>
                                        Delivery Time
                                    </label>

                                    <input
                                        type="text"
                                        name="deliveryTime"
                                        className="custom-input"
                                        value={
                                            productData.deliveryTime
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label>
                                        Rating
                                    </label>

                                    <input
                                        type="number"
                                        step="0.1"
                                        name="rating"
                                        className="custom-input"
                                        value={
                                            productData.rating
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label>
                                        Reviews
                                    </label>

                                    <input
                                        type="number"
                                        name="reviews"
                                        className="custom-input"
                                        value={
                                            productData.reviews
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label>
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        className="custom-input"
                                        value={
                                            productData.status
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option>
                                            Active
                                        </option>

                                        <option>
                                            Inactive
                                        </option>

                                    </select>

                                </div>

                                <div className="col-12">

                                    <label>
                                        Description
                                    </label>

                                    <textarea
                                        rows="5"
                                        name="description"
                                        className="custom-input"
                                        value={
                                            productData.description
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                                <div className="col-12">

                                    <label>
                                        Product Image
                                    </label>

                                    <input
                                        type="file"
                                        className="custom-input"
                                        accept="image/*"
                                        onChange={
                                            handleImageUpload
                                        }
                                    />

                                    {
                                        loading && (
                                            <p
                                                style={{
                                                    marginTop:
                                                        "10px",
                                                    color:
                                                        "green"
                                                }}
                                            >
                                                Uploading...
                                            </p>
                                        )
                                    }

                                    {
                                        productData.image && (
                                            <div
                                                style={{
                                                    marginTop:
                                                        "15px"
                                                }}
                                            >

                                                <img
                                                    src={
                                                        productData.image
                                                    }
                                                    alt=""
                                                    width="150"
                                                    height="150"
                                                    style={{
                                                        objectFit:
                                                            "cover",
                                                        borderRadius:
                                                            "10px"
                                                    }}
                                                />

                                            </div>
                                        )
                                    }

                                </div>

                            </div>

                            <div className="button-group">

                                <button
                                    type="submit"
                                    className="save-btn"
                                    disabled={
                                        loading
                                    }
                                >
                                    {
                                        loading
                                            ? "Uploading..."
                                            : "Update Product"
                                    }
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </form>

        </div>

    );

};

export default EditProduct;