package com.example.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.model.Notification;
import com.example.Backend.repository.NotificationRepository;
import com.example.Backend.service.NotificationService;



@RestController
@RequestMapping("/api/auth/notification")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<Notification> getAllNotifications(){
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public Notification getNoticationById(@PathVariable String id){
        return notificationService.getNoticationById(id);
    }

    @PostMapping
    public Notification saveNotification(@RequestBody Notification notification){
        return notificationService.saveNotification(notification);
    }
    @GetMapping("/receiverId/{receiverId}")
public List<Notification> getNotificationByReceiverId(@PathVariable String receiverId){
 return notificationService.getNotificationByReceiverId(receiverId);
}
@PutMapping("/{id}")
public Notification markAsRead(@RequestBody Notification notification) {
    return notificationService.markAsRead(notification);
}
// @PostMapping("/send")
//     public Notification sendNotifications() {
//         return notificationService.checkAndSendNotifications();
//     }
}
