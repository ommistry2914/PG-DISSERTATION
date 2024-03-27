package com.example.Backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*; // Add this import statement
import com.example.Backend.model.Task;
import com.example.Backend.repository.TaskRepository;

@Service
public class TaskService {
    @Autowired
    private TaskRepository repository;

    //CRUD CREATE, READ, UPDATE, DELETE

    public Task addTask(Task task){
        task.setTaskId(UUID.randomUUID().toString().split("-")[0]);
      return repository.save(task);
    }

    public List<Task> findAllTasks(){
        return repository.findAll();
    }

    public Task getTaskByTaskId(String taskId){
        return repository.findById(taskId).get();
    }

    public List<Task> getTaskBySeverity(int severity){
        return repository.findBySeverity(severity);
    }

    public List<Task> getTaskByAssignee(String assignee){
        return repository.getTasksByAssignee(assignee);
    }

    public Task updateTask(Task taskRequest){
        //get the existing document from DB
        //populate new value from request to existing object
       Task existingTask= repository.findById(taskRequest.getTaskId()).get();
       existingTask.setDescription(taskRequest.getDescription());
       existingTask.setAssignee(taskRequest.getAssignee());
       existingTask.setStoryPoint(taskRequest.getStoryPoint());
       existingTask.setSeverity(taskRequest.getSeverity());

       return repository.save(existingTask);
    }

    public String deleteTask(String taskId){
        repository.deleteById(taskId);
        return taskId+ "task deleted from dashboard";
    }
}
