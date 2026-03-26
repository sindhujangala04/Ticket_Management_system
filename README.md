🎫 Support Ticket Management System
A full-stack support ticketing application designed to streamline communication between Clients, Admins, and Technicians. The system allows clients to raise issues, admins to assign experts based on domain, and technicians to provide real-time status updates.

🚀 Features
👤 Client Portal
Raise Tickets: Create support requests with specific domains (Hardware, Software, Networking, etc.).

Track Progress: View live status updates (e.g., ASSIGNED, INPROGRESS) provided by the technician.

Resolved History: View final solutions once approved by the Admin.

🛠️ Technician Portal
Task Management: View a personalized list of assigned tickets.

Live Updates: Update ticket status to INPROGRESS or NOT_RESOLVED to keep the client informed.

Resolution: Submit final solutions (sol) and report back to the Admin.

🔑 Admin Portal
Smart Assignment: Filter and assign technicians based on their specific expertise/domain.

Global Monitoring: Track the status of every ticket in the system from a single dashboard.

Final Approval: Review technician solutions before "Reporting to Client" to ensure quality.

💻 Tech Stack
Frontend:

React.js

Axios (API Integration)

React Router (Navigation)

Backend:

Java 17+

Spring Boot (REST API)

Spring Data JPA

Hibernate

MySQL/PostgreSQL

⚙️ Installation & Setup
1. Backend (Spring Boot)
Navigate to the backend folder.

Update src/main/resources/application.properties with your database credentials.

Run the application using your IDE or Maven:

Bash
mvn spring-boot:run
2. Frontend (React)
Navigate to the frontend folder.

Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
