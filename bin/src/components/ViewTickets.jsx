import { useEffect, useState } from "react";

function ViewTickets() {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
  }, []);

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>My Tickets</h1>

      <div style={cardStyle}>

        <table border="1" style={{ margin: "auto" }}>

          <thead>
            <tr>
              <th>Issue</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t, index) => (
              <tr key={index}>
                <td>{t.issue}</td>
                <td>{t.description}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ViewTickets;


/* 🎨 STYLES */
const containerStyle = {
  textAlign: "center",
  height: "100vh",
  backgroundColor: "#e3f2fd",
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