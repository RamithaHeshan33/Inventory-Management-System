import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({email: '', password: '', role: ''});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/login', formData);
            navigate('/dashboard');
            localStorage.setItem('token', response.data.token);
        }
        catch(error) {
            setMessage(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className='login-page d-flex justify-content-center align-items-center vh-100'>
            <div className='login-container d-flex gap-5 justify-content-center align-items-center border border-2 rounded-3 shadow-lg p-5'>
                <div className="left">
                    <img src="res/login.png" alt="login" className="login-image " />
                </div>

                <div className="right w-50">
                    <h1 className='text-center'>Welcome Back</h1>
                    <p className='text-danger'>{message}</p>
                    <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
                        <select name="role" onChange={handleChange} required className='form-select'>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="warehouse">Warehouse</option>
                            <option value="marketing">Marketing</option>
                            <option value="retailer">Retailer</option>
                        </select>
                        <input name="email" type="email" placeholder="Email" className='form-control' onChange={handleChange} required />
                        <input name="password" type="password" placeholder="Password" className='form-control' onChange={handleChange} required />
                        <button type="submit" className='btn btn-primary'>Login</button>
                        <p className='text-center mt-3'>Don't have an account? <a href="/register">Register</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
