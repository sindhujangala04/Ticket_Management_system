import { useState } from "react";

function Register() {

  const [role, setRole] = useState("");

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>Register</h1>

      {/* STEP 1: Choose Role */}
      {role === "" && (
        <div style={cardStyle}>

          <button style={btnStyle} onClick={() => setRole("client")}>
            Register as Client
          </button>

          <br/><br/>

          <button style={btnStyle} onClick={() => setRole("technician")}>
            Register as Technician
          </button>

        </div>
      )}

      {/* STEP 2: CLIENT FORM */}
      {role === "client" && (
        <div style={cardStyle}>

          <h2 style={titleStyle}>Client Registration</h2>

          <input style={inputStyle} placeholder="Client Name" /><br/><br/>
          <input style={inputStyle} placeholder="Email" /><br/><br/>
          <input style={inputStyle} type="password" placeholder="Password" /><br/><br/>
          <input style={inputStyle} type="password" placeholder="Confirm Password" /><br/><br/>

          <button style={btnStyle}>Register</button>

        </div>
      )}

      {/* STEP 2: TECHNICIAN FORM */}
      {role === "technician" && (
        <div style={cardStyle}>

          <h2 style={titleStyle}>Technician Registration</h2>

          <input style={inputStyle} placeholder="Technician Name" /><br/><br/>
          <input style={inputStyle} placeholder="Email" /><br/><br/>
          <input style={inputStyle} type="password" placeholder="Password" /><br/><br/>
          <input style={inputStyle} placeholder="Domain" /><br/><br/>

          <button style={btnStyle}>Register</button>

        </div>
      )}

    </div>
  );
}

export default Register;



/* 🎨 STYLES */

const containerStyle = {
  textAlign: "center",
  height: "100vh",
  backgroundColor: "#fff5e6",
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
  backgroundColor: "#ff9800",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};