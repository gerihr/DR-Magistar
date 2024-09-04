package com.app.model.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "event")
@Data

public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "header")
    private String header;

    @Column(name = "category")
    private String category;

    @Column(name = "type")
    private String type;

    @Column(name = "location")
    private String location;

    @Column(name = "date")
    private Date date;

    @Column(name = "time")
    private String time;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private String price;

    @Column(name="image")
    private byte[] image;

    @Column(name = "organiser_id")
    private  String organiserId;

    @Column(name="longitude")
    private String longitude;

    @Column(name="latitude")
    private String latitude;

    @Column(name="address")
    private String address;

    @Column(name="passed")
    private Boolean passed;

    @Column(name="comments")
    private ArrayList comments;

    @Column (name = "ticketsInStock")
    private long ticketsInStock;



    public Event() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getOrganiserId() {
        return organiserId;
    }

    public void setOrganiserId(String organiserId) {
        this.organiserId = organiserId;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean getPassed() {
        return passed;
    }

    public void setPassed(Boolean passed) {
        this.passed = passed;
    }

    public ArrayList getComments() {
        return comments;
    }

    public void setComments(ArrayList comments) {
        this.comments = comments;
    }

    public Event(long id, String header, String category, String type, String location, Date date, String time, String description, String price, byte[] image, String organiserId, String longitude, String latitude, String address, Boolean passed, ArrayList comments) {
        this.id = id;
        this.header = header;
        this.category = category;
        this.type = type;
        this.location = location;
        this.date = date;
        this.time = time;
        this.description = description;
        this.price = price;
        this.image = image;
        this.organiserId = organiserId;
        this.longitude = longitude;
        this.latitude = latitude;
        this.address = address;
        this.passed = passed;
        this.comments = comments;
    }

    public Event(long id) {
        this.id = id;
    }
}
