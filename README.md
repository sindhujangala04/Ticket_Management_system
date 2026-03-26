Method,Endpoint,Description
GET,/admin/raisedTickets,Fetch all unassigned tickets
POST,/admin/assignTechnician/{tid}/{techId},Assign a tech to a ticket
GET,/technician/viewTickets,Get tickets for logged-in tech
POST,/technician/report/{tid},Update status or resolve ticket
GET,/client/viewMyTickets,View active and resolved tickets
