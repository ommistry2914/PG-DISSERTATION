package com.example.Backend.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.model.Progress;
import com.example.Backend.service.ProgressService;


@RestController
@RequestMapping("/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

   @PostMapping("/add")
   public ResponseEntity<Progress> addProgress(@RequestBody Progress progress) {
       //TODO: process POST request
     

        // Add the task
        Progress savedProgress = progressService.addProgress(progress);
        
        // Return ResponseEntity with saved task and HTTP status code 201 Created
        return new ResponseEntity<>(savedProgress, HttpStatus.CREATED);
   }

    @GetMapping("/show")
    public List<Progress> getProgresses(){
        return progressService.findAllProgresses();
    }
      @GetMapping("/userId/{userId}")
   public List<Progress> getProgressByUserId(@PathVariable String userId){
    return progressService.getProgressByUserId(userId);
   }
   @GetMapping("/{id}")
   public Progress getProgress(@PathVariable String id){
       return progressService.getProgressById(id);
   }
     @PutMapping("/update")
   public Progress modifyTask(@RequestBody Progress progress){
    return progressService.updateProgress(progress);
   }
   
    
}
