package com.example.Backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.model.Tasks;
import com.example.Backend.repository.TasksRepository;
import com.example.Backend.service.TasksService;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class TasksController {

    @Autowired
    TasksRepository taskRepo;
    @Autowired
    TasksService submissionService;

    @PostMapping("allottask/{userid}")
    public void addTask(@PathVariable("userid") String userid, @RequestBody Tasks task) {
        task.setId(UUID.randomUUID().toString().split("-")[0]);
        task.setUserId(userid);
        task.setStatus("Pending");

        System.out.println(userid);
        taskRepo.save(task);
    }

    // Update task details
    @PutMapping("allottask/{userid}/update/{taskid}")
    public ResponseEntity<Void> updateApproval(@PathVariable("taskid") String taskId, @RequestBody Tasks newEvent) {
        submissionService.updateTask(taskId, newEvent);
        return ResponseEntity.ok().build();
    }

    // Delete task
    @DeleteMapping("allottask/{userid}/delete/{taskid}")
    public ResponseEntity<?> delEventById(@PathVariable("taskid") String taskId) {
        submissionService.deleteEventById(taskId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{userid}/progress")
    public List<Tasks> getTaskByUserId(@PathVariable("userid") String userid) {
        return taskRepo.findByUserId(userid);
    }

    @GetMapping("{userid}/submit-for")
    public List<Tasks> getTaskNameByUserId(@PathVariable("userid") String userid) {
        return taskRepo.findByUserId(userid);
    }

    @GetMapping("{userid}/submissions")
    public List<Tasks> getAllTaskNameByUserId(@PathVariable("userid") String userid) {
        return taskRepo.findByUserId(userid);
    }

    // Update task on approval
    @PutMapping("{studentid}/submissions/{taskid}/{submissionid}")
    public ResponseEntity<Void> updateApproval(@PathVariable("taskid") String taskId,
            @PathVariable("submissionid") String submissionId, @RequestBody Tasks newEvent) {
        submissionService.updateEvent(taskId, submissionId, newEvent);
        return ResponseEntity.ok().build();
    }

}

