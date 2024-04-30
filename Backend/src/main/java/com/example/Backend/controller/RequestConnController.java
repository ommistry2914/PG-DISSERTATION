package com.example.Backend.controller;


import com.example.Backend.model.Dissertation;
import com.example.Backend.model.GuideAvailibility;
import com.example.Backend.model.RequestConn;
import com.example.Backend.model.RequestDForm;
import com.example.Backend.repository.AvailRepository;
import com.example.Backend.repository.DissertationRepository;
import com.example.Backend.repository.RequestConnRepository;
import com.example.Backend.repository.RequestDFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/requestConnection")
public class RequestConnController
{
    @Autowired
    private RequestConnRepository rcrepo;

    @Autowired
    private DissertationRepository dissrepo;

    @Autowired
    private RequestDFormRepository rdfrepo;

    @Autowired
    private AvailRepository arepo;


    //get all requests
//    @GetMapping("/getConn/{gid}")
//    public ResponseEntity<?> getRequests(@PathVariable("gid") String guideId)
//    {
//        RequestConn rc = rcrepo.findByReqGuide(guideId);
//
//        if(rc.getReqStatus().equals("Accept"))
//        {
//            //save the guide and student in the dissertation
//            return new ResponseEntity<>("Guide Accepted the request", HttpStatus.OK);
//        }
//
//        return new ResponseEntity<>("Guide Declined the request", HttpStatus.NOT_FOUND);
//    }

    //create new Request
    @PostMapping("/addReqBy/{stdid}/with/{rdf}/to/{gid}")
    public void addReq(@PathVariable("stdid") String stdId, @PathVariable("gid") String gId , @PathVariable("rdf") String rdfId,@RequestBody RequestConn newRC)
    {
        newRC.setReqId(UUID.randomUUID().toString().split("-")[0]);
        newRC.setReqStudent(stdId);
        newRC.setReqGuide(gId);
        newRC.setReqStatus("N/A");
        newRC.setRdfId(rdfId);

        rcrepo.save(newRC);
    }


    //change status of the request from newGuideRequest Page
    @Transactional
    @PutMapping("/changeStatus/{stdid}/{gid}/{stat}")
    public ResponseEntity<?> changeStat(@PathVariable("stdid") String stdId,@PathVariable("gid") String gId,@PathVariable("stat") String status) {
        Optional<RequestConn> exist = rcrepo.findByReqStudentAndReqGuide(stdId, gId);

        if (exist.isPresent()) {
            RequestConn newRConn = exist.get();

            newRConn.setReqStatus(status);
            rcrepo.save(newRConn);

            if (status.equals("Accept")) {
                System.out.println("Reachec");
//                Optional<GuideAvailibility> statcheck = arepo.findByGuideId(newRConn.getReqGuide());

                Optional<RequestDForm> imm = rdfrepo.findByStudentId(newRConn.getReqStudent());
                System.out.println("2");
                RequestDForm immi = imm.get();

                Dissertation drt = new Dissertation();
                drt.setDissertationId(UUID.randomUUID().toString().split("-")[0]);
                drt.setStudentId(newRConn.getReqStudent());
                drt.setGuideId(newRConn.getReqGuide());
                drt.setDissertationName(immi.getDissertationName());
                drt.setDissertationDesc(immi.getDissertationDesc());
                drt.setDissertationStatus("Started");
                drt.setDrtstartDate(new Date());
                drt.setRdfId(immi.getRdfId());

                dissrepo.save(drt);

//                if (statcheck.isPresent()) {
//                    GuideAvailibility look = statcheck.get();
//                    System.out.println("1");
//                    if (look.getCount() < 5) {
//
//                        System.out.println("3");
//                        look.setCount(look.getCount() + 1);
//
//                        arepo.save(look);
//                    } else {
//
//                        newRConn.setReqStatus("Decline");
//                        rcrepo.save(newRConn);
//                        return ResponseEntity.ok("Couldn't Accept as you already reached the maximum limit of students");
//
//                    }
//
//
//                }

                // Retrieve all pending requests from other guides for the same student
                List<RequestConn> pendingRequests = rcrepo.findByReqStudent(stdId);

                for (RequestConn request : pendingRequests) {
                    // Check if the request is not from the current guide
                    if (!request.getReqGuide().equals(gId)) {
                        // Update status to "Decline" for pending requests from other guides
                        request.setReqStatus("Decline");
                        rcrepo.save(request);
                    }
                }
                return ResponseEntity.ok("Successfully Status Changed for your request");
            }

            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getmyrequests/{gid}")
    public ResponseEntity<?> getMyRequests(@PathVariable("gid") String guideId) {
        List<RequestConn> reqList = rcrepo.findByReqGuide(guideId);

        if (!reqList.isEmpty()) {
            return ResponseEntity.ok(reqList);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No requests found for you");
        }
    }

}
