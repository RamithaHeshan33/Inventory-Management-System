import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '../../../components/Dashboard/WarehouseDashTemp';
import '../../../CSS/ManageProducts.css';
import '../../../CSS/Dashboards.css';
import '../../../CSS/Home.css';

function ManageProducts() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [industryId, setIndustryId] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subCategory: '',
    image: null,
    wholesaleStock: '',
    quantity: '',
    expireDate: ''
  });

  // Get industry and userId from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      setIndustryId(user.industry);
      setUserId(user._id);
    }
  }, []);

  useEffect(() => {
    if (!industryId) return;
    axios.get(`http://localhost:5000/categories/byIndustry/${industryId}`)
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error('Error fetching categories:', err));
  }, [industryId]);

  useEffect(() => {
    if (!categoryId) return;
    setSubCategories([]);
    axios.get(`http://localhost:5000/subcategories/byCategory/${categoryId}`)
      .then(res => setSubCategories(res.data.subCategories))
      .catch(err => console.error('Error fetching sub-categories:', err));
  }, [categoryId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
    if (name === 'category') setCategoryId(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });
      data.append('userID', userId); // send userID (can remove if backend uses token only)

      await axios.post('http://localhost:5000/products/add', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Product added successfully!');
      // Optionally reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        subCategory: '',
        image: null,
        wholesaleStock: '',
        quantity: '',
        expireDate: ''
      });
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product.');
    }
  };

  return (
    <div>
      <Dashboard role="admin" page="manage-products" />
      <video
        autoPlay
        loop
        muted
        className="video-background"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
      >
        <source src="/res/background.mp4" type="video/mp4" />
      </video>
      <div className="content">
        <h1 className="text-2xl font-bold text-center mt-8">Manage Products</h1>

        <div className="flex justify-center items-center mt-4">
          <form className="w-1/2 flex flex-column gap-3" onSubmit={handleSubmit}>
            <div className="forms">
              <input type="text" className="form-control" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
              <input type="text" className="form-control" name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} required />
            </div>

            <div className="forms">
              <input type="number" className="form-control mt-2" name="price" placeholder="Product Price" value={formData.price} onChange={handleChange} required />
              <select className="form-control mt-2" name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="forms">
              <select className="form-control mt-2" name="subCategory" value={formData.subCategory} onChange={handleChange} required disabled={!categoryId || subCategories.length === 0}>
                <option value="">Select Sub-Category</option>
                {subCategories.map((subCat) => (
                  <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
                ))}
              </select>
              <input type="file" className="form-control mt-2" name="image" onChange={handleChange} />
            </div>

            <div className="forms">
              <input type="number" className="form-control mt-2" name="wholesaleStock" placeholder="Wholesale Stock" value={formData.wholesaleStock} onChange={handleChange} required />
              <input type="number" className="form-control mt-2" name="quantity" placeholder="Product Quantity" value={formData.quantity} onChange={handleChange} required />
            </div>

            <div className="forms">
              <input type="date" className="form-control mt-2 w-50" name="expireDate" value={formData.expireDate} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn btn-primary mt-3">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;
