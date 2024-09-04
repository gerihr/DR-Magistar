package com.app.model.mapper;

import com.app.dto.CategoryDTO;
import com.app.dto.TicketDTO;
import com.app.dto.TicketSetDTO;
import com.app.dto.UserDTO;
import com.app.model.entitites.User;
import com.app.model.model.Category;
import com.app.model.model.Event;
import com.app.model.model.Ticket;
import com.app.repository.EventRepository;
import com.app.repository.TicketRepository;
import com.app.repository.TypeRepository;
import com.app.repository.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class TicketUserMapper {
    private  final TicketRepository ticketRepository;
    private EventRepository eventRepository;
    private UserRepository userRepository;

    public TicketUserMapper(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public Ticket setTicketInfo(TicketSetDTO ticketSetDTO, long eventId){
        Ticket ticket = new Ticket();
        ticket.setEvent(ticketSetDTO.getEvent_id());
        ticket.setUser(new User(ticketSetDTO.getUser_id()));
        return ticket;


//        Category category = new Category();
//        category.setCategory(categoryDTO.getCategory());
//        category.setTypeList(typeRepository.findByCategory_id(typeId));
//        return category;
    }


}