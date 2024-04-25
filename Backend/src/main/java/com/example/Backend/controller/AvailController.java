package com.example.Backend.controller;

import com.example.Backend.model.Guide;
import com.example.Backend.model.GuideAvailibility;
import com.example.Backend.repository.AvailRepository;
import com.example.Backend.repository.GuideRepository;
import com.example.Backend.service.AvailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/checkAvailability")
public class AvailController {

    @Autowired
    private AvailRepository arepo;

    @Autowired
    private AvailService aser;

    @Autowired
    private GuideRepository guiderepo;

//    @GetMapping("/checkfor/{gid}")
//    public ResponseEntity<?> checking(@PathVariable("gid") String guideId)
//    {
//        int cnt = aser.findByGuideId(guideId);
//       if(cnt < 5)
//       {
//           Optional<Guide> g = guiderepo.findById(guideId);
//
//           if(g != null)
//           {
//               return new ResponseEntity<>(g, HttpStatus.OK);
//           }
//
//       }
//        return new ResponseEntity<>("Guide Unavailable", HttpStatus.OK);
//    }

//    @GetMapping("/checkfor/{gid}")
//    public ResponseEntity<?> checking(@PathVariable("gid") String guideId) {
//        int cnt = aser.findByGuideId(guideId);
//        Optional<Guide> guideOptional = guiderepo.findById(guideId);
//
//        if (guideOptional.isPresent()) {
//            Guide guide = guideOptional.get();
//            if (cnt < 5) {
//                return ResponseEntity.ok().body("Guide Available: Available");
//            } else {
//                return ResponseEntity.ok().body("Guide Unavailable: Occupied");
//            }
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @GetMapping("/checkfor/{gid}")
    public ResponseEntity<?> checking(@PathVariable("gid") String guideId) {
        Optional<GuideAvailibility> availabilityOptional = arepo.findByGuideId(guideId);

        if (availabilityOptional.isPresent()) {
            GuideAvailibility availability = availabilityOptional.get();
            if (availability.getCount() < 5) {
                return ResponseEntity.ok().body("Available");
            } else {
                return ResponseEntity.ok().body("Occupied");
            }
        } else {
            return ResponseEntity.ok().body("Guide has no details in guide availablity");
        }
    }


    @PostMapping("/addAvail/{gid}")
    public void addAG(@PathVariable("gid") String gid)
    {
        GuideAvailibility ag = new GuideAvailibility();

        ag.setAvailId(UUID.randomUUID().toString());
        ag.setGuideId(gid);
        ag.setCount(0);
        arepo.save(ag);
    }
}
