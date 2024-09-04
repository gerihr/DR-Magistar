package com.app.model.model;
import com.app.model.entitites.User;

import javax.persistence.*;

@Entity
@Table(name = "user_events")
public class UserEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    public UserEvent(){}

    public UserEvent(long id, User user, Event event) {
        this.id = id;
        this.user = user;
        this.event = event;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser(User user) {
        return this.user;
    }

    public void setUser(User user) {
       this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
