import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function ContactUs() {
  return (
    <>
      <div class="main_body_content">
        {/* <!-- header section strats --> */}

        <Header />

        {/* <!-- end header section --> */}

        {/* <!-- contact section --> */}

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

        {/* <!-- end contact section --> */}

        {/* Footer Sction */}

        <Footer />
      </div>
    </>
  );
}

export default ContactUs;
