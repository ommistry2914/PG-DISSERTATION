package com.example.Backend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Backend.model.Tasks;

public interface TasksRepository extends MongoRepository<Tasks, String>{

    List<Tasks> findByUserId(String userid);

    List<Tasks> getEventsByUserId(String studentid);

    List<Tasks> findByEndDate(java.util.Date date);

    List<Tasks> findByStatusAndEndDateBefore(String pending, Date date);
}

