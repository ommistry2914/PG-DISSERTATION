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

import com.example.Backend.model.Events;
import com.example.Backend.model.Notes;
import com.example.Backend.repository.EventsRepo;

@Service
public class EventsService {
    @Autowired
    private EventsRepo eventsRepo;

    public void deleteEventById(String id) {
        eventsRepo.deleteById(id);
    }

    private final MongoTemplate mongoTemplate;

    public EventsService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    
    public List<Events> getEventsByStudentIdAndDate(String studentId, String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-mm-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);
    
        LocalDateTime startOfDay = localDate.atStartOfDay();
        LocalDateTime endOfDay = localDate.atTime(23, 59, 59);
    
        Query query = new Query(Criteria.where("studentId").is(studentId)
                .and("from").lte(endOfDay.format(DateTimeFormatter.ofPattern("d MMMM yyyy HH:mm")))
                .and("to").gte(startOfDay.format(DateTimeFormatter.ofPattern("d MMMM yyyy HH:mm"))));
    
        return mongoTemplate.find(query, Events.class);
    }
    
    public List<Events> getEventsByStudentId(String studentid) {
        return eventsRepo.getEventsByStudentId(studentid);
    }

    public void updateEvent(String eventId, Events newEvent) {
        Query query = new Query(Criteria.where("_id").is(eventId));
        Update update = new Update();

        if (newEvent.getEvent() != null) {
            update.set("event", newEvent.getEvent());
        }
        if (newEvent.getFrom() != null) {
            update.set("from", newEvent.getFrom());
        }
        if (newEvent.getTo() != null) {
            update.set("to", newEvent.getTo());
        }
        if (newEvent.getDescription() != null) {
            update.set("description", newEvent.getDescription());
        }

        mongoTemplate.updateFirst(query, update, Events.class);
    }


    public void updateCompletionStatus(String eventsId) {
        Query query = new Query(Criteria.where("id").is(eventsId));
        Update update = new Update().set("completionStatus", true);
        mongoTemplate.updateFirst(query, update, Events.class);
    }
}