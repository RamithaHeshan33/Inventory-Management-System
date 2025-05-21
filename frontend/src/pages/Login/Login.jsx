import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/login', formData);
      const token = response.data.token;
  
      // Decode token payload (just for routing based on role)
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Store token and user
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(payload));

      const role = payload.role;
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'warehouse') {
        navigate('/warehouse/dashboard');
      } else if (role === 'retailer') {
        navigate('/retailer/dashboard');
      } else {
        navigate('/login');
      }

    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center vh-100 px-3">
      <div className="login-container container border border-2 rounded-4 shadow-lg p-4">
        <div className="row align-items-center flex-column flex-md-row">
          {/* Image Section */}
          <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
            <img src="res/login.png" alt="login" className="img-fluid login-image" />
          </div>

          {/* Form Section */}
          <div className="col-12 col-md-6">
            <h2 className="text-center mb-3">Welcome Back</h2>
            <p className="text-danger text-center">{message}</p>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <select
                name="role"
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
                name="email"
                type="email"
                placeholder="Email"
                className="form-control"
                onChange={handleChange}
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="form-control"
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn btn-primary w-100">Login</button>
              <p className="text-center mt-2">
                Don't have an account? <a href="/register">Register</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
