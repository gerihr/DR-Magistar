package com.app.repository;

import com.app.conroller.TicketController;
import com.app.model.model.Person;
import com.app.model.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findAll();

    List<Ticket> findByEvent(long eventId);

}
