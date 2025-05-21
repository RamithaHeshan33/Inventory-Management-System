import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'

function Roles() {
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
          <h1 className='fw-bold text-uppercase' style={{letterSpacing: '0.2rem'}}>User Roles</h1>
        </div>

        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner px-5">

            <div className="carousel-item active">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <img src="res/admin.png" className="login-image img-fluid d-block" alt="..." />
                </div>
                <div className="col-md-6 bg-body-tertiary border border-1 rounded-2 fs-5 mb-5" style={{textAlign: 'justify'}}>
                  <h2>👤 Admin</h2>
                  <p>Responsibilities:</p>
                  <ul>
                    <li>Manage user accounts (create, edit, or deactivate)</li>
                    <li>Configure system-wide settings (alert timings, expiry rules)</li>
                    <li>Monitor activity logs and performance analytics</li>
                    <li>Oversee all warehouse and retailer operations</li>
                    <li>Maintain system integrity and security</li>
                  </ul>

                  <p>Access:</p>
                  <ul>
                    <li>Full access to all features and modules</li>
                    <li>Can manage and view all warehouses and retailers</li>
                  </ul>
                </div>
              </div>
            </div>


            <div className="carousel-item">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <img src="res/warehouse.png" className="login-image img-fluid d-block" alt="..." />
                </div>
                <div className="col-md-6 bg-body-tertiary border border-1 rounded-2 fs-5 mb-5" style={{textAlign: 'justify'}}>
                  <h2>🏬 WareHouse</h2>
                  <p>Responsibilities:</p>
                  <ul>
                    <li>Add and update inventory batches with expiry dates</li>
                    <li>Monitor stock levels and prioritize expiring items</li>
                    <li>Receive alerts for soon-to-expire stock</li>
                    <li>Coordinate with retailers to move expiring products</li>
                  </ul>

                  <p>Access:</p>
                  <ul>
                    <li>Access to stock entry, expiry tracking, and alert features</li>
                    <li>View-only access to relevant dashboards and reports</li>
                    <li>Cannot manage retailer sales data</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <img src="res/retailer.png" className="login-image img-fluid d-block" alt="..." />
                </div>
                <div className="col-md-6 bg-body-tertiary border border-1 rounded-2 fs-5 mb-5" style={{textAlign: 'justify'}}>
                  <h2>🛒 Retailer</h2>
                  <p>Responsibilities:</p>
                  <ul>
                    <li>View inventory provided by the warehouse</li>
                    <li>Monitor expiry dates for retail stock</li>
                    <li>Respond to promotional suggestions</li>
                    <li>Sell or discount aging products based on alerts</li>
                  </ul>

                  <p>Access:</p>
                  <ul>
                    <li>Can view and manage only assigned stock</li>
                    <li>Access to promotional tools and expiry notifications</li>
                    <li>Limited dashboard visibility (own store only)</li>
                  </ul>
                </div>
              </div>
            </div>

            
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <Footer />
    </div>
  )
}

export default Roles