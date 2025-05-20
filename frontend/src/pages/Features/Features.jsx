import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'

function Features() {
  return (
    <div>
        <NavBar />

          <div className="header text-center">
            <h1 className='text-center fw-bold mt-3 text-uppercase' style={{letterSpacing: '0.2rem'}}>Features</h1>
            <p>Explore the powerful tools built to help you manage inventory more efficiently and reduce product wastage.</p>
          </div>

          <div className="container bg-light-subtle p-4 rounded mb-5">
            <div className="row mt-5">
              <div className="col-md-4 text-center">
              <img src="res/track.png" alt="" className="w-75 d-block mx-auto" />
                <h2>🔍 Expiry Date Tracking</h2>
                <p>Track expiry dates for each product with detailed information, including batch or lot numbers. Stay updated on stock levels and shelf life, so you always know what needs attention.</p>
              </div>

              <div className="col-md-4 text-center">
                <img src="res/message.png" className="w-75 d-block mx-auto" alt="" />
                <h2>🔔 Automated Alerts</h2>
                <p>Receive automatic notifications when products are nearing their expiration. Alerts are sent to the right users—whether you're a warehouse manager or a retailer—so action can be taken before it’s too late.</p>
              </div>
              
              <div className="col-md-4 text-center">
                <img src="res/sale.png" className="w-75 d-block mx-auto" alt="" />
                <h2>💡 Promotional Suggestions</h2>
                <p>Boost sales of aging stock with smart promotional suggestions. The system recommends discounts, flash sales, or bundle deals for items close to expiry to help you clear inventory quickly and efficiently.</p>
              </div>

              <div className="col-md-4 text-center">
                <img src="res/dashboard.png" className="w-75 d-block mx-auto" alt="" />
                <h2>📊 Dashboard Overview</h2>
                <p>Get a complete visual snapshot of your inventory status. The dashboard provides timelines, charts, and filters that let you monitor expiring products by category, location, or time remaining.</p>
              </div>

              <div className="col-md-4 text-center">
                <img src="res/location.png" className="w-75 d-block mx-auto" alt="" />
                <h2>🌐 Multi-Location Support</h2>
                <p>Operate across multiple warehouses or retail stores? No problem. Our system supports synchronized expiry tracking across all your business locations with real-time updates and unified data.</p>
              </div>

              <div className="col-md-4 text-center">
                <img src="res/rules.png" className="w-75 d-block mx-auto" alt="" />
                <h2>⚙️ Customizable Rules</h2>
                <p>Every product is different. Set custom rules for when alerts should be triggered—for example, 30 days before expiry for medicines or 7 days for fresh produce. Tailor the system to match your specific business needs.</p>
              </div>
            </div>
          </div>

        <Footer />
    </div>
  )
}

export default Features