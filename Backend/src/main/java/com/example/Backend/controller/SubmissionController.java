package com.example.Backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.model.Submission;
import com.example.Backend.model.Tasks;
import com.example.Backend.repository.SubmissionRepo;
import com.example.Backend.repository.TasksRepository;
import com.example.Backend.service.SubmissionService;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class SubmissionController {

    @Autowired
    SubmissionRepo submissionRepo;
    @Autowired
    SubmissionService submissionService;
    @Autowired
    TasksRepository taskRepo;

    // Post for submission
    @PostMapping("{userid}/submit-for/{taskid}/add-work")
    public void addTask(@PathVariable("userid") String userid, @PathVariable("taskid") String taskid,
            @RequestBody Submission submission) {
        submission.setId(UUID.randomUUID().toString().split("-")[0]);
        submission.setTaskId(taskid);
        submission.setUserId(userid);
        System.out.println(userid);
        submission.setDateOfSubmission(new Date());
        submissionRepo.save(submission);

        Optional<Tasks> optionalTask = taskRepo.findById(taskid);
        if (optionalTask.isPresent()) {
            Tasks task = optionalTask.get();
            task.setSubmissionId(submission.getId());
            task.setSubmissionDate(submission.getDateOfSubmission());
            task.setApprovalStage(null);
            task.setRevCredits(0);
            taskRepo.save(task);
        } else {
            // Handle the case where the task is not found
            // For example, throw an exception or log a message
        }
    }

    @GetMapping("/{userid}/submissions/{taskid}")
    public List<Submission> getAllSubmissionsByUseridAndTaskid(@PathVariable("userid") String userid,
            @PathVariable("taskid") String taskid) {
        return submissionRepo.findByUserIdAndTaskId(userid, taskid);
    }

    @GetMapping("/{userid}/submissions/{taskid}/{submissionid}")
    public Submission getSubmissionByUseridAndId(@PathVariable("userid") String userid,
            @PathVariable("submissionid") String submissionid) {
        return submissionRepo.findByIdAndUserId(submissionid, userid);
    }



    @PutMapping("{studentid}/submissions/{taskid}/{submissionid}/update")
    public ResponseEntity<Void> updateApproval(@PathVariable("taskid") String taskId,
            @PathVariable("submissionid") String submissionId, @RequestBody Submission newEvent) {
        submissionService.updateSubmission(submissionId, newEvent);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{studentid}/submissions/{taskid}/{submissionid}/feedback")
    public ResponseEntity<Void> updateFeedback(@PathVariable("submissionid") String submissionId,
            @RequestBody String guideFeedback) {
        submissionService.updateFeedback(submissionId, guideFeedback);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/submissions/{stdid}")
    public String getandshow(@PathVariable("stdid") String sid)
    {
        Optional<Submission> check = submissionRepo.findByUserId(sid);

        if(check.isPresent())
        {
            return "Submission Exist";
        }

        return "Submission Not available";
    }

}

