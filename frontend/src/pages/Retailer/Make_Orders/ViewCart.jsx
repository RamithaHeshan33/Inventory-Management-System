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

        console.log("Cart response:", data);

        if (res.ok) {
          setCartItems(data.cartItems || []);
        } else {
          alert(data.message || 'Failed to fetch cart');
        }
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

  // 🧮 Calculate grand total
  const grandTotal = cartItems.reduce((total, item) => {
    return total + item.quantity * item.productId.price;
  }, 0);

  return (
    <div>
      <Dashboard role="retailer" />
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
                {cartItems.map((item) => (
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
                        <p className="card-text">Quantity: {item.quantity}</p>
                        <p className="card-text">Total: Rs. {item.quantity * item.productId.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 💰 Grand Total */}
              <div className="mt-5 text-end">
                <h4 className="fw-bold">Grand Total: Rs. {grandTotal}</h4>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCart;
