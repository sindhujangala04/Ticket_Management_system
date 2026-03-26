import { useNavigate } from "react-router-dom";

function Client() {

  const navigate = useNavigate();

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>Client</h1>

      <div style={cardStyle}>

        <button style={btnStyle} onClick={() => navigate("/raise")}>
          Raise Ticket
        </button>

        <br/><br/>

        <button style={btnStyle} onClick={() => navigate("/view")}>
          View Tickets
        </button>

      </div>

    </div>
  );
}

export default Client;

/* 🎨 STYLES */
const containerStyle = {
  textAlign: "center",
  height: "100vh",
  backgroundColor: "#e8f5e9",
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
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};