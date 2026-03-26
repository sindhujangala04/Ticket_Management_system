import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axiosConfig';

const TechnicianDashboard = () => {
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // State for the update form
  const [report, setReport] = useState({
    status: 'INPROGRESS',
    sol: ''
  });

  // Fetch tickets assigned to the logged-in technician
  const fetchAssignedTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/technician/viewTickets');
      setAssignedTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { 
    fetchAssignedTickets(); 
  }, [fetchAssignedTickets]);

  // Handle the form submission (Update Progress or Resolve)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Matches your Java: @PostMapping("/report/{tid}")
      // Sends the 'report' object containing {status, sol}
      await api.post(`/technician/report/${selectedTicket.tid}`, report);
      
      const successMsg = report.status === 'RESOLVED' 
        ? "Ticket Moved to Resolved! Admin will approve." 
        : `Status Updated to ${report.status}!`;
      
      alert(successMsg);
      setShowResolveModal(false);
      
      // CRITICAL: Refresh the table so "ASSIGNED" becomes "INPROGRESS" immediately
      fetchAssignedTickets(); 
    } catch (err) {
      console.error("Sync Error:", err.response?.data);
      alert("Failed to sync data: " + (err.response?.data || "Server Error"));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#333' }}>Technician Portal</h2>
        <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
      </header>

      <h3>My Assigned Tasks</h3>
      {loading && <p style={{ color: '#007bff' }}>Updating status...</p>}
      
      <table border="1" width="100%" style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ padding: '12px' }}>Ticket ID</th>
            <th>Issue Title</th>
            <th>Domain</th>
            <th>Current Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignedTickets.length > 0 ? assignedTickets.map(t => (
            <tr key={t.tid}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{t.tid}</td>
              <td>{t.issuetitle}</td>
              <td>{t.domain}</td>
              <td style={{ textAlign: 'center' }}>
                <span style={{ 
                  fontWeight: 'bold', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  backgroundColor: t.status === 'RESOLVED' ? '#d4edda' : '#e7f5ff',
                  color: t.status === 'RESOLVED' ? '#155724' : '#007bff'
                }}>
                  {t.status}
                </span>
              </td>
              <td style={{ textAlign: 'center' }}>
                <button 
                  onClick={() => { 
                    setSelectedTicket(t); 
                    // Automatically set dropdown to current status or default to INPROGRESS
                    setReport({ status: t.status === 'ASSIGNED' ? 'INPROGRESS' : t.status, sol: '' }); 
                    setShowResolveModal(true); 
                  }}
                  style={actionBtnStyle}
                >
                  Update / Resolve
                </button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No active assignments.</td></tr>
          )}
        </tbody>
      </table>

      {/* MODAL FOR UPDATING STATUS */}
      {showResolveModal && selectedTicket && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h3 style={{ marginTop: 0 }}>Update Ticket #{selectedTicket.tid}</h3>
            <p><strong>Issue:</strong> {selectedTicket.issuetitle}</p>
            <hr />
            
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ fontWeight: 'bold' }}>Update Status:</label>
                <select 
                  value={report.status}
                  onChange={(e) => setReport({...report, status: e.target.value})}
                  style={inputStyle}
                >
                  <option value="INPROGRESS">In Progress</option>
                  <option value="NOT_RESOLVED">Not Resolved</option>
                  <option value="RESOLVED">Resolved (Complete)</option>
                </select>
              </div>

              <div>
                <label style={{ fontWeight: 'bold' }}>Progress Notes / Solution:</label>
                <textarea 
                  placeholder="What have you done so far?"
                  value={report.sol}
                  onChange={(e) => setReport({...report, sol: e.target.value})}
                  style={{ ...inputStyle, height: '100px', resize: 'none' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {/* DYNAMIC BUTTON */}
                <button 
                  type="submit" 
                  style={{ 
                    ...btnStyle, 
                    backgroundColor: report.status === 'RESOLVED' ? '#28a745' : '#17a2b8' 
                  }}
                >
                  {report.status === 'RESOLVED' ? "REPORT TO ADMIN" : "UPDATE PROGRESS"}
                </button>

                <button 
                  type="button" 
                  onClick={() => setShowResolveModal(false)} 
                  style={{ ...btnStyle, backgroundColor: '#6c757d' }}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- STYLES ---
const tableStyle = { borderCollapse: 'collapse', marginTop: '10px', textAlign: 'left', borderRadius: '8px', overflow: 'hidden' };
const logoutBtnStyle = { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const actionBtnStyle = { backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' };
const modalOverlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContent = { backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' };
const inputStyle = { padding: '12px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '5px' };
const btnStyle = { padding: '12px', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', flex: 1, fontWeight: 'bold', textTransform: 'uppercase' };

export default TechnicianDashboard;