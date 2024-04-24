package com.example.Backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.model.Guide;
import com.example.Backend.service.GuideService;

@RestController
@RequestMapping("/api/auth/guide")
public class GuideController {

    @Autowired
    private GuideService guideService;

    @GetMapping
    public List<Guide> getAllGuides() {
        return guideService.getAllGuides();
    }

    @GetMapping("/{id}")
    public Guide getGuideById(@PathVariable String id) {
        return guideService.getGuideById(id);
    }

    @PostMapping("/addGuide")
    public Guide saveGuide(@RequestBody Guide guide) {
        return guideService.saveGuide(guide);
    }

    @DeleteMapping("/{id}")
    public void deleteGuideById(@PathVariable String id) {
        guideService.deleteGuideById(id);
    }
   @GetMapping("/email/{email}")
public ResponseEntity<Map<String, Boolean>> checkGuideEmail(@PathVariable String email) {
    boolean exists = guideService.existsByEmail(email);
    Map<String, Boolean> response = new HashMap<>();
    response.put("exists", exists);
    return ResponseEntity.ok(response);
}
@GetMapping("/guideEmail/{email}")
public List<Guide> getGuideByEmail(@PathVariable String email){
 return guideService.getGuidesByEmail(email);
}

}
