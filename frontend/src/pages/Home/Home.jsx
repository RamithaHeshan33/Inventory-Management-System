import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import '../../CSS/Home.css';

function Home() {
  return (
    <div>
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className="video-background"
      >
        <source src="res/background.mp4" type="video/mp4" />
      </video>

      <NavBar />

      <div className="container py-5">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-12 col-md-7 mb-4 mb-md-0 order-2 order-md-1">
            <h1 className="mb-4 text-center text-md-start">Welcome to ExpiryTrack</h1>
            <p className="fs-5" style={{textAlign: 'justify'}}>
              In today’s fast-paced retail and supply chain environment, managing perishable and time-sensitive inventory is critical to reducing waste and maximizing profitability. The Inventory Expiry Management System is designed to help warehouses and retailers track stock expiry dates with precision, receive timely alerts, and make proactive decisions to avoid losses. Whether you’re overseeing large-scale warehouse operations or managing shelves in a retail store, our system gives you real-time visibility into expiring products, helps you prioritize inventory rotation, and even suggests promotional offers to accelerate the sale of aging stock.
            </p>
          </div>

          {/* Image Section */}
          <div className="col-12 col-md-5 text-center order-1 order-md-2 mb-3">
            <img
              src="res/Home.png"
              alt="login"
              className="img-fluid border border-2 rounded-3 shadow-lg"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
