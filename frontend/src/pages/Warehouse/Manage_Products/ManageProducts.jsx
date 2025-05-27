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

  // Get industry from user token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setIndustryId(payload.industry);
    }
  }, []);

  // fetch categories for user's industry
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!industryId) return;
        const response = await axios.get(`http://localhost:5000/categories/byIndustry/${industryId}`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [industryId]);

  // fetch sub-categories
  useEffect(() => {
    const fetchSubCategories = async () => {
        setSubCategories([]); // Reset sub-categories when category changes
        try {
            if (!categoryId) return;
            const response = await axios.get(`http://localhost:5000/subcategories/byCategory/${categoryId}`);
            setSubCategories(response.data.subCategories);
        } catch (error) {
            console.error('Error fetching sub-categories:', error);
        }
    };
    fetchSubCategories();
  }, [categoryId]);

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
          <form className="w-1/2 flex flex-column gap-3">
            <div className="forms">
              <input type="text" className="form-control" name="productName" placeholder="Product Name" required />
              <input type="text" className="form-control" name="productDescription" placeholder="Product Description" required />
            </div>

            <div className="forms">
                <input type="number" className="form-control mt-2" name="productPrice" placeholder="Product Price" required />
                <select className="form-control mt-2" name="productCategory" required value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>

            </div>

            <div className="forms">
              <select className="form-control mt-2" name="productSubCategory" required disabled={!categoryId || subCategories.length === 0}>
                <option value="">Select Sub-Category</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
                ))}
              </select>
              <input type="file" className="form-control mt-2" name="productImage" />
            </div>

            <div className="forms">
              <input type="number" className="form-control mt-2" name="productStock" placeholder="Wholesale Stock" required />
              <input type="number" className="form-control mt-2" name="productQuantity" placeholder="Product Quantity" required />
            </div>

            <div className="forms">
              <input type="date" className="form-control mt-2 w-50" name="productExpireDate" placeholder="Expire Date" required />
            </div>

            <button type="submit" className="btn btn-primary mt-3">Add Product</button>
          </form>
        </div>

        <div className="product-list mt-3">
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>Stock</th>
                <th>Expire Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Add products dynamically here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;
