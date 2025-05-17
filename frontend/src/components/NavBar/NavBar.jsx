import React from 'react'
import { useNavigate } from 'react-router-dom'

function NavBar() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

  return (
    <div>
        <nav id="navbar-example2" className="navbar bg-body-tertiary px-5 mb-3">
        <a className="navbar-brand" href="#">ExpiryTrack</a>
        <ul className="nav nav-pills">
            <li className="nav-item">
                <a className="nav-link" href="#scrollspyHeading1">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#scrollspyHeading2">Features</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#scrollspyHeading2">About</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#scrollspyHeading2">User Roles</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#scrollspyHeading2">Contact</a>
            </li>
            <li className="nav-item">
                <button className='btn btn-primary' onClick={handleLogin}>Login</button>
            </li>

        </ul>
        </nav>
    </div>
  )
}

export default NavBar