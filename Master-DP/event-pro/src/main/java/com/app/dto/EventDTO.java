package com.app.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;

@Data
public class EventDTO {

    private Long id;

    private String header;

    private String category;

    private String type;

    private String location;

    private Date date;

    private String time;

    private String description;

    private String price;

    private byte[] image;

    private String organiserId;

    private String longitude;

    private String latitude;

    private String address;

    private Boolean passed;

    private ArrayList<Object> comments;

    private long ticketsInStock;

}
