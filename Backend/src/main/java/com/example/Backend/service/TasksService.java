package com.example.Backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.example.Backend.model.Tasks;
import com.example.Backend.repository.TasksRepository;


@Service
public class TasksService {
    @Autowired
    private TasksRepository taskRepo;

    public void deleteEventById(String id) {
        taskRepo.deleteById(id);
    }

    private final MongoTemplate mongoTemplate;

    @Autowired
    public TasksService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void updateEvent(String eventId, String submissionId, Tasks newEvent) {
        Query query = new Query(Criteria.where("_id").is(eventId));
        Update update = new Update();
        
        // Update approval stage and revision credits if provided
        if (newEvent.getApprovalStage() != null) {
            update.set("approvalStage", newEvent.getApprovalStage());
        }
        if (newEvent.getRevCredits() != 0) {
            update.set("revCredits", newEvent.getRevCredits());
        }
    
        // Fetch the end date from the database
        Tasks existingTask = mongoTemplate.findOne(query, Tasks.class);
        if (existingTask != null && existingTask.getEndDate() != null) {
            Date endDate = existingTask.getEndDate();
            Date currentDate = new Date();
            String status;
    
            // Calculate the status based on the submission date and approval status
            if ("Approved".equals(newEvent.getApprovalStage())) {
                if (currentDate.after(endDate)) {
                    status = "Approved Late";
                } else {
                    status = "Approved";
                }
            } else {
                Date submissionDate = existingTask.getSubmissionDate();
                if (submissionDate.before(endDate)) {
                    status = "Pending";
                } else if (submissionDate.after(endDate)) {
                    status = "Delayed";
                } else {
                    status = "On Track";
                }
            }
            update.set("status", status);
            update.set("approvalDate", new Date());
    
            mongoTemplate.updateFirst(query, update, Tasks.class);
        } else {
            // Handle the case when the end date is not found in the database
            // You can log an error or take appropriate action
        }
    }

    public void updateTask(String taskId, Tasks newTask) {
        Query query = new Query(Criteria.where("_id").is(taskId));
        Update update = new Update();

        if (newTask.getTaskName() != null) {
            update.set("taskName", newTask.getTaskName());
        }
        if (newTask.getTaskDescription() != null) {
            update.set("taskDescription", newTask.getTaskDescription());
        }
        if (newTask.getStartDate() != null) {
            update.set("startDate", newTask.getStartDate());
        }
        if (newTask.getEndDate() != null) {
            update.set("startDate", newTask.getEndDate());
        }
        if (newTask.getPriority() != null) {
            update.set("priority", newTask.getPriority());
        }
        if (newTask.getMaxCredits() != 0) {
            update.set("maxCredits", newTask.getMaxCredits());
        }

        mongoTemplate.updateFirst(query, update, Tasks.class);
    }
    
}