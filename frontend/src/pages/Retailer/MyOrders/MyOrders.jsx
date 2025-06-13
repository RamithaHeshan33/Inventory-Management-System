import React, {useState, useEffect} from 'react'
import Dashboard from '../Dashboard/RetailerDashboard'

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user'))?.userId;

    useEffect(() => {
        const fetchOrders = async() => {
            try {
                const response = await fetch(`http://localhost:5000/orders/retailer/${userId}`);
                if(!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data.orders);
            }
            catch(error) {
                console.log("Error fetching orders:", error);
            }
        }
        fetchOrders();
    }, [userId]);

  return (
    <div>
        <Dashboard role="retailer" />
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
            <h1 className='text-2xl fw-bold text-center'>My Orders</h1>
            {orders.length === 0 ? (
                <div className="alert alert-info text-center" role="alert">
                    No orders found.
                </div>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="card mb-4">
                        <div className="card-header d-flex">
                            <div className="left w-100">
                                <h5>Order ID: {order._id}</h5>
                            </div>
                            <div className="right w-100 text-end">
                                <p>Status: {order.status}</p>
                            </div>
                        </div>
                        <div className="card-body">
                            <h3>Products:</h3>
                            {order.products.map((product, index) => {
                                const isLast = index === order.products.length - 1;
                                return (
                                    <div key={product._id || index} className="mb-3">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={`http://localhost:5000/${product.productId?.image.replace(/\\/g, '/')}`}
                                                className="img-fluid me-3 rounded"
                                                style={{ width: '150px', height: '100px' }}
                                                alt={product.productId?.name}
                                            />
                                            <div>
                                                <p className="mb-1"><strong>{product.productId?.name}</strong></p>
                                                <p className="mb-0">Quantity: {product.quantity}</p>
                                            </div>
                                            <p className="ms-auto mb-0">Price: Rs. {product.productId?.price}</p>
                                            <p className="ms-auto mb-0">Expire Date: {new Date(product.productId?.expireDate).toLocaleDateString()}</p>
                                        </div>
                                        {!isLast && <hr className="my-3" />}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="card-footer d-flex">
                            <div className="left w-25">
                                <p>Ordered Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="right w-100 text-end">
                                <p>Total Amount: Rs. {order.totalAmount}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}

        </div>

    </div>
  )
}

export default MyOrders