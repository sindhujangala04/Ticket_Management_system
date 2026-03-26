package com.example.Ticket.Raising.Backendd.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Ticket.Raising.Backendd.Repo.AfterTicketRepo;
import com.example.Ticket.Raising.Backendd.Repo.BeforeTicketRepo;
import com.example.Ticket.Raising.Backendd.Repo.TechnicianRepo;
import com.example.Ticket.Raising.Backendd.model.AfterTicket;
import com.example.Ticket.Raising.Backendd.model.BeforeTicket;
import com.example.Ticket.Raising.Backendd.model.Technician;
@Service
public class AdminService {

    @Autowired private BeforeTicketRepo beforeTicketRepo;
    @Autowired private AfterTicketRepo afterTicketRepo;
    @Autowired private TechnicianRepo techRepo;

    
    public ResponseEntity<?> getTechsByDomain(String domain) {
        List<Technician> techs = techRepo.findByDomain(domain);
        if (techs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No technicians found for domain: " + domain);
        }
        return ResponseEntity.ok(techs);
    }


    public ResponseEntity<?> assignTechnician(Integer tid, Integer techId) {
        Optional<BeforeTicket> ticketOpt = beforeTicketRepo.findById(tid);
        Optional<Technician> techOpt = techRepo.findById(techId);

        if (ticketOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket not found");
        }
        if (techOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Technician not found");
        }

        BeforeTicket ticket = ticketOpt.get();
        Technician assigned = techOpt.get();

       
        ticket.setAssignedTechId(assigned.getTechid());
        ticket.setStatus("ASSIGNED");
        beforeTicketRepo.save(ticket);
        
        return ResponseEntity.ok("Ticket #" + tid + " assigned to " + assigned.getTechusername());
    }

    public ResponseEntity<?> getRaisedTickets() {
        return ResponseEntity.ok(beforeTicketRepo.findByAssignedTechIdIsNull());
    }

    public ResponseEntity<?> viewAllTickets() {
        Map<String, Object> result = new HashMap<>();
        result.put("activeTickets", beforeTicketRepo.findAll());
        result.put("resolvedTickets", afterTicketRepo.findAll());
        return ResponseEntity.ok(result);
    }

    public ResponseEntity<?> respondToClient(Integer atid) {
        Optional<AfterTicket> opt = afterTicketRepo.findById(atid);
        if (opt.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket not found");

        AfterTicket at = opt.get();
        at.setSentToClient(true);
        afterTicketRepo.save(at);
        return ResponseEntity.ok("Response sent to client successfully");
    }
}