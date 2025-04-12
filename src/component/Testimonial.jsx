import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Testimonial() {
  return (
    <>
      <div class="main_body_content">
        {/* <!-- header section strats --> */}
        <Header />
        {/* <!-- end header section --> */}

        {/* <!-- client section --> */}

        <section className="client_section layout_padding">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 ml-auto">
                <div className="img-box sub_img-box">
                  <img
                    src={require(`./images/client-chocolate.png`)}
                    alt="Client Chocolate"
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
                            <img src={require(`./images/client-img.jpg`)} alt="Client" />
                          </div>
                          <div className="detail-box">
                            <h4>Gero Miliya</h4>
                            <p>
                              Long established fact that a reader will be
                              distracted by the readable content of a page when
                              looking at its layout. The point of using Lorem
                              Ipsum is that it has long established fact that a
                              reader will be distracted by the readable content
                              of a page when looking at its layout. The point of
                              using Lorem Ipsum is that it has long established
                              fact that a reader will be distracted by the
                              readable content of a page when looking at its
                              layout. The point of using Lorem Ipsum is that it
                              has.
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
                            <img src={require(`./images/client-img.jpg`)} alt="Client" />
                          </div>
                          <div className="detail-box">
                            <h4>Gero Miliya</h4>
                            <p>
                              Long established fact that a reader will be
                              distracted by the readable content of a page when
                              looking at its layout. The point of using Lorem
                              Ipsum is that it has long established fact that a
                              reader will be distracted by the readable content
                              of a page when looking at its layout. The point of
                              using Lorem Ipsum is that it has long established
                              fact that a reader will be distracted by the
                              readable content of a page when looking at its
                              layout. The point of using Lorem Ipsum is that it
                              has.
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
                            <img src={require(`./images/client-img.jpg`)} alt="Client" />
                          </div>
                          <div className="detail-box">
                            <h4>Gero Miliya</h4>
                            <p>
                              Long established fact that a reader will be
                              distracted by the readable content of a page when
                              looking at its layout. The point of using Lorem
                              Ipsum is that it has long established fact that a
                              reader will be distracted by the readable content
                              of a page when looking at its layout. The point of
                              using Lorem Ipsum is that it has long established
                              fact that a reader will be distracted by the
                              readable content of a page when looking at its
                              layout. The point of using Lorem Ipsum is that it
                              has.
                            </p>
                            <i
                              className="fa fa-quote-left"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel_btn-box">
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
          </div>
        </section>

        {/* <!-- end client section --> */}

        {/* <!-- footer section --> */}

        <Footer />
      </div>
    </>
  );
}

export default Testimonial;
