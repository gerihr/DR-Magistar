package com.app.dto;

import com.app.model.model.Event;
import lombok.Data;

@Data
public class UserEventDTO {
    private Long id;
    private UserDTO userId;
    private Event eventId;
}
