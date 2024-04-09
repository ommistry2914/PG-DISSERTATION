package com.example.Backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Backend.model.Notification;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    // Define custom queries if needed
    List<Notification> getNotificationByReceiverId(String receiverId);
}
