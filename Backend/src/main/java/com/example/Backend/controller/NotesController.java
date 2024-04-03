package com.example.Backend.controller;

import com.example.Backend.model.Events;
import com.example.Backend.model.Notes;
import com.example.Backend.repository.NotesRepo;
import com.example.Backend.service.NotesService;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
 @CrossOrigin(origins = "http://localhost:8080")
public class NotesController {

    @Autowired
    NotesRepo notesRepo;
    @Autowired
    NotesService notesService;

    // Post for notes
    @PostMapping("/{studentid}/studentguide/schedule/notes")
    public void addNote(@PathVariable("studentid") String studentid, @RequestBody Notes note) {
        note.setId(UUID.randomUUID().toString().split("-")[0]);
        note.setStudentId(studentid);
         note.setCompletionStatus(false);
        System.out.println(studentid);
        notesRepo.save(note);
    }

    @DeleteMapping("{userid}/studentguide/schedule/notes/{id}")
    public ResponseEntity<?> delNoteById(@PathVariable String id) {
        notesService.deleteNoteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{studentid}/studentguide/schedule/notes")
    public List<Notes> getNotesByStudentId(@PathVariable("studentid") String studentid) {
        return notesService.getNotesByStudentId(studentid);
    }

    @GetMapping("{studentid}/studentguide/schedule/notes/date")
    public List<Notes> getNotesByStudentIdAndDate(@PathVariable("studentid") String studentid,
            @RequestParam String date) {
        return notesService.getNotesByStudentIdAndDate(studentid, date);
    }

    @PutMapping("{studentid}/studentguide/schedule/notes/{noteid}")
    public ResponseEntity<Void> updateNote(@PathVariable("noteid") String noteId, @RequestBody Notes newNote) {
        notesService.updateNote(noteId, newNote);
        return ResponseEntity.ok().build();
    }


    @PutMapping("{studentid}/studentguide/schedule/notes/{noteid}/complete")
    public void completeNote(@PathVariable("noteid") String noteid) {
        notesService.updateCompletionStatus(noteid);
    }
}