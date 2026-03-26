import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('client'); // 'client', 'technician', or 'admin'
  const [creds, setCreds] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    
    let endpoint = "";
    let payload = {};

    if (role === 'admin') {
      endpoint = "/admin/login";
      // Admin uses standard 'email' and 'password' keys as per your AdminController Map
      payload = { 
        email: creds.email, 
        password: creds.password 
      };
    } else if (role === 'client') {
      endpoint = "/client/login";
      payload = { 
        cemail: creds.email, 
        cpassword: creds.password 
      };
    } else if (role === 'technician') {
      endpoint = "/technician/login";
      payload = { 
        techemail: creds.email, 
        techpassword: creds.password 
      };
    }

    try {
      const response = await api.post(endpoint, payload);
      alert(response.data);
      localStorage.setItem("userRole", role);
      navigate(`/${role}-dashboard`);
    } catch (err) {
      alert("Login Failed: " + (err.response?.data || "Invalid Credentials"));
    }
  };
  
  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Ticket System Login</h2>
      
      <div style={roleSelectorStyle}>
        <label>Login as: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)} style={selectStyle}>
          <option value="client">Client</option>
          <option value="technician">Technician</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <form onSubmit={handleLogin} style={formStyle}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
        
        <button type="submit" style={btnStyle}>
          Login to {role.charAt(0).toUpperCase() + role.slice(1)} Portal
        </button>
      </form>

      {role !== 'admin' && (
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      )}
    </div>
  );
};

// Styles to keep it clean
const containerStyle = { maxWidth: '400px', margin: '80px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' };
const roleSelectorStyle = { marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const selectStyle = { padding: '5px', borderRadius: '4px' };
const formStyle = { display: 'flex', flexDirection: 'column' };
const inputStyle = { marginBottom: '15px', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' };
const btnStyle = { padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };

export default Login;