package com.example.Backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Backend.model.Notes;

public interface NotesRepo extends MongoRepository<Notes, String>{

    List<Notes> findByStudentIdAndDate(String studentid, String date);

    List<Notes> getNotesByStudentId(String studentid);

    // // List<Schedule> findByNotes(String notes);
    // List<Schedule> findByDateAndUserid(String date, String userid);
    // List<Schedule> findByUserid(String userid);
}
