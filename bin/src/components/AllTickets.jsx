function AllTickets() {

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>All Tickets</h1>

      <div style={cardStyle}>

        <table border="1" style={{margin:"auto"}}>

          <tr>
            <th>Issue</th>
            <th>Assign Technician</th>
          </tr>

          <tr>
            <td>Printer Issue</td>
            <td>
              <select>
                <option>Select</option>
                <option>Tech 1</option>
                <option>Tech 2</option>
              </select>
            </td>
          </tr>

        </table>

      </div>

    </div>
  );
}

export default AllTickets;


/* 🎨 STYLES */
const containerStyle = {
  textAlign: "center",
  height: "100vh",
  backgroundColor: "#ffe0b2",
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