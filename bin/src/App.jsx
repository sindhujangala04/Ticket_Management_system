import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Client from "./components/Client";
import Admin from "./components/Admin";
import Technician from "./components/Technician";
import Register from "./components/Register";
import AssignedTickets from "./components/AssignedTickets";
import AllTickets from "./components/AllTickets";
import RaiseTicket from "./components/RaiseTicket";
import ViewTickets from "./components/ViewTickets";
function App() {
  return (
	    <BrowserRouter>
		        <Route path="/" element={<Home />} />
		        <Route path="/login" element={<Login />} />
		        {/* dashboards */}
		        <Route path="/client" element={<Client />} />
		        <Route path="/admin" element={<Admin />} />
		        <Route path="/technician" element={<Technician />} />
	      <Routes>
	        <Route path="/" element={<Home />} />
	        <Route path="/login" element={<Login />} />

	        {/* CLIENT FLOW */}
	        <Route path="/client" element={<Client />} />
	        <Route path="/raise" element={<RaiseTicket />} />
	        <Route path="/view" element={<ViewTickets />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/client" element={<Client />} />
        <Route path="/technician" element={<Technician />} />
        <Route path="/admin" element={<Admin />} />
		<Route path="/technician" element={<Technician />} />
		<Route path="/assigned" element={<AssignedTickets />} />
		<Route path="/admin" element={<Admin />} />
		<Route path="/alltickets" element={<AllTickets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;