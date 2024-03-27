package com.example.Backend.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Document(collection = "task")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tasks {
    @Id
    private String id;
    private String userId;
    private String taskName;
    private Date startDate;
    private Date endDate;
    private boolean submission;
    private String priority;
    private String status;
    private String mentorId;
    private Mentor[] mentorFeedback;
    private String guideFeedback;
    private String submittedFileUrl;
  
}
