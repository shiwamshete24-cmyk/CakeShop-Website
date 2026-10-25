import React, { useEffect, useState } from "react";
import "../AdminCSS/categorydetails.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const CategoryDetails = () => {

    const navigate = useNavigate();

    const { categoryName } = useParams();

    const decodedCategory =
        decodeURIComponent(categoryName);

    const [products, setProducts] =
        useState([]);

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:3000/products"
                );

            const filteredProducts =
                response.data.filter(
                    (item) =>
                        item.category ===
                        decodedCategory
                );

            setProducts(filteredProducts);

        } catch (error) {

            console.log(error);

        }

    };

    const totalStock =
        products.reduce(
            (total, item) =>
                total +
                Number(item.stock || 0),
            0
        );

    return (

        <div className="category-details-page">

            <div className="container-fluid">

                <div className="details-header d-flex justify-content-between">

                    <div>

                        <h2>
                            {decodedCategory}
                        </h2>

                        <p>
                            Category Products
                        </p>

                    </div>

                    <button
                        className="btn btn-warning"
                        onClick={() =>
                            navigate("/categories")
                        }
                    >
                        Back
                    </button>

                </div>

                <div className="row g-4 mb-4">

                    <div className="col-md-4">

                        <div className="details-card text-center">

                            <h3>
                                {products.length}
                            </h3>

                            <p>
                                Total Products
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="details-card text-center">

                            <h3>
                                {totalStock}
                            </h3>

                            <p>
                                Total Stock
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="details-card text-center">

                            <h3>
                                Active
                            </h3>

                            <p>
                                Category Status
                            </p>

                        </div>

                    </div>

                </div>
                <div className="details-card">

                    <h4>
                        Products In Category
                    </h4>

                    <div className="table-responsive">

                        <table className="table align-middle">

                            <thead>

                                <tr>

                                    <th>
                                        Image
                                    </th>

                                    <th>
                                        Product Name
                                    </th>

                                    <th>
                                        Price
                                    </th>

                                    <th>
                                        Offer Price
                                    </th>

                                    <th>
                                        Weight
                                    </th>

                                    <th>
                                        Stock
                                    </th>

                                    <th>
                                        Rating
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    products.length > 0 ? (

                                        products.map(
                                            (product) => (

                                                <tr
                                                    key={product.id}
                                                >

                                                    <td>

                                                        <img
                                                            src={`/productsImages/${product.image}`}
                                                            alt={product.name}
                                                            className="cake-img"
                                                            onError={(e) => {
                                                                e.target.src = `${product.image}`;
                                                            }}

                                                            width="60"
                                                            height="60"
                                                            style={{
                                                                objectFit:
                                                                    "cover",
                                                                borderRadius:
                                                                    "8px"
                                                            }}
                                                        />

                                                    </td>

                                                    <td>
                                                        {
                                                            product.name
                                                        }
                                                    </td>

                                                    <td>
                                                        ₹
                                                        {
                                                            product.price
                                                        }
                                                    </td>

                                                    <td>
                                                        ₹
                                                        {
                                                            product.offerPrice
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            product.weight
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            product.stock
                                                        }
                                                    </td>

                                                    <td>
                                                        ⭐
                                                        {
                                                            product.rating
                                                        }
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`cat-status ${product.status ===
                                                                    "Active"
                                                                    ? "active-cat"
                                                                    : "inactive-cat"
                                                                }`}
                                                        >
                                                            {
                                                                product.status
                                                            }
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <button
                                                            className="cat-edit-btn"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/editproduct/${product.id}`
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="9"
                                                className="text-center"
                                            >
                                                No Products Found
                                            </td>

                                        </tr>

                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default CategoryDetails;