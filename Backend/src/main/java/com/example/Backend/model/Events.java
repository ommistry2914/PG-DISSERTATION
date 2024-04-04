package com.example.Backend.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Events {
    @Id
    private String id;
    private String studentId;
    private String event;
    private Date from;
    private Date to;
    private String description;
    private Boolean completionStatus;
    private Boolean notify;
}
