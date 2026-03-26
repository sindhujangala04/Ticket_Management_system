import { useNavigate } from "react-router-dom";

function Admin() {

  const navigate = useNavigate();

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>Admin</h1>

      <div style={cardStyle}>

        <button style={btnStyle} onClick={() => navigate("/alltickets")}>
          View All Tickets
        </button>

      </div>

    </div>
  );
}

export default Admin;


/* 🎨 STYLES */
const containerStyle = {
  textAlign: "center",
  height: "100vh",
  backgroundColor: "#fff3e0",
  paddingTop: "60px"
};

const titleStyle = {
  fontSize: "36px"
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
  backgroundColor: "#ff9800",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};