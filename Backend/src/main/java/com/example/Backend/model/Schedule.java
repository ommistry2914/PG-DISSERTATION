package com.example.Backend.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "schedule")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Schedule {
    @Id
    private String id;
    private String userId;
    private Date date;
    private Date startTime;
    private Date endTime;
    private String event;
    private String notes;
    // Getters and setters
}