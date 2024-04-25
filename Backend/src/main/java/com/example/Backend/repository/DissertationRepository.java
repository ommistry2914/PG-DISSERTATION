package com.example.Backend.repository;

import com.example.Backend.model.Dissertation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DissertationRepository extends MongoRepository<Dissertation,String>
{
    Optional<Dissertation> findByStudentId(String reqStudent);
}
