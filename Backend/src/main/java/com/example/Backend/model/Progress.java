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
    private double credentialsProgress;
    private double completed;
    private double pending;
    private double overallProgressRate;

    public String getId(){
        return id;
    }
    public void setId(String id){
        this.id=id;
    }
    public String getUserId(){
        return userId;
    }
    public void setUserId(String userId){
        this.userId=userId;
    }
    public double getCredentialsProgress(){
        return credentialsProgress;
    }
    public void setCredentialsProgress(double  credentialProgress){
        this.credentialsProgress=credentialProgress;
    }
    public double getCompleted(){
        return completed;
    }
    public void setCompleted(double completed){
        this.completed=completed;
    }
    public double getPending(){
        return pending;
    }
    public void setPending(double pending){
        this.pending=pending;
    }
    public double getOverallProgressRate(){
        return overallProgressRate;
    }
    public void setOverallProgressRate(double overallProgressRate){
        this.overallProgressRate=overallProgressRate;
    }
}
