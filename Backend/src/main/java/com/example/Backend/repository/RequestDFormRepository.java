package com.example.Backend.repository;

import com.example.Backend.model.RequestDForm;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RequestDFormRepository extends MongoRepository<RequestDForm,String>
{
    Optional<RequestDForm> findByStudentId(String newId);
}
