import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import './Home.css'

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
        Your browser does not support the video tag.
      </video>
      <NavBar />

      <div className='d-flex justify-content-center align-items-center'>
            <div className='login-container d-flex gap-5 justify-content-center align-items-center p-5'>
                <div className="left w-75">
                  <h1 style={{marginBottom: "40px"}}>Welcome to the ExpiryTrack</h1>
                  <p style={{textAlign: 'justify'}} className=' fs-4'>In today’s fast-paced retail and supply chain environment, managing perishable and time-sensitive inventory is critical to reducing waste and maximizing profitability. The Inventory Expiry Management System is designed to help warehouses and retailers track stock expiry dates with precision, receive timely alerts, and make proactive decisions to avoid losses. Whether you’re overseeing large-scale warehouse operations or managing shelves in a retail store, our system gives you real-time visibility into expiring products, helps you prioritize inventory rotation, and even suggests promotional offers to accelerate the sale of aging stock. </p>
                </div>

                <div className="right w-50">
                  <img src="res/Home.png" alt="login" className="login-image border border-2 rounded-3 shadow-lg " />
                </div>
            </div>
        </div>

      <Footer />
    </div>
  )
}

export default Home