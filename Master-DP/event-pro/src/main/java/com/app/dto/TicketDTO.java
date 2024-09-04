package com.app.dto;

import com.app.model.entitites.User;
import com.app.model.model.Event;
import com.app.model.model.Type;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class TicketDTO {
    private Long id;
    private Long event_id;
    private UserTicketDTO userData;
    private Date date;
}
