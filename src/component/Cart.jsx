import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Cart.css";
import { loadStripe } from '@stripe/stripe-js';

function Cart() {
  const [cart, setCart] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [address, setAddress] = useState({ street: "", area: "", city: "", pincode: "", state: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    updateCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1);
    }
    updateCart(updatedCart);
  };

  // Calculate Grand Total
  const grandTotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);
  const handleOrderClick = () => {
    setShowAddressForm(true);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    localStorage.setItem("address", JSON.stringify({ ...address, [name]: value }));
  };

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51R5NjmPcEXlQO6TDFkjT7MjWaVeuoSDFTlDQTCeLHyenB9UJQqtYpdJRHfHw2BB1hH7HNM0pa0v0hLXqmM97lsVG00BtlVKNzE");

    const body = {
      products: cart
    }

    const headers = {
      "Content-Type": "application/json"
    }

    const response = await fetch(`http://localhost:4000/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      console.log(result.error);
    }

  }

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2>Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`http://localhost:4000/${item.images}`}
                      alt={item.name}
                      width="60"
                      className="me-2"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => decreaseQuantity(index)}>
                      -
                    </button>
                    <span className="mx-2">{item.quantity || 1}</span>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => increaseQuantity(index)}>
                      +
                    </button>
                  </td>
                  <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => decreaseQuantity(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Keep "Continue Shopping" button always visible */}
        <div className="d-flex justify-content-between align-items-center my-3">
          <button onClick={() => navigate("/choco")} className="btn btn-secondary">
            Continue Shopping
          </button>

          {/* Show Grand Total & "Place Order" button only when cart has items */}
          {cart.length > 0 && (
            <>
              <h4 className="text-primary">Grand Total: ${grandTotal}</h4>
              <button className="btn btn-primary" onClick={handleOrderClick}>
                Place Order
              </button>
            </>
          )}
        </div>

        {/* 🏠 Place Order Popup */}
        {showAddressForm && (
          <div className="address-popup-overlay">
            <div className="address-popup">
              <h3>Enter Your Address</h3>
              <form>
                <input type="text" name="street" placeholder="Street" onChange={handleAddressChange} className="form-control mb-2" />
                <input type="text" name="area" placeholder="Area" onChange={handleAddressChange} className="form-control mb-2" />
                <input type="text" name="city" placeholder="City" onChange={handleAddressChange} className="form-control mb-2" />
                <input type="text" name="pincode" placeholder="Pincode" onChange={handleAddressChange} className="form-control mb-2" />
                <input type="text" name="state" placeholder="State" onChange={handleAddressChange} className="form-control mb-2" />
                <div className="d-flex justify-content-between mt-3">
                  <button type="button" className="btn btn-success" onClick={makePayment}>Submit</button>
                  <button type="button" className="btn btn-danger" onClick={() => setShowAddressForm(false)}>Close</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;
