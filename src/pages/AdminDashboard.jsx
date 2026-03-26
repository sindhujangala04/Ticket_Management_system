import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [raisedTickets, setRaisedTickets] = useState([]); 
  const [allTickets, setAllTickets] = useState({ activeTickets: [], resolvedTickets: [] });
  const [availableTechs, setAvailableTechs] = useState([]); 
  const [selectedTicket, setSelectedTicket] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    try {
      const [resRaised, resAll] = await Promise.all([
        api.get('/admin/raisedTickets'), // Fixed endpoint name to match your Controller
        api.get('/admin/viewAllTickets') // Fixed endpoint name to match your Controller
      ]);
      setRaisedTickets(resRaised.data);
      setAllTickets(resAll.data);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAdminData(); }, [fetchAdminData]);

  const openAssignModal = async (ticket) => {
    setSelectedTicket(ticket);
    try {
      // Matches the new @GetMapping("/getTechniciansByDomain/{domain}")
      const res = await api.get(`/admin/getTechniciansByDomain/${ticket.domain}`);
      setAvailableTechs(res.data);
      setShowModal(true);
    } catch (err) {
      alert("Could not fetch technicians for this domain");
    }
  };

  // ONLY ONE DECLARATION OF confirmAssignment
  const confirmAssignment = async (techId) => {
    try {
      // Pattern: /admin/assignTechnician/TicketID/TechID
      await api.put(`/admin/assignTechnician/${selectedTicket.tid}/${techId}`);
      
      alert("Assigned Successfully!");
      setShowModal(false);
      fetchAdminData(); 
    } catch (err) {
      console.error(err);
      alert("Assignment failed. Check if tech and ticket IDs are correct.");
    }
  };

  const handleReportToClient = async (atid) => {
    try {
      await api.put(`/admin/respondToClient/${atid}`);
      alert("Solution reported to Client!");
      fetchAdminData();
    } catch (err) { alert("Reporting failed"); }
  };

  const handleLogout = async () => {
    try {
      await api.post('/admin/logout');
      localStorage.clear();
      navigate('/login');
    } catch (err) { 
      localStorage.clear(); 
      navigate('/login'); 
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Admin Portal</h2>
        <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
      </header>

      {loading && <p>Syncing system data...</p>}

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={sectionStyle}>
          <h3>Unassigned Tickets</h3>
          <table border="1" width="100%" style={tableStyle}>
            <thead>
              <tr><th>Issue</th><th>Domain</th><th>Action</th></tr>
            </thead>
            <tbody>
              {raisedTickets.map(t => (
                <tr key={t.tid}>
                  <td>{t.issuetitle}</td>
                  <td>{t.domain}</td>
                  <td><button onClick={() => openAssignModal(t)}>Assign Tech</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ ...sectionStyle, flex: 2 }}>
          <h3>Global Status</h3>
          <h4>Resolved & Ready to Report</h4>
          <table border="1" width="100%" style={tableStyle}>
            <thead>
              <tr><th>Issue</th><th>Tech ID</th><th>Action</th></tr>
            </thead>
            <tbody>
              {allTickets.resolvedTickets.map(at => (
                <tr key={at.tid}>
                  <td>{at.issuetitle}</td>
                  <td>{at.techId}</td>
                  <td>
                    {!at.sentToClient ? (
                      <button onClick={() => handleReportToClient(at.tid)}>Report to Client</button>
                    ) : <span>✅ Reported</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h3>Select Technician for {selectedTicket?.domain}</h3>
            <table border="1" width="100%" style={{ marginTop: '10px', textAlign: 'center' }}>
              <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                  <th>Tech ID</th>
                  <th>Name</th>
                  <th>Expertise</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availableTechs.map(tech => (
                  <tr key={tech.techid}>
                    <td>{tech.techid}</td>
                    <td>{tech.techusername}</td>
                    <td>{tech.domain}</td>
                    <td>
                      <button 
                        onClick={() => confirmAssignment(tech.techid)}
                        style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                      >
                        Select & Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setShowModal(false)} style={{ marginTop: '15px' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

const sectionStyle = { flex: 1, border: '1px solid #ddd', padding: '15px', borderRadius: '8px' };
const tableStyle = { borderCollapse: 'collapse', marginTop: '10px' };
const modalOverlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const modalContent = { backgroundColor: 'white', padding: '25px', borderRadius: '12px', width: '500px' };
const logoutBtnStyle = { backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' };

export default AdminDashboard;