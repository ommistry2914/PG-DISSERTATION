package com.example.Backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.Backend.model.Submission;


public interface SubmissionRepo extends MongoRepository<Submission, String> {

    List<Submission> findByUserIdAndTaskId(String userid, String taskid);

    Submission findByIdAndUserId(String submissionid, String userid);

}
