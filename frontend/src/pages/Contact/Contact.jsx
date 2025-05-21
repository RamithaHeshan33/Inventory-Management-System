import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
const WEB3_API = import.meta.env.VITE_WEB3_API;

function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", WEB3_API);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div>
      <video
        autoPlay
        loop
        muted
        className="video-background"
      >
        <source src="res/background.mp4" type="video/mp4" />
      </video>
      <NavBar />

      <div className="header text-center">
        <h1 className="text-uppercase fw-bold" style={{ letterSpacing: '0.2rem' }}>
          Contact
        </h1>
      </div>

      <div className="container py-4">
        <div className="row justify-content-center align-items-center border rounded-4 shadow p-3 bg-body-tertiary">
          
          {/* Image Section */}
          <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
            <img
              src="res/contact.png"
              alt="Contact Illustration"
              className="img-fluid login-image"
            />
          </div>

          {/* Form Section */}
          <div className="col-12 col-md-6 fs-5">
          {result && <p className="text-success text-center mt-3">{result}</p>}
            <form onSubmit={onSubmit} className="d-flex flex-column gap-3 mb-4">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control mt-2"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control mt-2"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  className="form-control mt-2"
                  id="message"
                  rows="4"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
