package com.example.Backend.controller;
import com.example.Backend.model.Message;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import com.example.Backend.service.*;

import lombok.Data;

import java.util.List;
// import jakarta.validation.OverridesAttribute.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@Data
@RequestMapping("/chat")
public class ChatApiController {
    @Autowired
    public ChatApiController(MessageService messageService) {
        this.messageService = messageService;
    }

    @Autowired
    private MessageService messageService;
   
@CrossOrigin(origins = "http://localhost:5173")
@GetMapping("/{sender}/{receiver}")
public ResponseEntity<List<Message>> getChats(@PathVariable String sender, @PathVariable String receiver) {
    List<Message> chats = messageService.getChatsBySenderAndReceiver(sender, receiver);
    if (chats.isEmpty()) {
        return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok(chats);
}
}
