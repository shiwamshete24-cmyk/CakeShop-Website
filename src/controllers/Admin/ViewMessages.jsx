import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";

import "../AdminCSS/contactmessages.css";

import {
    NavLink,
    useNavigate
} from "react-router";

const ViewMessages = () => {

    const navigate = useNavigate();

    const [messages, setMessages] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        fetchMessages();

    }, []);

    const fetchMessages =
        async () => {

            try {

                const response =
                    await axios.get(
                        "http://localhost:3000/contact"
                    );

                setMessages(
                    response.data || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    const filteredMessages =
        messages.filter(
            (item) => {

                return (

                    item.name
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||

                    item.email
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||

                    item.subject
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )

                );

            }
        );

    const deleteMessage =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "Delete this message?"
                );

            if (!confirmDelete)
                return;

            try {

                await axios.delete(
                    `http://localhost:3000/contact/${id}`
                );

                fetchMessages();

            } catch (error) {

                console.log(error);

            }

        };

    return (

        <div className="admin-layout">

            <aside className="sidebar">

                <div className="sidebar-logo">
                    <h3>CakeAdmin</h3>
                </div>

                <ul className="sidebar-menu">

                    <li style={{"backgroundColor":"red"}}>
                        <NavLink
                            to="/admindashboard"
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                        >
                            <i className="fa-solid fa-chart-line"></i>
                            <span className="px-2">
                                Dashboard
                            </span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/product"
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                        >
                            <i className="fa-solid fa-cake-candles"></i>
                            <span className="px-2">
                                Products
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/addproduct"
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                        >
                            <i className="fa-solid fa-plus"></i>
                            <span className="px-2">
                                Add Product
                            </span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/orders"
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                        >
                            <i className="fa-solid fa-bag-shopping"></i>
                            <span className="px-2">
                                Orders
                            </span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/customers"
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                        >
                            <i className="fa-solid fa-users"></i>
                            <span className="px-2">
                                Customers
                            </span>
                        </NavLink>
                    </li>

                    <li
                        style={{
                            backgroundColor: "purple"
                        }}
                    >
                        <NavLink
                            to="/viewmessages"
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                        >
                            <i className="fa-solid fa-envelope"></i>
                            <span className="px-2">
                                Messages
                            </span>
                        </NavLink>
                    </li>

                    <li
                        onClick={() =>
                            navigate("/adminLogin")
                        }
                        style={{
                            backgroundColor: "gray"
                        }}
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Logout
                    </li>

                </ul>

            </aside>

            <div className="main-content">

                <div className="contacts1-message-page">

                    <div className="container-fluid">

                        <div className="contacts1-page-header">

                            <div>

                                <h2>
                                    Customer Messages
                                </h2>

                                <p>
                                    View all contact form messages
                                </p>

                            </div>

                        </div>
                        <div className="row g-4 mb-4">

                            <div className="col-lg-4 col-md-6">

                                <div className="contacts1-stat-card">

                                    <h3>
                                        {messages.length}
                                    </h3>

                                    <p>
                                        Total Messages
                                    </p>

                                </div>

                            </div>

                            <div className="col-lg-4 col-md-6">

                                <div className="contacts1-stat-card">

                                    <h3>
                                        {
                                            messages.filter(
                                                item => item.createdAt
                                            ).length
                                        }
                                    </h3>

                                    <p>
                                        Received Messages
                                    </p>

                                </div>

                            </div>

                            <div className="col-lg-4 col-md-6">

                                <div className="contacts1-stat-card">

                                    <h3>
                                        {
                                            filteredMessages.length
                                        }
                                    </h3>

                                    <p>
                                        Search Results
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="contacts1-search-card">

                            <input
                                type="text"
                                className="contacts1-search-input"
                                placeholder="Search Name, Email or Subject..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="contacts1-table-card">

                            <div className="table-responsive">

                                <table className="table align-middle">

                                    <thead>

                                        <tr>

                                            <th>Name</th>

                                            <th>Email</th>

                                            <th>Subject</th>

                                            <th>Message</th>

                                            <th>Date</th>

                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            filteredMessages.length > 0 ? (

                                                filteredMessages
                                                    .slice()
                                                    .reverse()
                                                    .map((item) => (

                                                        <tr
                                                            key={item.id}
                                                        >

                                                            <td>
                                                                {item.name}
                                                            </td>

                                                            <td>
                                                                {item.email}
                                                            </td>

                                                            <td>
                                                                {item.subject}
                                                            </td>

                                                            <td>

                                                                {
                                                                    item.message?.length > 40
                                                                        ? item.message.substring(
                                                                            0,
                                                                            40
                                                                        ) + "..."
                                                                        : item.message
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    item.createdAt
                                                                        ? new Date(
                                                                            item.createdAt
                                                                        ).toLocaleDateString(
                                                                            "en-IN"
                                                                        )
                                                                        : "-"
                                                                }

                                                            </td>

                                                            <td>

                                                                <button
                                                                    className="contacts1-view-btn mb-3"
                                                                    onClick={() => {

                                                                        alert(
                                                                            `Name : ${item.name}
                                                                            Email : ${item.email}
                                                                            Subject : ${item.subject}
                                                                            Message : ${item.message}`
                                                                        );

                                                                    }}
                                                                >
                                                                    View
                                                                </button>

                                                                <button
                                                                    className="contacts1-delete-btn"
                                                                    onClick={() =>
                                                                        deleteMessage(
                                                                            item.id
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>

                                                            </td>

                                                        </tr>

                                                    ))

                                            ) : (

                                                <tr>

                                                    <td
                                                        colSpan="6"
                                                        className="text-center"
                                                    >
                                                        No Messages Found
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

            </div>

        </div>

    );

};

export default ViewMessages;