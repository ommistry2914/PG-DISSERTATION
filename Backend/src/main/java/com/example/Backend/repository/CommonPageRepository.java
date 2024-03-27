package com.example.Backend.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Backend.model.CommonPage;

public interface CommonPageRepository extends MongoRepository<CommonPage, String>{
    
}
