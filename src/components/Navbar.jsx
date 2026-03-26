import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole"); // 'client', 'technician', or 'admin'

  const handleLogout = async () => {
    try {
      // Calls the dynamic endpoint based on who is logged in
      // e.g., /client/logout, /technician/logout, or /admin/logout
      await api.post(`/${role}/logout`);
      
      // Clear local storage and redirect
      localStorage.clear();
      alert("Logged out successfully");
      navigate('/login');
    } catch (err) {
      console.error("Logout failed", err);
      // Fallback: clear storage and redirect anyway if session is already expired
      localStorage.clear();
      navigate('/login');
    }
  };

  // Don't show Navbar on login or register pages
  if (!role) return null;

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        <Link to={`/${role}-dashboard`} style={linkStyle}>TicketSystem</Link>
      </div>
      
      <div style={menuStyle}>
        <span style={{ marginRight: '20px' }}>Role: <strong>{role.toUpperCase()}</strong></span>
        <button onClick={handleLogout} style={logoutBtnStyle}>
          Logout
        </button>
      </div>
    </nav>
  );
};

// Basic Styling
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 30px', backgroundColor: '#333', color: 'white', marginBottom: '20px' };
const logoStyle = { fontSize: '1.5rem', fontWeight: 'bold' };
const menuStyle = { display: 'flex', alignItems: 'center' };
const linkStyle = { color: 'white', textDecoration: 'none' };
const logoutBtnStyle = { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };

export default Navbar;
