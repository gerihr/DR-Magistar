package com.app.repository;

import com.app.model.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    @Query(value = "select c.event_number from event.event as c order by c.id desc limit 1", nativeQuery = true)
    long findLastEventNumber();

    List<Event> findAll();
    List<Event> findByCategory( String category);
    List<Event> findByType( String type);
    List<Event> findByOrganiserId( String organiserId);

    @Transactional
    @Modifying
    @Query(value="UPDATE events.event SET passed = true WHERE date < :date", nativeQuery = true)
    void checkPassedEvents(@Param("date") Date date);

}
