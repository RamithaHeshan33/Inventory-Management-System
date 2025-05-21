import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import './About.css'

function About() {
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

          <div className='header text-center'>
            <h1 className=' fw-bold text-uppercase' style={{letterSpacing: '0.2rem'}}>About Us</h1>
          </div>

          <div className="container d-flex justify-content-center align-items-center gap-5 fs-5 mb-5">
            <div className="left col-12 col-md-5 mb-3">
              <img src="res/about.png" alt="" className="img-fluid border border-2 rounded-3 shadow-lg" />
            </div>
            <div className='right col-12 col-md-7 mb-3'>
              <h2>Who We Are</h2>
              <p>Welcome to the Inventory Expiry Management System – a smart solution built to help businesses manage perishable and time-sensitive stock more efficiently.</p>

              <p>We understand how challenging it is for retailers, warehouses, and supply chain teams to keep track of expiry dates, avoid product wastage, and maintain healthy stock turnover. That’s why we created a platform that not only tracks expiry dates but also sends timely alerts and suggests smart promotional strategies to move aging inventory before it expires.</p>

              <p>Our system is designed for a wide range of industries, including retail, food and beverage, pharmaceuticals, and manufacturing. Whether you're a small business or a large enterprise operating across multiple locations, we provide the tools you need to manage your inventory smarter, reduce waste, and maximize profits.</p>
            </div>
          </div>

          <div className="con1 container mb-5 bg-light-subtle rounded p-4">
            <div className="inline-lg row g-4 d-lg-flex">
              <div className="col-12 col-md-4 text-center border border-1 rounded-3 p-3">
                <img src="res/mission.png" className="w-75 d-block mx-auto" alt="" />
                <h2>Our Mission</h2>
                <p>Our mission is to help businesses reduce product wastage and improve stock turnover by providing smart, automated expiry tracking solutions. We aim to make inventory management simple, proactive, and cost-effective for all.</p>
              </div>

              <div className="col-12 col-md-4 text-center border border-1 rounded-3 p-3">
                <img src="res/vission.png" className="w-75 d-block mx-auto" alt="" />
                <h2>Our Vission</h2>
                <p>We envision a future where every business can manage perishable inventory with complete confidence—minimizing losses, maximizing efficiency, and operating sustainably with the power of technology.</p>
              </div>

              <div className="col-12 col-md-4 text-center border border-1 rounded-3 p-3">
                <img src="res/services.png" className="w-75 d-block mx-auto" alt="" />
                <h2>Our Services</h2>
                <p>We offer a complete expiry management platform that includes real-time expiry tracking, automated alert notifications, smart promotional suggestions, and multi-location inventory support.</p>
              </div>
            </div>
          </div>



        <Footer />
    </div>
  )
}

export default About