package com.app.conroller;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Array;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.app.exception.ResourceNotFoundException;
import com.app.model.model.Event;
import com.app.repository.EventRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.app.configuration.WebPath.API_VERSION_1;
@RestController
@RequestMapping(API_VERSION_1)
@CrossOrigin(origins = "localhost:4200")
@Tag(name = "Event operations", description = "Basic CRUD operations related to events")

public class EventController {

    @Autowired
    EventRepository eventRepository;

    // get all claims
    @GetMapping("/events")
    public ResponseEntity getAllEvents(){
        try {
            List<Event> listClaims = eventRepository.findAll();
            return  ResponseEntity.ok().body(listClaims);
        }
        catch (Error error){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Нещо се обърка. Моля опитайте отново");
        }
    }

    @PostMapping("/new-event")
    public ResponseEntity<String> addEvent(@RequestBody Event event) {
        try {
            Event newEvent = eventRepository.save(event);
            String id = String.valueOf(newEvent.getId());
            return ResponseEntity.ok().body(id);
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Нещо се обърка. Моля опитайте отново");
        }
    }

    // update event rest api
    @PutMapping("/update-event/{id}")
    public ResponseEntity updateClaimStatus(@PathVariable Long id, @RequestBody Event eventDetails) {
        Event event = eventRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Event not exist with id :" + id));

        try {
                event.setCategory(eventDetails.getCategory());
                event.setType(eventDetails.getType());
                event.setHeader(eventDetails.getHeader());
                event.setDescription(eventDetails.getDescription());
                event.setImage(eventDetails.getImage());
                event.setLocation(eventDetails.getLocation());
                event.setTime(eventDetails.getTime());
                event.setPrice(eventDetails.getPrice());
                event.setDate(eventDetails.getDate());
                event.setTicketsInStock(eventDetails.getTicketsInStock());
                eventRepository.save(event);

            Map<String, Object> response = new HashMap<>();
            response.put("message","Данните бяха успешно обновени");

            return ResponseEntity.ok().body(response);
        }
        catch (Exception error){
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
    }

    @PutMapping("/add-comment/{id}")
    public ResponseEntity<?> addComment(@PathVariable Long id, @RequestBody Object comment) {
        Event event = eventRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Event not exist with id: " + id));

        try {
            ArrayList<Object> commentsList = event.getComments();
            if (commentsList == null) {
                commentsList = new ArrayList<>();
            }
            commentsList.add(comment);
            event.setComments(commentsList);
            eventRepository.save(event);


            Map<String, Object> response = new HashMap<>();
            response.put("message","Данните бяха успешно обновени");

            return ResponseEntity.ok().body(response);

        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
    }

    //get all events by category
    @GetMapping("/event/get-by-category/{category}")
    public ResponseEntity getEventsByCategory (@PathVariable String category) {
        try {
            return new ResponseEntity<>(eventRepository.findByCategory(category), HttpStatus.OK);
        }
        catch (Exception error){
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
    }

    //get all events by type
    @GetMapping("/event/get-by-type/{type}")
    public ResponseEntity getEventsByType (@PathVariable String type) {
        try {
            return new ResponseEntity<>(eventRepository.findByType(type), HttpStatus.OK);
        }
        catch (Exception error){
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
    }

    //get all events by organiserId
    @GetMapping("/event/get-by-organiser/{organiserId}")
    public ResponseEntity getEventsByOrganiserId (@PathVariable String organiserId) {
        try {
            return new ResponseEntity<>(eventRepository.findByOrganiserId(organiserId), HttpStatus.OK);
        }
        catch (Exception error){
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
    }

    // get event by id rest api
    @GetMapping("/event/{id}")
    public ResponseEntity getEventById(@PathVariable Long id) throws Exception {
        try{
            return new ResponseEntity<>(eventRepository.findById(id), HttpStatus.OK);
        }
        catch (Exception error){
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
    }

    // delete event by id rest api
    @DeleteMapping("/event/delete/{id}")
    public ResponseEntity deleteEventById(@PathVariable Long id) throws Exception {
        Event event = eventRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Event not exist with id :" + id));
        try{
            eventRepository.delete(event);

            Map<String, Object> response = new HashMap<>();
            response.put("message","Успешно изтрито събитие");

            return ResponseEntity.ok().body(response);
        }
        catch (Exception error){
            return ResponseEntity.badRequest().body("Нещо се обърка. Моля опитайте отново");
        }
    }

    @GetMapping("/get-coordinates/{text}")
    public ResponseEntity<String> getCoordinates(@PathVariable String text) throws IOException {
        String encodedText = URLEncoder.encode(text, StandardCharsets.UTF_8);

        URL url = new URL("https://api.geoapify.com/v1/geocode/search?text=" + encodedText + "&apiKey=b3770daf30b946629d67d90734fdc52c");
        HttpURLConnection http = (HttpURLConnection) url.openConnection();
        http.setRequestProperty("Accept", "application/json");

        BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream(), StandardCharsets.UTF_8));
        String inputLine;
        StringBuilder content = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }

        in.close();
        http.disconnect();

        return ResponseEntity.ok().body(content.toString());
    }


}
