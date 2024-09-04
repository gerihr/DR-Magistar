package com.app.conroller;

import com.app.dto.UserEventDTO;
import com.app.dto.UserEventSetDTO;
import com.app.model.model.Event;
import com.app.repository.UserEventRepository;
import com.app.service.UserEventService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.app.configuration.WebPath.API_VERSION_1;

@RestController
@RequestMapping(API_VERSION_1)
@CrossOrigin(origins = "localhost:4200")
@Tag(name = "User event operations", description = "Basic CRUD operations related to userEvents")
public class UserEventController {

    @Autowired
    UserEventRepository userEventRepository;

    @Autowired
    UserEventService userEventService;

    @Autowired
    public UserEventController(UserEventService userEventService) {
        this.userEventService = userEventService;
    }

    // get all claims
    @GetMapping("/get-saved-events/user-id/{id}")
    public ResponseEntity getSavedEventsReq(@PathVariable Long id){
        try {
           List<Event> listEvents = userEventService.getSavedEvents(id);
            return  ResponseEntity.ok().body(listEvents);
        }
        catch (Error error){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Нещо се обърка. Моля опитайте отново");
        }
    }

    @PostMapping("/save-event")
    public ResponseEntity saveUserEvent (@RequestBody UserEventSetDTO userEventDTO) throws ParseException {
        try {
            userEventService.saveEvent(userEventDTO);

            Map<String, Object> response = new HashMap<>();
            response.put("message","Успешно запазихте събитие");

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Нещо се обърка. Моля опитайте отново");
        }

    }

    @DeleteMapping("/remove-event")
    public ResponseEntity removeEvent (@RequestParam(value = "eventId", required = true) Long eventId,
                                        @RequestParam(value = "userId", required = true) Long userId) {
        userEventService.getUserEventByUserIdAndEventId(userId, eventId);


        Map<String, Object> response = new HashMap<>();
        response.put("message","Усешно премахнахте събитието");

        return ResponseEntity.ok().body(response);

    }
}
