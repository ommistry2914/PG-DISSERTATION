// package com.example.Backend.controller;


// import com.example.Backend.model.Message;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.messaging.handler.annotation.MessageMapping;
// import org.springframework.messaging.handler.annotation.Payload;
// import org.springframework.messaging.handler.annotation.SendTo;
// import org.springframework.messaging.simp.SimpMessagingTemplate;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.CrossOrigin;

// @Controller
// public class ChatController {

//     @Autowired
//     private SimpMessagingTemplate simpMessagingTemplate;

//     @CrossOrigin(origins = "http://localhost:5173")
//     @MessageMapping("/message")
//     @SendTo("/chatroom/public")
//     public Message receiveMessage(@Payload Message message){
//         return message;
//     }
//     @CrossOrigin(origins = "http://localhost:5173")
//     @MessageMapping("/private-message")
//     public Message recMessage(@Payload Message message){
//         simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
//         System.out.println(message.toString());
//         return message;
//     }
// }

package com.example.Backend.controller;


import com.example.Backend.model.Message;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.example.Backend.service.*;
import java.util.List;
// import jakarta.validation.OverridesAttribute.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    
    private MessageService messageService;
    @CrossOrigin(origins = "*")
    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(@Payload Message message){
        // Save the message to the database
        messageService.saveMessage(message);

        // Broadcast the message to other users
        return message;
    }
    @CrossOrigin(origins = "*")
    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message){
        // Save the message to the database
        messageService.saveMessage(message);

        // Send the private message to the recipient's private channel
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
        
        return message;
    }
   

}
