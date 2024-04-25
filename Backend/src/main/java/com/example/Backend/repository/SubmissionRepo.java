package com.example.Backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.Backend.model.Submission;


public interface SubmissionRepo extends MongoRepository<Submission, String> {

    List<Submission> findByUserIdAndTaskId(String userid, String taskid);

    Submission findByIdAndUserId(String submissionid, String userid);

    Optional<Submission> findByUserId(String sid);
}
