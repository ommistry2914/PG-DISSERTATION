package com.example.Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "RequestDForm")
public class RequestDForm
{

    @Id
    private String rdfId;
    private String studentId;
    private String dissertationName;
    private String dissertationDesc;
    private String stdResult;
    private String qualification;

    public RequestDForm() {
    }

    public RequestDForm(String rdfId, String studentId, String dissertationName, String dissertationDesc, String stdResult, String qualification) {
        this.rdfId = rdfId;
        this.studentId = studentId;
        this.dissertationName = dissertationName;
        this.dissertationDesc = dissertationDesc;
        this.stdResult = stdResult;
        this.qualification = qualification;
    }

    public String getRdfId() {
        return rdfId;
    }

    public void setRdfId(String rdfId) {
        this.rdfId = rdfId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
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

    public String getStdResult() {
        return stdResult;
    }

    public void setStdResult(String stdResult) {
        this.stdResult = stdResult;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }
}
