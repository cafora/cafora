import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Cart.css";
import { XCircle } from "react-feather";

function Failed() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className="payment-container" style={{ marginLeft: "500px", marginTop: "100px", marginBottom: "100px" }}>
                <XCircle className="failed-icon" size={80} color="red" />
                <h2 className="failed-message">Payment Failed!</h2>
                <p className="failed-text">Oops! Something went wrong. Please try again.</p>
                <button className="btn" onClick={() => navigate("/cart")}>Retry Payment</button>
            </div>
            <Footer />
        </>
    );
}

export default Failed;
