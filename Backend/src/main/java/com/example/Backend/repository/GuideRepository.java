package com.example.Backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.Backend.model.Guide;

public interface GuideRepository extends MongoRepository<Guide, String> {
    // Define custom queries if needed
}
