package com.example.Backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Backend.model.Guide;
// import java.util.Optional;
public interface GuideRepository extends MongoRepository<Guide, String> {
    boolean existsByEmail(String email);
    List<Guide> getGuidesByEmail(String email);
}
