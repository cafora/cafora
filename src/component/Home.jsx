import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import chocolateService from "./services/chocolateService";
import { useNavigate } from "react-router-dom";

function Home() {
  useEffect(() => {
    // Initialize Bootstrap carousel
    if (typeof window !== "undefined") {
      // Using CDN import since we can only use cdnjs in artifacts
      const bootstrapScript = document.createElement("script");
      bootstrapScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/js/bootstrap.min.js";

      const jqueryScript = document.createElement("script");
      jqueryScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js";

      // Add Bootstrap CSS
      const bootstrapCSS = document.createElement("link");
      bootstrapCSS.rel = "stylesheet";
      bootstrapCSS.href =
        "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/css/bootstrap.min.css";

      document.head.appendChild(bootstrapCSS);
      document.body.appendChild(jqueryScript);

      jqueryScript.onload = () => {
        document.body.appendChild(bootstrapScript);
      };
    }
  }, []);

  const [chocolates, setChocolates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      navigate("/login"); // Redirect to login page if no token
      return;
    }

    fetchChocolates(currentPage, 3);
  }, [currentPage, navigate]);

  const fetchChocolates = async (page, limit) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const data = await chocolateService.getAllChocolates(authToken, page, limit);
      setChocolates(data.records);
    } catch (err) {
      setError(err.message || "Failed to fetch chocolates");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleViewProduct = (id) => {
    navigate(`/chocolate/${id}`);
  };

  return (
    <div className="main_body_content">
      <div className="hero_area">
        {/* Header Section */}
        <Header />

        {/* Slider Section */}
        <section className="slider_section">
          <div
            id="customCarousel1"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              {chocolates.map((chocolate, index) => (
                <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="detail_box">
                          <h1>
                            Chocolate <br />
                            <span>{chocolate.name}</span>
                          </h1>
                          {/* You can also dynamically render more details like the chocolate price */}
                        </div>
                      </div>
                      <div className="col-md-4 ml-auto">
                        <div className="img-box">
                          {/* Dynamically use the image from chocolate.images if available */}
                          <img src={`http://localhost:4000${chocolate.images}`} alt={chocolate.name} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel_btn-box">
              <a
                className="carousel-control-prev"
                href="#customCarousel1"
                role="button"
                data-slide="prev"
              >
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#customCarousel1"
                role="button"
                data-slide="next"
              >
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <section className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>About Our Company</h2>
                </div>
                <p>
                  Lorem Ipsum is that it has a more-or-less normal distribution
                  of letters, as opposed to using 'Content here, content here',
                  making it look like readable English.
                </p>
                <a href="#">
                  <span>Read More</span>
                  <img src={require("./images/color-arrow.png")} alt="" />
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="img-box">
                <img src={require("./images/about-img.png")} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chocolate Section */}
      <section className="chocolate_section">
        <div className="container">
          <div className="heading_container">
            <h2>Our Chocolate Products</h2>
            <p>
              Many desktop publishing packages and web page editors now use Lorem Ipsum as their
            </p>
          </div>
          <div className="chocolate_container d-flex justify-content-evenly">
            {/* Dynamically render chocolates */}
            {chocolates.map((chocolate, index) => (
              <div className="box" style={{ width: "30%" }} key={index}>
                <div className="img-box">
                  {/* Dynamically use chocolate image */}
                  <img src={`http://localhost:4000${chocolate.images}`} alt={chocolate.name} />
                </div>
                <div className="detail-box">
                  {/* Dynamically use chocolate name and price */}
                  <h6>
                    {chocolate.name}
                  </h6>
                  <h5>${chocolate.price || "5.0"}</h5> {/* Fallback price if not available */}
                  <a style={{ cursor: "pointer" }} onClick={() => handleViewProduct(chocolate._id)}>BUY NOW</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="offer_section layout_padding">
        <div className="container">
          <div className="box">
            <div className="detail-box">
              <h2>Offers on chocolates</h2>
              <h3>
                Get 5% Offer <br />
                any Chocolate items
              </h3>
              <a href="">Buy Now</a>
            </div>
            <div className="img-box">
              <img src={require("./images/offer-img.png")} alt="" />
            </div>
          </div>
          <div className="btn-box">
            <a href="">
              <span>See More</span>
              <img src={require("./images/color-arrow.png")} alt="" />
            </a>
          </div>
        </div>
      </section>

      {/* Client Section */}
      <section className="client_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 ml-auto">
              <div className="img-box sub_img-box">
                <img
                  src={require("./images/client-chocolate.png")}
                  alt="Chocolate"
                />
              </div>
            </div>
            <div className="col-lg-6 px-0">
              <div className="client_container">
                <div className="heading_container">
                  <h2>Testimonial</h2>
                </div>
                <div
                  id="customCarousel2"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="box">
                        <div className="img-box">
                          <img
                            src={require("./images/client-img.jpg")}
                            alt="Client 1"
                          />
                        </div>
                        <div className="detail-box">
                          <h4>Gero Miliya</h4>
                          <p>
                            Long established fact that a reader will be
                            distracted...
                          </p>
                          <i
                            className="fa fa-quote-left"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="box">
                        <div className="img-box">
                          <img
                            src={require("./images/client-img.jpg")}
                            alt="Client 2"
                          />
                        </div>
                        <div className="detail-box">
                          <h4>Gero Miliya</h4>
                          <p>
                            Long established fact that a reader will be
                            distracted...
                          </p>
                          <i
                            className="fa fa-quote-left"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="box">
                        <div className="img-box">
                          <img
                            src={require("./images/client-img.jpg")}
                            alt="Client 3"
                          />
                        </div>
                        <div className="detail-box">
                          <h4>Gero Miliya</h4>
                          <p>
                            Long established fact that a reader will be
                            distracted...
                          </p>
                          <i
                            className="fa fa-quote-left"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Carousel controls */}
                  <a
                    className="carousel-control-prev"
                    href="#customCarousel2"
                    role="button"
                    data-slide="prev"
                  >
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#customCarousel2"
                    role="button"
                    data-slide="next"
                  >
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact us Section */}

      <section className="contact_section layout_padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 col-lg-4 offset-md-1 offset-lg-2">
              <div className="form_container">
                <div className="heading_container">
                  <h2>Contact Us</h2>
                </div>
                <form action="">
                  <div>
                    <input type="text" placeholder="Full Name" />
                  </div>
                  <div>
                    <input type="text" placeholder="Phone number" />
                  </div>
                  <div>
                    <input type="email" placeholder="Email" />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="message-box"
                      placeholder="Message"
                    />
                  </div>
                  <div className="d-flex">
                    <button>SEND NOW</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 px-0">
              <div className="map_container">
                <div className="map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509256!2d144.9630577153167!3d-37.81627927975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1616654250336!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer and info section */}

      <Footer />

    </div>
  );
}

export default Home;
