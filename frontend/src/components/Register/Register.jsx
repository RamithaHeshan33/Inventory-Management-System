import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Login/Login.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({name: "", email: "", password: "", role: "", profilePicture: ""});
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/users/register", formData);
            console.log(response.data);
            navigate("/login");
        }
        catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <div className='register-page d-flex justify-content-center align-items-center vh-100'>
            <div className='register-container d-flex gap-5 justify-content-center align-items-center border border-2 rounded-3 shadow-lg p-5'>
                <div className='left w-50'>
                    <img src="res/register.png" alt="register" className="login-image" />
                </div>

                <div className='right w-50'>
                    <h1 className='text-center'>Create an Account</h1>
                    {error && <p className='error' style={{color: 'green'}}>{error}</p>}
                    <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
                        <input type="text" name="name" placeholder='Name' className='form-control' value={formData.name} onChange={handleChange} required/>
                        <input type="email" name="email" placeholder='Email' className='form-control' value={formData.email} onChange={handleChange} required/>
                        <input type="password" name="password" placeholder='Password' className='form-control' value={formData.password} onChange={handleChange} required/>
                        <select name="role" id="role" value={formData.role} onChange={handleChange} required className='form-select'>
                        <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="warehouse">Warehouse</option>
                            <option value="marketing">Marketing</option>
                            <option value="retailer">Retailer</option>
                        </select>
                        <input type="file" name="profilePicture" onChange={handleChange} className='form-control' />
                        <button type='submit' className='btn btn-primary'>Register</button>
                    </form>
                    <p className='text-center mt-3'>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
        
    )
}

export default Register;