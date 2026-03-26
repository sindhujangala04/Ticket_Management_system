import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>Ticket Raising System</h1>


      <div style={cardStyle}>

        

        <button style={btnStyle} onClick={() => navigate("/register")}>
          Register
        </button>

        <br/><br/>

        <button style={btnStyle} onClick={() => navigate("/login")}>
          Login
        </button>

      </div>

    </div>
  );
}

export default Home;



/* 🎨 STYLES */

const containerStyle = {
  textAlign: "center",
  height: "100vh",
  backgroundColor: "#f0f8ff",
  paddingTop: "80px"
};

const titleStyle = {
  fontSize: "40px",
  color: "#333",
  marginBottom: "30px"
};

const cardStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  display: "inline-block",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)"
};

const btnStyle = {
  fontSize: "18px",
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};