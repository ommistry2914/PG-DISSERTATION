package com.example.Backend.controller;

import com.example.Backend.model.Dissertation;
import com.example.Backend.repository.DissertationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth/dissertations")
public class DissertationController {

    @Autowired
    private DissertationRepository dissrepo;


    //get all the dissertations
    @GetMapping("/getAllDissertations")
    public ResponseEntity<?> getAllDiss()
    {
        List<Dissertation> dissertationList = dissrepo.findAll();

        if(dissertationList.size() > 0)
        {
            return new ResponseEntity<List<Dissertation>>(dissertationList, HttpStatus.OK);
        }
        return new ResponseEntity<>("No Record Available Currently", HttpStatus.NOT_FOUND);
    }

    //Add the Dissertation when guide accepts the request from the student and give that studentId and guideId with the rdfId to save the disseratation
    @PostMapping("/{stdid}/with/{rdf}/isGuidedBy/{gdid}/addDissertation")
    public ResponseEntity<Dissertation> postTheDiss(@PathVariable("stdid") String stdID,@PathVariable("gdid") String gdID,@PathVariable("rdf") String rdfId,@RequestBody Dissertation newD)
    {
        newD.setDissertationId(UUID.randomUUID().toString().split("-")[0]);
        newD.setStudentId(stdID);
        newD.setGuideId(gdID);
        newD.setRdfId(rdfId);
        newD.setDrtstartDate(new Date());
        dissrepo.save(newD);
        return new ResponseEntity<Dissertation>(newD,HttpStatus.CREATED);
    }

    //accessing the dissertation by student id
    @GetMapping("/getmydissertation/{stdid}")
    public ResponseEntity<?> getmydrt(@PathVariable("stdid") String id)
    {
        Optional<Dissertation> dissertation = dissrepo.findByStudentId(id);

        System.out.println("DHUNDHO BAHI");
        if(dissertation.isPresent())
        {
            System.out.println("DHUNDHO BAHI snfjgdfja");
            return new ResponseEntity<Dissertation>(dissertation.get(),HttpStatus.OK);
        }
        return new ResponseEntity<>("NO DISSERTATION",HttpStatus.OK);
    }

    //get ongoing dissertations of the guide by guideid
    @GetMapping("/getmyguidedissertation/{guideid}")
    public ResponseEntity<?> getguidediss(@PathVariable("guideid") String gid)
    {
        List<Dissertation> check = dissrepo.findByGuideId(gid);

        if(check.size() > 0)
        {
            return new ResponseEntity<List<Dissertation>>(check, HttpStatus.OK);
        }

        return new ResponseEntity<>("No Record Available Currently", HttpStatus.OK);
    }

//    @GetMapping("/getmyguidedissertation/check/{guideid}")
//    public ResponseEntity<?> getguidedisscheck(@PathVariable("guideid") String gid)
//    {
//        List<Dissertation> check = dissrepo.findByGuideId(gid);
//
//        if(check.size() > 0)
//        {
//            return new ResponseEntity<List<Dissertation>>(check, HttpStatus.OK);
//        }
//
//        return new ResponseEntity<>("No Record Available Currently", HttpStatus.OK);
//    }

    @PutMapping("/changedstatus/{stdid}")
    public String change(@PathVariable("stdid") String sid)
    {
        Optional<Dissertation> d = dissrepo.findByStudentId(sid);
        Dissertation dd = d.get();

        dd.setDissertationStatus("Completed");
        dissrepo.save(dd);
        return "STATUS CHANGED FOR DISSERTATION";
    }
}
