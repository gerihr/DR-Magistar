package com.app.dto;

import com.app.model.model.Event;
import lombok.Data;

@Data
public class UserEventSetDTO {
    private Long userId;
    private Long eventId;

}
