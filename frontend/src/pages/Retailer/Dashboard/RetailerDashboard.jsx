import React from 'react'
import Dashboard from '../../../components/Dashboard/RetailerDashTemp'

function RetailerDashboard() {
  return (
    <div>
        <Dashboard role="retailer" />
        <video
          autoPlay
          loop
          muted
          className="video-background"
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
        >
          <source src="/res/background.mp4" type="video/mp4" />
        </video>
    </div>
  )
}

export default RetailerDashboard