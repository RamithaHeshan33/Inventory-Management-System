import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

// Before login
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import Features from './pages/Features/Features';
import About from './pages/About/About';
import Roles from './pages/Roles/Roles';
import Contact from './pages/Contact/Contact';

// Dashboard pages
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import WarehouseDashboard from './pages/Warehouse/Dashboard/WarehouseDashboard';

// Admin pages
import ManageProducts from './pages/Admin/Manage_Products/ManageProducts';


// Warehouse pages
import WareHouseManageProducts from './pages/Warehouse/Manage_Products/ManageProducts';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/roles" element={<Roles />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/warehouse/dashboard" element={<WarehouseDashboard />} />

        <Route path="/admin/manage_products" element={<ManageProducts />} />

        
        <Route path="/warehouse/manage_products" element={<WareHouseManageProducts />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
