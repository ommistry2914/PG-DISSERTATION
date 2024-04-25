package com.example.Backend.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.model.Notification;
import com.example.Backend.model.Tasks;
import com.example.Backend.repository.NotificationRepository;
import com.example.Backend.repository.TasksRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private TasksRepository tasksRepository;

    public List<Notification> getAllNotifications(){
        return notificationRepository.findAll();
    }
    
    public Notification getNoticationById(String id){
        return notificationRepository.findById(id).orElse(null);
    }

    public Notification saveNotification(Notification notification){
        notification.setId(UUID.randomUUID().toString().split("-")[0]);
        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationByReceiverId(String receiverId){
        return notificationRepository.getNotificationByReceiverId(receiverId);
    }
    public Notification markAsRead(Notification notificationRequest) {
        Notification existingNotification = notificationRepository.findById(notificationRequest.getId()).get();
        
        existingNotification.setsenderId(notificationRequest.getsenderId());
        existingNotification.setReceiverId(notificationRequest.getReceiverId());
        existingNotification.setType(notificationRequest.getType());
        existingNotification.setCreatedAt(notificationRequest.getCreatedAt());
        existingNotification.setRead(true);
        existingNotification.setLink(notificationRequest.getLink());
        return notificationRepository.save(existingNotification);
    }

    public Notification checkAndSendNotifications() {
        List<Tasks> pendingTasks = tasksRepository.findByStatusAndEndDateBefore("pending", new Date());
        Notification notification = null;
        for (Tasks task : pendingTasks) {
            // Send notification to user
            saveNotification(task.getUserId(), "Task overdue: " + task.getTaskName());

            // Store notification info in MongoDB
            notification = new Notification();
            notification.setsenderId(task.getUserId());
            notification.setType("Task overdue: " + task.getTaskName());

        }
        return notificationRepository.save(notification);
    }

    public void saveNotification(String userId, String message) {
        Notification notification = new Notification();
        notification.setId(UUID.randomUUID().toString().split("-")[0]);
        notification.setsenderId("Reminder");
        notification.setReceiverId(userId);
        notification.setType(message);
        notification.setCreatedAt(LocalDateTime.now());
        notification.isRead(false);
        notification.setLink("http://localhost:5173/"+userId+"/studentguide/submit-for");
        
        
        // Save notification to MongoDB
        notificationRepository.save(notification);
    }
}
