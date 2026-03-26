import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const ClientDashboard = () => {
  const [tickets, setTickets] = useState({ pendingTickets: [], resolvedTickets: [] });
  const [newTicket, setNewTicket] = useState({ issuetitle: '', description: '', domain: 'Hardware' });

  // 1. Fetch My Tickets (Calls getMyTickets in ClientService)
  const fetchMyTickets = async () => {
    try {
      const res = await api.get('/client/myTickets');
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    }
  };

  useEffect(() => { fetchMyTickets(); }, []);

  // 2. Raise a New Ticket (Calls raiseTicket in ClientService)
  const handleRaiseTicket = async (e) => {
    e.preventDefault();
    try {
      await api.post('/client/raiseTicket', newTicket);
      alert("Ticket Raised Successfully!");
      setNewTicket({ issuetitle: '', description: '', domain: 'Hardware' }); // Reset form
      fetchMyTickets(); // Refresh the list
    } catch (err) {
      alert("Error raising ticket");
    }
  };

  // 3. Logout Logic
  const handleLogout = async () => {
    try {
      await api.post('/client/logout');
      window.location.href = "/login"; // Redirect to login page
    } catch (err) {
      console.error("Logout failed");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={handleLogout} style={{ float: 'right', color: 'red' }}>Logout</button>
      <h2>Client Dashboard</h2>

      {/* Raise Ticket Form */}
      <section style={sectionStyle}>
        <h3>Raise a New Ticket</h3>
        <form onSubmit={handleRaiseTicket}>
          <input 
            type="text" placeholder="Issue Title" required
            value={newTicket.issuetitle}
            onChange={(e) => setNewTicket({...newTicket, issuetitle: e.target.value})}
          /><br/>
          <textarea 
            placeholder="Description" required
            value={newTicket.description}
            onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
          /><br/>
          <select 
            value={newTicket.domain}
            onChange={(e) => setNewTicket({...newTicket, domain: e.target.value})}
          >
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Network">Network</option>
          </select><br/>
          <button type="submit">Submit Ticket</button>
        </form>
      </section>

      <hr />

      {/* My Tickets Lists */}
	  <div style={{ display: 'flex', gap: '20px' }}>

	    {/* Pending Tickets Table */}
	    <div style={{ flex: 1 }}>
	      <h3>Pending Tickets</h3>
	      <table border="1" width="100%" cellPadding="8">
	        <thead>
	          <tr>
	            <th>ID</th>
	            <th>Issue Title</th>
	            <th>Description</th>
	            <th>Status</th>
	          </tr>
	        </thead>
	        <tbody>
	          {tickets.pendingTickets.length > 0 ? (
	            tickets.pendingTickets.map(t => (
	              <tr key={t.tid}>
	                <td>{t.tid}</td>
	                <td>{t.issuetitle}</td>
	                <td>{t.description}</td>
	                <td>{t.status}</td>
	              </tr>
	            ))
	          ) : (
	            <tr>
	              <td colSpan="4" align="center">No Pending Tickets</td>
	            </tr>
	          )}
	        </tbody>
	      </table>
	    </div>

	    {/* Resolved Tickets Table */}
	    <div style={{ flex: 1 }}>
	      <h3>Resolved Tickets</h3>
	      <table border="1" width="100%" cellPadding="8">
	        <thead>
	          <tr>
	            <th>ID</th>
	            <th>Issue Title</th>
	            <th>Solution</th>
	          </tr>
	        </thead>
	        <tbody>
	          {tickets.resolvedTickets.length > 0 ? (
	            tickets.resolvedTickets.map(t => (
	              <tr key={t.tid}>
	                <td>{t.tid}</td>
	                <td>{t.issuetitle}</td>
	                <td>{t.sol}</td>
	              </tr>
	            ))
	          ) : (
	            <tr>
	              <td colSpan="3" align="center">No Resolved Tickets</td>
	            </tr>
	          )}
	        </tbody>
	      </table>
	    </div>     
      </div>
    </div>
  );
};

const sectionStyle = { border: '1px solid #ccc', padding: '15px', marginBottom: '20px' };
const cardStyle = { border: '1px solid orange', padding: '10px', margin: '5px 0' };
const resolvedCardStyle = { border: '1px solid green', padding: '10px', margin: '5px 0' };

export default ClientDashboard;