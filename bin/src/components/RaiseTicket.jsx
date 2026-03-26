import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RaiseTicket() {

  const [issue, setIssue] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {

    const ticket = {
      issue: issue,
      description: desc,
      status: "Pending"
    };

    // Save to localStorage
    let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));

    alert("Ticket Raised Successfully!");

    navigate("/view");
  };

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>Raise Ticket</h1>

      <div style={cardStyle}>

        <input
          style={inputStyle}
          placeholder="Issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />

        <br/><br/>

        <textarea
          style={textAreaStyle}
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <br/><br/>

        <button style={btnStyle} onClick={handleSubmit}>
          Submit
        </button>

      </div>

    </div>
  );
}

export default RaiseTicket;


/* 🎨 STYLES */
const containerStyle = {
  textAlign: "center",
  height: "100vh",
  backgroundColor: "#fffde7",
  paddingTop: "60px"
};

const titleStyle = { fontSize: "32px" };

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
  width: "250px"
};

const textAreaStyle = {
  fontSize: "16px",
  padding: "10px",
  width: "250px",
  height: "100px"
};

const btnStyle = {
  fontSize: "18px",
  padding: "10px 20px",
  backgroundColor: "#ff5722",
  color: "white",
  border: "none",
  borderRadius: "5px"
};