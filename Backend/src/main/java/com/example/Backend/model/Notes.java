package com.example.Backend.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "notes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notes {
    @Id
    private String id;
    private String studentId;
    private Date date;
    private String notes;
    private Boolean completionStatus;

}
