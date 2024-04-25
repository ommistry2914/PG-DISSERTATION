package com.example.Backend.model;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "notification")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    @Id
    private String id;
    private String senderId;
    private String receiverId;
    private String type;
    private LocalDateTime createdAt;
    private boolean read;
    private String link;

   
    public String getId(){
        return id;
    }
    public void setId(String id){
        this.id=id;
    }
    public String getsenderId(){
        return senderId;
    }
    public void setsenderId(String senderId){
        this.senderId=senderId;
    }
    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isRead(boolean b) {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
