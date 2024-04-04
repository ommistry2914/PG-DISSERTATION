package com.example.Backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.model.Events;
import com.example.Backend.model.Notes;
import com.example.Backend.repository.EventsRepo;
import com.example.Backend.repository.NotesRepo;
import com.example.Backend.service.EventsService;
import com.example.Backend.service.NotesService;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
 @CrossOrigin(origins = "http://localhost:8080")
public class EventsController {

    @Autowired
    EventsRepo eventsRepo;
    @Autowired
    EventsService eventsService;
    @Autowired
    NotesService notesService;
    @Autowired
    NotesRepo notesRepo;

    // Post for events
    @PostMapping("/{studentid}/studentguide/schedule/events")
    public void addEvent(@PathVariable("studentid") String studentid, @RequestBody Events event) {
        event.setId(UUID.randomUUID().toString().split("-")[0]);
        event.setStudentId(studentid);
        event.setCompletionStatus(false);
        System.out.println(studentid);
        eventsRepo.save(event);

    }

    @DeleteMapping("{userid}/studentguide/schedule/events/{id}")
    public ResponseEntity<?> delEventById(@PathVariable String id) {
        eventsService.deleteEventById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{studentid}/studentguide/schedule/events/date")
    public List<Events> getEventsByStudentIdAndDate(
            @PathVariable("studentid") String studentid,
            @RequestParam("date") String date) {
        return eventsService.getEventsByStudentIdAndDate(studentid, date);
    }

    
    @GetMapping("/{studentid}/studentguide/schedule/events/{eventid}")
    public Events getEventsById( @PathVariable("eventid") String eventid) {
        return eventsRepo.getEventsById(eventid);
    }

   
    @GetMapping("/{studentid}/studentguide/schedule/events")
    public List<Events> getEventsByStudentId(@PathVariable("studentid") String studentid) {
        return eventsService.getEventsByStudentId(studentid);
    }

    @GetMapping("/{studentid}/studentguide/schedule/date")
    public List<Object> getSchedule(@PathVariable("studentid") String studentId, @RequestParam String date) {
        List<Object> schedule = new ArrayList<>();
        schedule.addAll(eventsService.getEventsByStudentIdAndDate(studentId, date));
        schedule.addAll(notesRepo.findByStudentIdAndDate(studentId, date));

        return schedule;
    }

    @GetMapping("/{studentid}/studentguide/schedule")
    public List<Object> getSchedule(@PathVariable("studentid") String studentId) {
        List<Object> schedule = new ArrayList<>();
        schedule.addAll(eventsService.getEventsByStudentId(studentId));
        schedule.addAll(notesService.getNotesByStudentId(studentId));
        return schedule;
    }

    @PutMapping("{studentid}/studentguide/schedule/events/{eventid}")
    public ResponseEntity<Void> updateEvent(@PathVariable("eventid") String eventId, @RequestBody Events newEvent) {
        eventsService.updateEvent(eventId, newEvent);
        return ResponseEntity.ok().build();
    }


    @PutMapping("{studentid}/studentguide/schedule/events/{eventid}/complete")
    public void completeNote(@PathVariable("eventid") String eventid) {
        eventsService.updateCompletionStatus(eventid);
    }

}