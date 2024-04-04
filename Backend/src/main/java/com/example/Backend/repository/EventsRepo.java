package com.example.Backend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Backend.model.Events;

public interface EventsRepo extends MongoRepository<Events, String>{

    List<Events> getEventsByStudentId(String studentid);

    List<Events> findByStudentIdAndFromDateLessThanEqualAndToDateGreaterThanEqual(String studentId, Date date,
            Date date2);

    // // List<Schedule> findByNotes(String notes);
    // List<Schedule> findByDateAndUserid(String date, String userid);
    // List<Schedule> findByUserid(String userid);
}
