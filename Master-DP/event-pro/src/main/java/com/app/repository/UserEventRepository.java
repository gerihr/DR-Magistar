package com.app.repository;
import com.app.model.model.UserEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserEventRepository extends JpaRepository<UserEvent, Long> {

    List<UserEvent> findByUser_id(Long userId);

    Optional<UserEvent> findByUser_idAndEvent_id( Long userId,  Long eventId);

}
