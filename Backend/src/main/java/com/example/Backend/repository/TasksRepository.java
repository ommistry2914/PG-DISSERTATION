package com.example.Backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.Backend.model.Tasks;
public interface TasksRepository extends MongoRepository<Tasks, String> {
    // Define custom queries if needed
}

