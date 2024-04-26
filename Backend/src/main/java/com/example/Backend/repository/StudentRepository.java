package com.example.Backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.Backend.model.Student;

// import java.util.Optional;
public interface StudentRepository extends MongoRepository<Student, String> {
    // Define custom queries if needed

    boolean existsByEmail(String email);

    Student findByEmail(String id);
}
