import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-4 py-3 shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">ExpiryTrack</a>

        {/* Hamburger Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu Items */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-center gap-2">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link' to="/features">Features</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link' to="/about"> About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/roles">User Roles</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary ms-lg-3" onClick={handleLogin}>Login</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
