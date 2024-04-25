package com.example.Backend.model;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
@ToString
public class MessageContent {

    private String senderName;
    private String receiverName;
    private String message;
    private Status status;
    private Date date;

    // No need for setter for date, it will be automatically set when calling the constructor

    // Method to set date using milliseconds since the epoch
}
