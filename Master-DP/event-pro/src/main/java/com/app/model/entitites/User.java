package com.app.model.entitites;

import com.app.model.model.Ticket;
import com.app.model.model.UserEvent;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private  String password;

    private String city;

    private String type;

    @Column(name = "session_token")
    private String sessionToken;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Ticket> tickets;

    public User(Long id) {
        this.id = id;
    }
}
