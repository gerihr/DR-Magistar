package com.app.conroller;

import com.app.dto.TicketDTO;
import com.app.dto.TicketSetDTO;
import com.app.model.entitites.User;
import com.app.model.model.Category;
import com.app.model.model.Event;
import com.app.model.model.Ticket;
import com.app.repository.EventRepository;
import com.app.repository.TicketRepository;
import com.app.repository.UserRepository;
import com.app.service.EmailSenderService;
import com.app.service.TicketService;
import com.app.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.app.configuration.WebPath.API_VERSION_1;

@RestController
@RequestMapping(API_VERSION_1)
@CrossOrigin(origins = "localhost:4200")
@Tag(name = "Ticket operations", description = "Basic CRUD operations related to tickets")
public class TicketController {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailSenderService senderService;

    @Autowired
    private TicketService ticketService;


    @GetMapping("/tickets")
    public List<TicketDTO> getAllTickets(){
        List<TicketDTO> allTickets = ticketService.getAllTickets();
        return allTickets;
    }

    @GetMapping("/tickets/byEvent")
    public List<TicketDTO> getTicketsByEventId(@RequestParam long event_id) {
        return ticketService.getTicketsByEventId(event_id);
    }

    @PostMapping("/check-ticket")
    public ResponseEntity<Object> checkTicket(@RequestBody TicketSetDTO ticketDTO) {
        try {
            Event event = eventRepository.findById(ticketDTO.getEvent_id())
                    .orElseThrow(() -> new RuntimeException("Event not found"));
            Long numberTicketsInStock = event.getTicketsInStock();

            if (numberTicketsInStock >= ticketDTO.getTicketNumber()) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Всичко е наред, моля продължете.");
                return ResponseEntity.ok().body(response);
            } else {
                return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Няма достатъчно билети");
            }

        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Нещо се обърка. Моля опитайте отново");
        }
    }

    @PutMapping("/buy-ticket")
    public ResponseEntity buyTicket(@RequestBody TicketSetDTO ticket) {
        try {
            Long numberTickets = ticket.getTicketNumber();
            Event event = eventRepository.findById(ticket.getEvent_id()).orElseThrow();
            event.setTicketsInStock(event.getTicketsInStock()-ticket.getTicketNumber());
            eventRepository.save(event);
            User user = userRepository.findById(ticket.getUser_id())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            System.out.print(numberTickets);

                while(numberTickets > 0){
                    Ticket newTicket = new Ticket();
                    newTicket.setEvent(ticket.getEvent_id());
                    newTicket.setUser(user);
                    Date currentDate = Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant());
                    newTicket.setDate(currentDate);
                    ticketRepository.save(newTicket);
                    senderService.sendEmail(user.getEmail(), newTicket.getId(), user.getName(), event );

                    numberTickets--;
                }


            Map<String, Object> response = new HashMap<>();
            response.put("message","Успешно закупени билети");

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Нещо се обърка. Моля опитайте отново");
        }
    }

}
