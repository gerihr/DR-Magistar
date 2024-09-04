package com.app.conroller;

import com.app.exception.UserAuthenticationException;
import com.app.helpers.HelperService;
import com.app.model.entitites.User;
import com.app.repository.UserRepository;
import com.app.service.EmailSenderService;
import com.app.service.UserService;
import com.app.swagger.SwaggerErrorResponses;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import static com.app.configuration.WebPath.API_VERSION_1;
import static com.app.configuration.WebPath.PATH_USERS;

@RestController
@RequestMapping(API_VERSION_1)
@CrossOrigin(origins = "localhost:4200")
@Tag(name = "User operations", description = "Basic CRUD operations related to users")
public class UserController {

    private final UserService userService;

    @Autowired
    private EmailSenderService senderService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, EmailSenderService senderService, UserRepository userRepository) {
        this.userService = userService;
        this.senderService = senderService;
        this.userRepository=userRepository;
    }

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ObjectNode emailAndPasswordInJson) {
        try {
            String password = emailAndPasswordInJson.get("password").asText();
            String email = emailAndPasswordInJson.get("email").asText();

            // Call service to handle login
            User user = userService.loginUser(password, email);

            // Return successful login response with user object and status 200 OK
            return ResponseEntity.ok(user);

        } catch (UserAuthenticationException e) {
            // Return a BAD_REQUEST (400) with error message in body
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @PostMapping("/register")
    public ResponseEntity createUser(@RequestBody ObjectNode userDataInJson) {
        try {
            String name = userDataInJson.get("name").asText();
            String email = userDataInJson.get("email").asText();
            String password = userDataInJson.get("password").asText();
            String hashedPassword = userService.hashPassword(password);
            String city = userDataInJson.get("city").asText();
            String type = userDataInJson.get("type").asText();

            if (name == null || email == null || password == null || city == null || type == null) {
                return new ResponseEntity<>("Невалидни данни! Моля проверете", HttpStatus.BAD_REQUEST);
            }

            if(userRepository.findByEmail(email) != null) {
                return new ResponseEntity<>("Имейлът е вече използван. Моля, използвайте друг имейл!", HttpStatus.BAD_REQUEST);
            }

            User newUser = new User();
            newUser.setName(name);
            newUser.setEmail(email);
            newUser.setPassword(hashedPassword);
            newUser.setCity(city);
            newUser.setType(type);
            newUser.setSessionToken(HelperService.generateNewToken());

            userRepository.save(newUser);

            return new ResponseEntity<>(newUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-admins")
    public List<User> getAdmins(){
        List<User> allUsers = (List<User>) userRepository.findAll();
        Predicate<User> onlyAdmins = user -> user.getType().equals("admin");


        var result = allUsers.stream().filter(onlyAdmins)
                .collect(Collectors.toList());

        return result;
    }

    @PostMapping("/new-admin")
    public ResponseEntity newAdmin (@RequestBody ObjectNode emailAndPasswordInJson) {
        return userService.createAdmin(emailAndPasswordInJson);
    }

    @PostMapping("/delete-admin")
    public ResponseEntity deleteAdmin (@RequestBody Long id) {
         userRepository.deleteById(id);
         return ResponseEntity.ok().body("Админа беше успешно премахнат");
    }

    @PutMapping("/logout")
    public ResponseEntity logout(@RequestHeader("session-token") String sessionToken) {
        return userService.logOutUser(sessionToken);
    }

    @GetMapping(PATH_USERS)
    @Operation(summary = "Retrieves all users")
    @SwaggerErrorResponses
    public Iterable<User> retrieveFutureDevices() {
        return userService.retrieveAllUsers();
    }
}
