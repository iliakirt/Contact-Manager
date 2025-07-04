import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.jpg";
import { useLocation } from "react-router-dom";

function ContactDetails() {
    const location = useLocation();
    const { name, email } = location.state.contact;

    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div className="centered-div">
                <Link to="/">
                    <button className="ui button blue center">Back to Contact</button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetails;