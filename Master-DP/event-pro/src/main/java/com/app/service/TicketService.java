package com.app.service;

import com.app.dto.TicketDTO;
import com.app.dto.UserTicketDTO;
import com.app.model.model.Ticket;
import com.app.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
// Assuming you have a Ticket entity and TicketDTO class
public class TicketService {

    // Assuming ticketRepository is injected and used to fetch tickets
    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<TicketDTO> getAllTickets() {
        List<Ticket> tickets = ticketRepository.findAll();

        return tickets.stream()
                .map(this::convertToTicketDTO)
                .collect(Collectors.toList());
    }

    public List<TicketDTO> getTicketsByEventId(long event_id) {
        List<Ticket> tickets = ticketRepository.findByEvent(event_id);

        return tickets.stream()
                .map(this::convertToTicketDTO)
                .collect(Collectors.toList());
    }

    private TicketDTO convertToTicketDTO(Ticket ticket) {
        TicketDTO ticketDTO = new TicketDTO();
        ticketDTO.setId(ticket.getId());
        ticketDTO.setEvent_id(ticket.getEvent());
        ticketDTO.setDate(ticket.getDate());

        UserTicketDTO userDTO = new UserTicketDTO();
        userDTO.setName(ticket.getUser().getName());
        userDTO.setEmail(ticket.getUser().getEmail());

        ticketDTO.setUserData(userDTO);

        return ticketDTO;
    }
}
