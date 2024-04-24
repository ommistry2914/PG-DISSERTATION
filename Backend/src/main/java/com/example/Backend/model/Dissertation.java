package com.example.Backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "Dissertation")
public class Dissertation
{
    @Id
    private String dissertationId;

    private String studentId;
    private String guideId;
    private String dissertationName;
    private String dissertationDesc;
    private String dissertationStatus;
    private Date drtstartDate;
    private String rdfId;

    public Dissertation() {
    }

    public Dissertation(String dissertationId, String studentId, String guideId, String dissertationName, String dissertationDesc, String dissertationStatus, Date drtstartDate, String rdfId) {
        this.dissertationId = dissertationId;
        this.studentId = studentId;
        this.guideId = guideId;
        this.dissertationName = dissertationName;
        this.dissertationDesc = dissertationDesc;
        this.dissertationStatus = dissertationStatus;
        this.drtstartDate = drtstartDate;
        this.rdfId = rdfId;
    }

    public String getDissertationId() {
        return dissertationId;
    }

    public void setDissertationId(String dissertationId) {
        this.dissertationId = dissertationId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getGuideId() {
        return guideId;
    }

    public void setGuideId(String guideId) {
        this.guideId = guideId;
    }

    public String getDissertationName() {
        return dissertationName;
    }

    public void setDissertationName(String dissertationName) {
        this.dissertationName = dissertationName;
    }

    public String getDissertationDesc() {
        return dissertationDesc;
    }

    public void setDissertationDesc(String dissertationDesc) {
        this.dissertationDesc = dissertationDesc;
    }

    public String getDissertationStatus() {
        return dissertationStatus;
    }

    public void setDissertationStatus(String dissertationStatus) {
        this.dissertationStatus = dissertationStatus;
    }

    public Date getDrtstartDate() {
        return drtstartDate;
    }

    public void setDrtstartDate(Date drtstartDate) {
        this.drtstartDate = drtstartDate;
    }

    public String getRdfId() {
        return rdfId;
    }

    public void setRdfId(String rdfId) {
        this.rdfId = rdfId;
    }
}
