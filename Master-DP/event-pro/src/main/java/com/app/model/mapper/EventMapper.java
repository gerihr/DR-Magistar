package com.app.model.mapper;
import com.app.dto.EventDTO;
import com.app.model.model.Event;


import org.mapstruct.Mapper;

@Mapper
public interface EventMapper {

    Event eventDTOToEvent (EventDTO eventDTO);
    EventDTO eventToEventDTO(Event event);
}
