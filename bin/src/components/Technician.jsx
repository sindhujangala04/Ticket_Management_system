import { useNavigate } from "react-router-dom";

function Technician() {

  const navigate = useNavigate();

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>Technician</h1>

      <div style={cardStyle}>

        <button style={btnStyle} onClick={() => navigate("/assigned")}>
          View Assigned Tickets
        </button>

      </div>

    </div>
  );
}

export default Technician;


/* 🎨 STYLES */
const containerStyle = {
  textAlign: "center",
  height: "100vh",
  backgroundColor: "#ede7f6",
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
  backgroundColor: "#673ab7",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};