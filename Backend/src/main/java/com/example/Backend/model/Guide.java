package com.example.Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "guides")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Guide {
    @Id
    private String id;
    private String email;
    private String name;
    private String image;
    private String guideId;
    private String gender;
    private String phoneNumber;
    private String academicQualification;
    private int yearOfExperience;
    private String areaOfSpecialization;
}
