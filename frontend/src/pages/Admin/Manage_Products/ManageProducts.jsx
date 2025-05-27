import React from 'react'
import Dashboard from '../../../components/Dashboard/AdminDashTemp'
import '../../../CSS/ManageProducts.css'
import '../../../CSS/Dashboards.css'
import '../../../CSS/Home.css'

function ManageProducts() {
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
                <div className='forms'>
                    <input type="text" className="form-control" name="productName" placeholder="Product Name" required/>
                    <input type="text" className="form-control" name="productDescription" placeholder="Product Description" required/>
                </div>

                <div className="forms">
                    <input type="number" className="form-control mt-2" name="productPrice" placeholder="Product Price" required/>
                    <select className="form-control mt-2" name="productCategory" required>
                        <option value="">Select Category</option>
                        {/* Add categories dynamically here */}
                    </select>
                </div>

                <div className="forms">
                    <select className="form-control mt-2" name="productSubCategory" required>
                        <option value="">Select Sub-Category</option>
                        {/* Add sub-categories dynamically here */}
                    </select>
                    <input type="file" className="form-control mt-2" name="productImage" />
                </div>

                <div className="forms">
                    <input type="number" className="form-control mt-2" name="productStock" placeholder="Wholesale Stock" required/>
                    <input type="number" className="form-control mt-2" name="productQuantity" placeholder="Product Quantity" required/>
                </div>

                <div className="forms">
                    <input type="date" className="form-control mt-2 w-50" name="productExpireDate" placeholder="Expire Date" required/>
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
  )
}

export default ManageProducts