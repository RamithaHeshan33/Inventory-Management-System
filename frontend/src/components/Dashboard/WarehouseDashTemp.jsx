import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function WarehouseDashTemp() {
    const [openMenu, setOpenMenu] = useState(null);
        const [userName, setUserName] = useState('');
        const navigate = useNavigate();

        useEffect(() => {
                const token = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');
        
                if (!token || !storedUser) {
                    navigate('/login');
                } else {
                    const user = JSON.parse(storedUser);
                    setUserName(user.name);
                }
            }, [navigate]);
        
            const handleLogout = () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            };
        
            const toggleSubMenu = (menu) => {
                setOpenMenu(openMenu === menu ? null : menu);
            };

  return (
    <div>
        <div className="side-bar border border-2" style={{ width: "20%", height: "100vh", position: "fixed", top: 0, left: 0 }}>
                <h2 className="text-center mb-3">Welcome {userName}</h2>
                <ul className="list-group">
                    
                    <li className="list-group-item nav-link-light"><Link to="/admin/dashboard" className='text-decoration-none text-light nav-link-light'>Dashboard</Link></li>
                    
                    <li className="list-group-item text-light nav-link-light">
                        <div onClick={() => toggleSubMenu("products")} style={{ cursor: "pointer" }}>
                            Products {openMenu === "products" ? "▾" : "▸"}
                        </div>
                        {openMenu === "products" && (
                            <ul className="list-group mt-2">
                                <li className="list-group-item p-1">
                                    <Link to="/warehouse/manage_products" className="nav-link-light" style={{ padding: '0.2rem' }}>Manage Products</Link>
                                </li>
                                <li className="list-group-item p-1">
                                    <Link to="/warehouse/products/add" className="nav-link-light" style={{ padding: '0.2rem' }}>Add Products</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    
                    <li className="list-group-item nav-link-light"><Link to="/admin/settings" className='text-decoration-none text-light nav-link-light'>TEST</Link></li>
                    
                    <li className="list-group-item nav-link-light"><Link to="/admin/reports" className='text-decoration-none text-light nav-link-light'>TEST</Link></li>
                </ul>
            </div>

            <div className="d-flex justify-content-end mt-2">
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
    </div>
  )
}

export default WarehouseDashTemp