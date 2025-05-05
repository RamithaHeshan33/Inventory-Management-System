import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        <div className='register-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleChange} required/>
                <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required/>
                <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required/>
                <select name="role" id="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="marketing">Marketing</option>
                    <option value="retailer">Retailer</option>
                </select>
                <input type="file" name="profilePicture" onChange={handleChange} />
                <button type='submit'>Register</button>
            </form>
            {error && <p className='error'>{error}</p>}
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register;