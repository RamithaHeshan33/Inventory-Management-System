import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../pages/Login/Login.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    profilePicture: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      await axios.post('http://localhost:5000/users/register', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100 px-3">
      <div className="register-container container border border-2 rounded-4 shadow-lg p-4">
        <div className="row align-items-center flex-column flex-md-row">
          {/* Image */}
          <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
            <img src="res/register.png" alt="register" className="img-fluid login-image" />
          </div>

          {/* Form */}
          <div className="col-12 col-md-6">
            <h2 className="text-center mb-3">Create an Account</h2>
            {error && <p className="text-danger text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="warehouse">Warehouse</option>
                <option value="marketing">Marketing</option>
                <option value="retailer">Retailer</option>
              </select>
              <input
                type="file"
                name="profilePicture"
                className="form-control"
                accept="image/*"
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>

            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
