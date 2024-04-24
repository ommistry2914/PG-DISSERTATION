package com.example.Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "RequestConn")
public class RequestConn
{
    @Id
    private String reqId;
    private String reqStudent;
    private String reqGuide;
    private String rdfId;
    private String reqStatus;

    public RequestConn() {
    }

    public RequestConn(String reqId, String reqStudent, String reqGuide, String rdfId, String reqStatus) {
        this.reqId = reqId;
        this.reqStudent = reqStudent;
        this.reqGuide = reqGuide;
        this.rdfId = rdfId;
        this.reqStatus = reqStatus;
    }

    public String getReqId() {
        return reqId;
    }

    public void setReqId(String reqId) {
        this.reqId = reqId;
    }

    public String getReqStudent() {
        return reqStudent;
    }

    public void setReqStudent(String reqStudent) {
        this.reqStudent = reqStudent;
    }

    public String getReqGuide() {
        return reqGuide;
    }

    public void setReqGuide(String reqGuide) {
        this.reqGuide = reqGuide;
    }

    public String getRdfId() {
        return rdfId;
    }

    public void setRdfId(String rdfId) {
        this.rdfId = rdfId;
    }

    public String getReqStatus() {
        return reqStatus;
    }

    public void setReqStatus(String reqStatus) {
        this.reqStatus = reqStatus;
    }
}
