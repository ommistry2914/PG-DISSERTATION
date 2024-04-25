package com.example.Backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.Backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.Backend.service.StudentService;
import com.example.Backend.model.Student;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentRepository srepo;

 
    @PostMapping
    public Student saveStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }



    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id) {
        return studentService.getStudentById(id);
    }


    @DeleteMapping("/{id}")
    public void deleteStudentById(@PathVariable String id) {
        studentService.deleteStudentById(id);
    }

   @GetMapping("/email/{email}")
public ResponseEntity<Map<String, Boolean>> checkStudentEmail(@PathVariable String email) {
    boolean exists = studentService.existsByEmail(email);
    Map<String, Boolean> response = new HashMap<>();
    response.put("exists", exists);
    return ResponseEntity.ok(response);
}

//for getting the email of the student
   @GetMapping("/getstudentemail/for/{stdid}")
    public String giveemail(@PathVariable("stdid") String stdId)
   {
       Optional<Student> newstd = srepo.findById(stdId);

       Student check = newstd.get();
       return check.getEmail();
   }


   //for getting the name and branch of the student in the viewrdf form
    @GetMapping("/givenamebranch/{stdid}")
    public ResponseEntity<?> give(@PathVariable("stdid") String stdId)
    {
        Optional<Student> std = srepo.findById(stdId);

        if (std.isPresent())
        {
            return ResponseEntity.ok(std.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
}

