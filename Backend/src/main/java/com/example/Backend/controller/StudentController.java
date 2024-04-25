package com.example.Backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.Backend.model.User;
import com.example.Backend.repository.StudentRepository;
import com.example.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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

    @Autowired
    private UserRepository urepo;

 
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

       if(newstd.isPresent())
       {
           Student check = newstd.get();
           return check.getEmail();
       }
       return "No student , no email";
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

    //get email of user who is student from user table
    @GetMapping("/getuseremail/{stdid}")
    public String getuemail(@PathVariable("stdid") String stdId)
    {
        Optional<User> u = urepo.findById(stdId);

        if(u.isPresent())
        {
            User newUser = u.get();
            return newUser.getEmail();
        }

        return "no email";
    }

    //get the std by email from student table
    @GetMapping("/getstd/{email}")
    public Student getfromemail(@PathVariable("email") String email)
    {
        Student std = srepo.findByEmail(email);

        return std;
    }

    //get student by mongo id itself
    @GetMapping("/getmongoid/{stdid}")
    public ResponseEntity<?> getstudentbymongo(@PathVariable("stdid") String stdId)
    {
        Optional<Student> std = srepo.findById(stdId);

        return new ResponseEntity<Student>(std.get(), HttpStatus.OK);
    }

    @PutMapping("/editprofile/{stdid}")
    public ResponseEntity<String> editstudent(@PathVariable("stdid") String stdId,@RequestBody Student student)
    {
        Optional<Student> std = srepo.findById(stdId);

            if(std.isPresent())
            {
                Student newstd = std.get();
                newstd.setName(student.getName());
                newstd.setPhoneNumber(student.getPhoneNumber());
                srepo.save(newstd);

                return ResponseEntity.ok("Profile updated successfully");
            }
return  ResponseEntity.ok("Profile not found ");
    }
}

