package com.example.Backend.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "common")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonPage {
    @Id
    private String id;
    private String userId;
    private String projectName;
    private String description;
    private Date startDate;
    private Date endDate;
    private Mentor[] mentors;
    private String guideId;
    private int numberOfMentorsInvited;
    private String status;
    private int views;
}