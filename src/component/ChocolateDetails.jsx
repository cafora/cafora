import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import chocolateService from "./services/chocolateService";
import Header from "./Header";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChocolateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chocolate, setChocolate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchChocolateDetails();
  }, [id]);

  const fetchChocolateDetails = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const data = await chocolateService.getChocolate(id, authToken);
      console.log("Fetched Data:", data);
      if (!data) {
        setError("Chocolate not found");
        return;
      }

      setChocolate(data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to fetch chocolate details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!chocolate) {
      console.error("No chocolate data available to add to cart.");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: chocolate._id,
      images: chocolate.images,
      name: chocolate.name,
      image: chocolate.image,
      price: chocolate.price,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart Updated:", cart);

    // ✅ Show a success toast message
    toast.success(`${chocolate.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // ⏳ Delay navigation so the user sees the toast message
  // setTimeout(() => {
  //   navigate("/cart");
  // }, 2000);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chocolate) return <div>Chocolate not found</div>;

  return (
    <>
      {/* ✅ Header Component */}
      <Header />

      {/* ✅ ToastContainer placed immediately after Header */}
      <div style={{ position: "relative", zIndex: 1050 }}>
        <ToastContainer style={{ marginTop: "80px" }} />
      </div>

      {/* ✅ Main Content */}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`http://localhost:4000${chocolate.images}`}
              alt={chocolate.name}
              className="img-fluid rounded"
              style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h2>{chocolate.name}</h2>
            <p className="text-muted">{chocolate.category}</p>
            <h3 className="text-primary">${chocolate.price}</h3>
            <div className="my-4">
              <h4>Description</h4>
              <p>{chocolate.description}</p>
            </div>
            {chocolate.ingredients && (
              <div className="my-4">
                <h4>Ingredients</h4>
                <p>{chocolate.ingredients}</p>
              </div>
            )}
            <div className="mt-4">
              <button className="btn btn-primary me-3" onClick={handleAddToCart}>
                Add to Cart

              </button>

              <button className="btn btn-outline-secondary" onClick={() => navigate('/choco')}>
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Footer Component */}
      <Footer />
    </>
  );
}

export default ChocolateDetails;
