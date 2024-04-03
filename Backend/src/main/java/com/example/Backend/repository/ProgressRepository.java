package com.example.Backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.Backend.model.Progress;
public interface ProgressRepository extends MongoRepository<Progress, String> {
    // Define custom queries if needed
     @Query("{userId: ?0}")
       List<Progress> getProgressByUserId(String userId);

}

