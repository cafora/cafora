import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import chocolateService from "./services/chocolateService";
import Header from "./Header";
import Footer from "./Footer";

function Chocolate() {
  const [chocolates, setChocolates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchChocolates();
  }, []);

  const fetchChocolates = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const data = await chocolateService.getAllChocolates(authToken);
      setChocolates(data.records);
    } catch (err) {
      setError(err.message || "Failed to fetch chocolates");
    } finally {
      setLoading(false);
    }
  };

  const handleViewProduct = (id) => {
    navigate(`/chocolate/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="main_body_content">
        <Header />

        <section className="chocolate_section layout_padding">
          <div className="container">
            <div className="heading_container">
              <h2>Our chocolate products</h2>
              <p>Discover our delightful selection of handcrafted chocolates</p>
            </div>
          </div>
          <div className="container">
            <div className="chocolate_container d-flex justify-content-evenly flex-wrap">
              {chocolates.map((chocolate) => (
                <div
                  className="box"
                  style={{ width: "30%" }}
                  key={chocolate._id}
                >
                  <div className="img-box">
                    <img
                      src={`http://localhost:4000${chocolate.images}`}
                      alt={chocolate.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="detail-box">
                    <h6>
                      {chocolate.name} <span>{chocolate.category}</span>
                    </h6>
                    <h5>${chocolate.price}</h5>
                    <button
                      onClick={() => handleViewProduct(chocolate._id)}
                      className="btn btn-primary"
                    >
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Chocolate;
