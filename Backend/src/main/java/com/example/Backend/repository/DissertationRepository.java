package com.example.Backend.repository;

import com.example.Backend.model.Dissertation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface DissertationRepository extends MongoRepository<Dissertation,String>
{
    Optional<Dissertation> findByStudentId(String reqStudent);

    List<Dissertation> findByGuideId(String gid);
}
