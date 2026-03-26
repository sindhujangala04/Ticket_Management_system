import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState('client');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    domain: 'Hardware'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      let payload = {};
      let endpoint = "";

      if (role === 'client') {
        endpoint = "/client/register";
        payload = {
          cusername: formData.username,
          cemail: formData.email,
          cpassword: formData.password
        };
      } else {
        endpoint = "/technician/register";
        payload = {
          techusername: formData.username,
          techemail: formData.email,
          techpassword: formData.password,
          domain: formData.domain // change to techdomain if backend needs
        };
      }

      console.log("Sending payload:", payload);

      const response = await api.post(endpoint, payload);

      if (response.status === 200 || response.status === 201) {
        alert("Registration Successful!");
        navigate('/login');
      }

    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Server Error";

      console.error("Full Error:", err);
      alert("Registration Failed: " + errorMessage);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Create Account</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>Register as: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="client">Client</option>
          <option value="technician">Technician</option>
        </select>
      </div>

      <form onSubmit={handleRegister} style={formStyle}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {role === 'technician' && (
          <div style={{ marginTop: '10px' }}>
            <label>Domain: </label>
            <select
              name="domain"
              onChange={handleChange}
              style={inputStyle}
              value={formData.domain}
            >
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Network">Network</option>
            </select>
          </div>
        )}

        <button type="submit" style={btnStyle}>
          Register
        </button>
      </form>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '400px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const inputStyle = {
  margin: '10px 0',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const btnStyle = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  marginTop: '10px'
};

export default Register;