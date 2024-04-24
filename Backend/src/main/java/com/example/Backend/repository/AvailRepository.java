package com.example.Backend.repository;

import com.example.Backend.model.GuideAvailibility;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AvailRepository extends MongoRepository<GuideAvailibility,String>
{
    public Optional<GuideAvailibility> findByGuideId(String gid);
}
