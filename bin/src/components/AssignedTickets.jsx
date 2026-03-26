import { useState } from "react";

function AssignedTickets() {

  const [ setStatus] = useState("");

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>Assigned Tickets</h1>

      <div style={cardStyle}>

        <p><b>Issue:</b> Printer Not Working</p>

        <textarea style={textAreaStyle} placeholder="Enter Solution"></textarea>

        <br/><br/>

        <select style={inputStyle} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="inprogress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <br/><br/>

        <button style={btnStyle}>Update</button>

      </div>

    </div>
  );
}

export default AssignedTickets;


/* 🎨 STYLES */
const containerStyle = {
  textAlign: "center",
  height: "100vh",
  backgroundColor: "#f3e5f5",
  paddingTop: "60px"
};

const titleStyle = {
  fontSize: "32px"
};

const cardStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  display: "inline-block",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)"
};

const textAreaStyle = {
  width: "250px",
  height: "100px",
  padding: "10px"
};

const inputStyle = {
  padding: "10px",
  width: "250px"
};

const btnStyle = {
  fontSize: "16px",
  padding: "10px 20px",
  backgroundColor: "#9c27b0",
  color: "white",
  border: "none",
  borderRadius: "5px"
};