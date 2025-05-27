import React from 'react'
import Dashboard from '../../../components/Dashboard/AdminDashTemp'
import '../../../CSS/Home.css'

function AdminDashboard() {
  return (
    <div>
        <Dashboard role="admin"/>
        <video
            autoPlay
            loop
            muted
            className="video-background"
        >
            <source src="/res/background.mp4" type="video/mp4" />
        </video>
    </div>
  )
}

export default AdminDashboard