package com.example.Backend.model;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "submissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Submission {
    @Id
    private String id;
    private String userId;
    private String taskId;
    private String taskName;
    private String summary;
    private String references;
    private String fileSubmitted;
    private Date dateOfSubmission;
    private String guideFeedback;
}
