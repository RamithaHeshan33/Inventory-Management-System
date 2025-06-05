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
  const [userProducts, setUserProducts] = useState([]);

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
    console.log('Loaded user from localStorage:', user);
    if (token && user) {
      setIndustryId(user.industry);
      setUserId(user.userId);
    }
  }, []);

  // Fetch categories based on industry
  useEffect(() => {
    if (!industryId) return;
    axios.get(`http://localhost:5000/categories/byIndustry/${industryId}`)
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error('Error fetching categories:', err));
  }, [industryId]);

  // Fetch sub-categories based on selected category
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

  useEffect(() => {
    const fetchUserProducts = async () => {
      const token = localStorage.getItem('token');
      if (!userId || !token) return;

      try {
        const response = await axios.get(`http://localhost:5000/products/getByUserId/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('API Response:', response.data);

        const products = Array.isArray(response.data)
          ? response.data
          : response.data.products;

        setUserProducts(products || []);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchUserProducts();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });
      data.append('userID', userId);

      await axios.post('http://localhost:5000/products/add', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Product added successfully!');
      window.location.reload();
      setFormData({
        _id: null,
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

        <div className="container mt-5">
          <h2 className="text-xl font-bold mb-4">Your Products</h2>
          {userProducts.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {userProducts.map(product => (
                <div key={product._id} className="col">
                  <div className="card h-100">
                  <img
                    src={product.image ? `http://localhost:5000/${product.image}` : '/res/default-product.png'}
                    className="card-img-top"
                    alt={product.name}
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <hr />
                      <p className="card-text"><strong>Price:</strong> Rs.{product.price}</p>
                      <p className="card-text"><strong>Category:</strong> {product.category?.name || product.category || 'N/A'}</p>
                      <p className="card-text"><strong>Sub-Category:</strong> {product.subCategory?.name || product.subCategory || 'N/A'}</p>
                      <p className="card-text"><strong>Stock:</strong> {product.wholesaleStock}</p>
                      <p className="card-text"><strong>Quantity:</strong> {product.quantity}</p>
                      <p className="card-text"><strong>Expire Date:</strong> {product.expireDate ? new Date(product.expireDate).toLocaleDateString() : 'N/A'}</p>

                     <div className='d-flex gap-2'>
                        {/* <!-- Button trigger modal --> */}
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#updateModal-${product._id}`}>
                          Update
                        </button>

                        {/* <!-- Modal --> */}
                        <div className="modal fade" id={`updateModal-${product._id}`} tabIndex="-1" aria-labelledby={`updateModalLabel-${product._id}`}  aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id={`updateModalLabel-${product._id}`}>Update Products - {product.name}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <form
                                  onSubmit={async (e) => {
                                    e.preventDefault();
                                    const token = localStorage.getItem('token');
                                    const formElements = e.target.elements;

                                    const data = new FormData();
                                    data.append('name', formElements.name.value);
                                    data.append('description', formElements.description.value);
                                    data.append('price', formElements.price.value);
                                    data.append('wholesaleStock', formElements.wholesaleStock.value);
                                    data.append('quantity', formElements.quantity.value);
                                    data.append('expireDate', formElements.expireDate.value);
                                    data.append('category', formElements.category.value);
                                    data.append('subCategory', formElements.subCategory.value);

                                    if (formElements.image.files[0]) {
                                      data.append('image', formElements.image.files[0]);
                                    }

                                    try {
                                      await axios.put(`http://localhost:5000/products/update/${product._id}`, data, {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                          'Content-Type': 'multipart/form-data'
                                        }
                                      });
                                      alert('Product updated successfully!');
                                      window.location.reload();
                                    } catch (error) {
                                      console.error('Error updating product:', error);
                                      alert('Failed to update product.');
                                    }
                                  }}

                                >
                                  <div className="mb-2">
                                    <label className='form-label'>Product Name</label>
                                    <input className="form-control" name="name" defaultValue={product.name} required />
                                  </div>
                                  <div className="mb-2">
                                    <label className='form-label'>Product Description</label>
                                    <textarea className="form-control" name="description" defaultValue={product.description} required />
                                  </div>
                                  <div className="mb-2">
                                    <label className='form-label'>Product Price</label>
                                    <input type="number" className="form-control" name="price" defaultValue={product.price} required />
                                  </div>
                                  <div className="mb-2">
                                    <label className='form-label'>Wholesale Stock Number</label>
                                    <input type="number" className="form-control" name="wholesaleStock" defaultValue={product.wholesaleStock} required />
                                  </div>
                                  <div className="mb-2">
                                    <label className='form-label'>Quantity</label>
                                    <input type="number" className="form-control" name="quantity" defaultValue={product.quantity} required />
                                  </div>
                                  <div className="mb-2">
                                    <label className='form-label'>Expire Date</label>
                                    <input type="date" className="form-control" name="expireDate" defaultValue={product.expireDate?.split('T')[0]} required />
                                  </div>
                                  <div className="mb-2">
                                    <label className='form-label'>Category</label>
                                    <select className="form-control" name="category" defaultValue={product.category?._id || product.category} onChange={handleChange} required>
                                      <option value="">Select Category</option>
                                      {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="mb-2">
                                    <label className='form-label'>Sub-Category</label>
                                    <select
                                      className="form-control mt-2"
                                      name="subCategory"
                                      defaultValue={product.subCategory?._id || product.subCategory || ''}
                                      required
                                    >
                                      <option value="">Select Sub-Category</option>
                                      {subCategories.map((subCat) => (
                                        <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
                                      ))}
                                    </select>

                                  </div>
                                  <div className="mb-2">
                                    <label className='form-label'>Product Image</label>
                                    <input type="file" className="form-control" name="image" />
                                  </div>

                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                      Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                      Save Changes
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Delete Modal */}
                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#deleteModal-${product._id}`}>
                          Delete
                        </button>

                        <div className="modal fade" id={`deleteModal-${product._id}`} tabIndex="-1" aria-labelledby={`deleteModalLabel-${product._id}`} aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id={`deleteModalLabel-${product._id}`}>Delete Product</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                Are you sure you want to delete this product?
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger"
                                  onClick={async () => {
                                    const token = localStorage.getItem('token');
                                    try {
                                      await axios.delete(`http://localhost:5000/products/delete/${product._id}`, {
                                        headers: {
                                          Authorization: `Bearer ${token}`
                                        }
                                      });
                                      alert('Product deleted successfully!');
                                      window.location.reload();
                                    } catch (error) {
                                      console.error('Error deleting product:', error);
                                      alert('Failed to delete product.');
                                    }
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No products found.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default ManageProducts;
