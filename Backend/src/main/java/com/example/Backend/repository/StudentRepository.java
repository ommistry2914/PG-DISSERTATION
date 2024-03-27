package com.example.Backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.Backend.model.Student;

public interface StudentRepository extends MongoRepository<Student, String> {
    // Define custom queries if needed
}
