import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../../components/Dashboard/RetailerDashTemp'

function MakeOrder() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart] = useState([]);
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('user'))?.userId;

  // fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/getAll');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = async (product) => {
    const quantityStr = prompt(`Enter quantity for ${product.name}:`, '1');
    const quantity = parseInt(quantityStr);
  
    if (!quantityStr || isNaN(quantity) || quantity <= 0) {
      alert("Invalid quantity");
      return;
    }
  
    if (!userId) {
      alert("User not logged in");
      return;
    }
  
    try {
      const res = await fetch('http://localhost:5000/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: product._id, quantity })
      });
  
      const data = await res.json();
      if (res.ok) {
        alert(`${product.name} added to cart`);
      } else {
        alert(data.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };
  

  // Filter products based on searchTerm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-2xl font-bold text-center mt-8">Make Orders</h1>

        <button className="btn btn-success mt-4" onClick={() => navigate('/retailer/view_cart', { state: { cart } })}>
          View Cart
        </button>
        {/* Search Bar */}
        <input type="text" className="form-control" placeholder='Search Products' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  />

        <div className="mt-4 row row-cols-1 row-cols-md-3 g-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="col">
              <div className="card h-100">
                <img
                  src={`http://localhost:5000/${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <hr />
                  <p className="card-text">Price: Rs. {product.price}</p>
                  <p className="card-text">Available Quantity: {product.quantity}</p>
                  <p className="card-text">Size: {product.size}</p>
                  <p className="card-text">
                    Expire Date:{' '}
                    {product.expireDate
                      ? new Date(product.expireDate).toLocaleDateString()
                      : 'N/A'}
                  </p>
                  <button className="btn btn-primary w-100" onClick={() => addToCart(product)}>
                    Add to Order
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MakeOrder