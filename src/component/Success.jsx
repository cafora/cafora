import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Cart.css";
import { CheckCircle } from "react-feather";

function Success() {
    const navigate = useNavigate();

    useEffect(() => {
        const OrderPlace = async () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const authToken = localStorage.getItem("authToken");
            const storedAddress = JSON.parse(localStorage.getItem("address")) || { street: "Default", city: "Default", state: "Default" };

            const orderData = {
                products: cart.map(item => ({
                    productId: item.id,
                    count: item.quantity
                })),
                address: `${storedAddress.street}, ${storedAddress.area}, ${storedAddress.city} - ${storedAddress.pincode}, ${storedAddress.state}`
            };

            try {
                const response = await fetch("http://localhost:4000/order/create-order", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(orderData)
                });

                const result = await response.json();

                if (response.status === 201) {
                    localStorage.removeItem("cart");
                    localStorage.removeItem("address");
                    // navigate("/orders");
                } else {
                    console.error("Failed to create order", result.message);
                }
            } catch (error) {
                console.error("Error creating order:", error);
            }
        };

        OrderPlace();
    }, [navigate]);

    return (
        <>
            <Header />
            <div className="payment-container" style={{ marginLeft: "500px", marginTop: "100px", marginBottom: "100px" }}>
                <CheckCircle className="success-icon" size={80} color="green" />
                <h2 className="success-message">Payment Successful!</h2>
                <p className="success-text">Thank you for your purchase. Your order has been confirmed.</p>
                <button
                    className="btn btn-dark"
                    onClick={() => {
                        localStorage.removeItem("cart");
                        navigate("/");
                    }}
                >
                    Go to Home
                </button>
            </div>
            <Footer />
        </>
    );
}

export default Success;
