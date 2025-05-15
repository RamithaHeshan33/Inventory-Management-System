import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <select name="role" onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="marketing">Marketing</option>
                    <option value="retailer">Retailer</option>
                </select>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default Login;
