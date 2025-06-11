import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../../components/Dashboard/RetailerDashTemp';

function ViewCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('user'))?.userId;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:5000/cart/get/${userId}`);
        const data = await res.json();
        if (res.ok) setCartItems(data.cartItems || []);
        else alert(data.message || 'Failed to fetch cart');
      } catch (err) {
        console.error('Error fetching cart:', err);
        alert('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchCart();
    else navigate('/login');
  }, [userId, navigate]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = parseInt(newQuantity);
    setCartItems(updatedItems);
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await fetch(`http://localhost:5000/cart/update/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId, quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert('Quantity updated');
    } catch (err) {
      console.error(err);
      alert('Error updating quantity');
    }
  };

  const removeItem = async (productId) => {
    if (!window.confirm('Are you sure you want to remove this item?')) return;
    try {
      const res = await fetch(`http://localhost:5000/cart/delete/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCartItems(cartItems.filter((item) => item.productId._id !== productId));
      alert('Item removed');
    } catch (err) {
      console.error(err);
      alert('Error removing item');
    }
  };

  const grandTotal = cartItems.reduce((total, item) => {
    return total + item.quantity * item.productId.price;
  }, 0);

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
        <div className="container mt-5">
          <h1 className="text-2xl font-bold text-center mb-4">Your Cart</h1>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : cartItems.length === 0 ? (
            
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {cartItems.map((item, index) => (
                  <div key={item._id} className="col">
                    <div className="card h-100">
                      <img
                        src={`http://localhost:5000/${item.productId.image.replace(/\\/g, '/')}`}
                        className="card-img-top"
                        alt={item.productId.name}
                        style={{ objectFit: 'cover', height: '200px' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.productId.name}</h5>
                        <p className="card-text">Price: Rs. {item.productId.price}</p>
                        <p className="card-text">
                          Quantity:
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                            className="form-control mt-1"
                          />
                        </p>
                        <p className="card-text">Total: Rs. {item.quantity * item.productId.price}</p>
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => updateQuantity(item.productId._id, item.quantity)}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => removeItem(item.productId._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 text-end">
                <h4 className="fw-bold">Grand Total: Rs. {grandTotal}</h4>
                <button className='btn btn-primary'>Proceed</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCart;
