package com.example.Backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.example.Backend.model.Notes;
import com.example.Backend.repository.NotesRepo;

@Service
public class NotesService {
    @Autowired
    private NotesRepo notesRepo;

    private final MongoTemplate mongoTemplate;

    public NotesService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void deleteNoteById(String id) {
        notesRepo.deleteById(id);
    }

    public List<Notes> getNotesByStudentIdAndDate(String studentId, String isoDate) {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(isoDate, inputFormatter);

        LocalDateTime startOfDay = localDate.atStartOfDay();
        LocalDateTime endOfDay = localDate.atTime(23, 59, 59);

        Query query = new Query(Criteria.where("studentId").is(studentId)
                .and("date").gte(startOfDay)
                .lt(endOfDay));

        return mongoTemplate.find(query, Notes.class);
    }

    public List<Notes> getNotesByStudentId(String studentid) {
        return notesRepo.getNotesByStudentId(studentid);
    }

    public void updateNote(String noteId, Notes newNote) {
        Query query = new Query(Criteria.where("_id").is(noteId));
        Update update = new Update();

        if (newNote.getDate() != null) {
            update.set("date", newNote.getDate());
        }
        if (newNote.getNotes() != null) {
            update.set("notes", newNote.getNotes());
        }

        mongoTemplate.updateFirst(query, update, Notes.class);
    }

    public void updateCompletionStatus(String notesId) {
        Query query = new Query(Criteria.where("id").is(notesId));
        Update update = new Update().set("completionStatus", true);
        mongoTemplate.updateFirst(query, update, Notes.class);
    }

}