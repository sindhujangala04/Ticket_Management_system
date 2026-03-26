import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [role, setRole] = useState("client");
  const navigate = useNavigate();

  const handleLogin = () => {

    if (role === "client") navigate("/client");
    else if (role === "technician") navigate("/technician");
    else if (role === "admin") navigate("/admin");
  };

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>Login</h1>

      <div style={cardStyle}>

        {/* ROLE SELECTION */}
        <select style={inputStyle} onChange={(e) => setRole(e.target.value)}>
          <option value="client">Client</option>
          <option value="technician">Technician</option>
          <option value="admin">Admin</option>
        </select>

        <br/><br/>

        {/* LOGIN FIELDS */}
        <input style={inputStyle} placeholder="ID" /><br/><br/>
        <input style={inputStyle} type="password" placeholder="Password" /><br/><br/>

        <button style={btnStyle} onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;



/* 🎨 STYLES */

const containerStyle = {
  textAlign: "center",
  height: "100vh",
  backgroundColor: "#e6f7ff",
  paddingTop: "60px"
};

const titleStyle = {
  fontSize: "36px",
  marginBottom: "20px",
  color: "#333"
};

const cardStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  display: "inline-block",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)"
};

const inputStyle = {
  fontSize: "16px",
  padding: "10px",
  width: "250px",
  borderRadius: "5px",
  border: "1px solid gray"
};

const btnStyle = {
  fontSize: "18px",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};