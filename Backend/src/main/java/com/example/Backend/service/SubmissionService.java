package com.example.Backend.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import com.example.Backend.model.Submission;
import com.example.Backend.repository.SubmissionRepo;


@Service
public class SubmissionService {
    @Autowired
    private SubmissionRepo submissionRepo;

    private final MongoTemplate mongoTemplate;

    @Autowired
    public SubmissionService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void updateSubmission(String submissionId, Submission newSubmission) {
        Query query = new Query(Criteria.where("_id").is(submissionId));
        Update update = new Update();

        if (newSubmission.getTaskName() != null) {
            update.set("taskName", newSubmission.getTaskName());
        }
        if (newSubmission.getSummary() != null) {
            update.set("summary", newSubmission.getSummary());
        }
        if (newSubmission.getReferences() != null) {
            update.set("references", newSubmission.getReferences());
        }
        if (newSubmission.getFileSubmitted() != null) {
            update.set("fileSubmitted", newSubmission.getFileSubmitted());
        }
           
        update.set("dateOfSubmission", new Date());

        mongoTemplate.updateFirst(query, update, Submission.class);
    }

    public void updateFeedback(String submissionId, String guideFeedback) {
        Optional<Submission> optionalSubmission = submissionRepo.findById(submissionId);
        if (optionalSubmission.isPresent()) {
            Submission submission = optionalSubmission.get();
            submission.setGuideFeedback(guideFeedback);
            submissionRepo.save(submission);
        } else {
        }
    }

}