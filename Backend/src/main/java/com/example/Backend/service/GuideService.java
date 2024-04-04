package com.example.Backend.service;
import com.example.Backend.repository.GuideRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Backend.model.Guide;
@Service
public class GuideService {
     @Autowired
    private GuideRepository guideRepository;

    public List<Guide> getAllGuides() {
        return guideRepository.findAll();
    }

    public Guide getGuideById(String id) {
        return guideRepository.findById(id).orElse(null);
    }

    public Guide saveGuide(Guide guide) {
        return guideRepository.save(guide);
    }

    public void deleteGuideById(String id) {
        guideRepository.deleteById(id);
    }

    public boolean existsByEmail(String email) {
        return guideRepository.existsByEmail(email);
    }
}