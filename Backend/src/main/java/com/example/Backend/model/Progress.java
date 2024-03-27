package com.example.Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "progress")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Progress {
    @Id
    private String id;
    private String userId;
    private String credentialsProgress;
    private boolean completed;
    private double overallProgressRate;
}
