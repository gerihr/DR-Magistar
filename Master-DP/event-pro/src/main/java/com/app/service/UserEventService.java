package com.app.service;

import com.app.dto.UserEventDTO;
import com.app.dto.UserEventSetDTO;
import com.app.model.entitites.User;
import com.app.model.model.Event;
import com.app.model.model.UserEvent;
import com.app.repository.EventRepository;
import com.app.repository.UserEventRepository;
import com.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserEventService {

    @Autowired
    private UserEventRepository userEventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getSavedEvents(Long userId) {
        return userEventRepository.findByUser_id(userId)
                .stream()
                .map(UserEvent::getEvent)
                .collect(Collectors.toList());
    }
//
//    public List<User> getUsersWhoSaved(Long eventId) {
//        return userEventRepository.findByUser_id(eventId)
//                .stream()
//                .map(UserEvent::getUser)
//                .collect(Collectors.toList());
//    }
//
//    public void saveEvent(Long userId, Long eventId) {
//        UserEvent userEvent = new UserEvent(userId, eventId);
//        userEventRepository.save(userEvent);
//    }
//
public void getUserEventByUserIdAndEventId(Long userId, Long eventId) {
    Optional<UserEvent> foundEvent = userEventRepository.findByUser_idAndEvent_id(userId, eventId);
    userEventRepository.deleteById(foundEvent.get().getId());
}

    public void saveEvent(UserEventSetDTO userEventDTO) {
        User user = new User(userEventDTO.getUserId());
        Event event = new Event(userEventDTO.getEventId());
        UserEvent userEvent = new UserEvent();

        userEvent.setEvent(event);
        userEvent.setUser(user);

        userEventRepository.save(userEvent);
    }

    @Scheduled(cron = "0 12 * * * *", zone = "Europe/Sofia")
    public void checkPassedEvents () throws ParseException {
        Date date = new Date();
        this.eventRepository.checkPassedEvents(date);
    }
}
