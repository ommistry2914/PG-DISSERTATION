package com.example.Backend.controller;
import com.example.Backend.model.ERole;
import com.example.Backend.model.Role;
import com.example.Backend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class RoleController {

    @Autowired
    private RoleService roleService;


    @PostMapping("")
    public ResponseEntity<Role> createRole(@RequestBody Role role) {
        Role savedRole = roleService.save(role);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRole);
    }
  
    // Add other CRUD methods as needed
}

