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
    private String taskDescription;
    private Date startDate;
    private Date endDate;
    private String priority;
    private String status;
    private String submissionId;
    private Date submissionDate;
    private String approvalStage;
    private Date approvalDate;
    private int maxCredits;
    private int revCredits;

}
