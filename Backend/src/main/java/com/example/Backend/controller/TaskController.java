package com.example.Backend.controller;

import java.util.List;
import java.util.Optional;

import com.example.Backend.model.Tasks;
import com.example.Backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.service.TaskService;
import com.example.Backend.model.Task;
@RestController
@RequestMapping("/tasks")
public class TaskController {


    @Autowired
    private TaskService service;


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(@RequestBody Task task){
        return service.addTask(task);
    }

    @GetMapping
    public List<Task> getTasks(){
        return service.findAllTasks();
    }

    @GetMapping("/{taskId}")
    public Task getTask(@PathVariable String taskId){
        return service.getTaskByTaskId(taskId);
    }

   @GetMapping("/severity/{severity}")
   public List<Task> findTaskUsingSeverity(@PathVariable int severity){
    return service.getTaskBySeverity(severity);
   } 
   
   @GetMapping("/assignee/{assignee}")
   public List<Task> getTaskByAssignee(@PathVariable String assignee){
    return service.getTaskByAssignee(assignee);
   }

   @PutMapping
   public Task modifyTask(@RequestBody Task task){
    return service.updateTask(task);
   }

   @DeleteMapping("/{taskId}")
   public String deleteTask(@PathVariable String taskId){
    return service.deleteTask(taskId);
   }

//   @GetMapping("/task/by/userid/{stdid}")
//    public String getandshow(@PathVariable("stdid") String sid)
//   {
//       List<Tasks> check = trepo.findByUserId(sid);
//       int size = check.size();
//       int count = 0;
//
//       for(Tasks t : check)
//       {
//           if(t.getApprovalStage().equals("Approved"))
//           {
//               count++;
//           }
//       }
//
//       if(count == size)
//       {
//           return "Approved by guide";
//       }
//       return "Not approved";
//   }

}
