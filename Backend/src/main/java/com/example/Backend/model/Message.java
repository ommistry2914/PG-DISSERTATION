package com.example.Backend.model;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Document(collection = "chatbox")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Message {
    private LocalDateTime date;
    private String senderName;
    private String receiverName;
    private String message;
    private Status status;

    // No need for setter for date, it will be automatically set when calling the constructor
    
    // Method to set date using milliseconds since the epoch
    public void setDate(Long milliseconds) {
        this.date = Instant.ofEpochMilli(milliseconds)
                           .atZone(ZoneId.systemDefault())
                           .toLocalDateTime();
    }
}

