package com.example.Backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.Backend.model.Progress;
public interface ProgressRepository extends MongoRepository<Progress, String> {
    // Define custom queries if needed
}

