package com.example.Backend.service;

import com.example.Backend.model.GuideAvailibility;
import com.example.Backend.repository.AvailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AvailService {

    @Autowired
    private AvailRepository arepo;

//    public int findByGuideId(String guideID) {
//        // Retrieve the GuideAvailibility object by guide ID
//        Optional<GuideAvailibility> guideAvailibility = arepo.findByGuideId(guideID);
//
//        // If GuideAvailibility object is null, return 0; otherwise, return the count
//        return guideAvailibility != null ? guideAvailibility.getCount() : 0;
//    }
}
