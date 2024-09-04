package com.app.model.mapper;


import com.app.dto.UserEventDTO;
import com.app.model.model.UserEvent;
import org.mapstruct.Mapper;

@Mapper
public interface UserEventMapper {
    UserEvent userEventDTOToUserEvent(UserEventDTO userEventDTO);

    UserEventDTO userEventToUserEventDTO(UserEvent userEvent);
}
