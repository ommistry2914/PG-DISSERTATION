package com.example.Backend.controller;

import com.example.Backend.model.RequestDForm;
import com.example.Backend.model.Student;
import com.example.Backend.repository.RequestDFormRepository;
import com.example.Backend.repository.StudentRepository;
import com.example.Backend.service.RDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/rdfActions")
public class RDFController {

    @Autowired
    private RequestDFormRepository rdfrepo;

    @Autowired
    private RDFService rdfs;

    @Autowired
    private StudentRepository srepo;

    @PostMapping("/addRDF")
    public ResponseEntity<String> addrdf(@RequestBody RequestDForm newRDF) {

        String id = newRDF.getStudentId();

//        Student std = srepo.findByEmail(id);
//        String newId = std.getId();
        Optional<RequestDForm> check = rdfrepo.findByStudentId(id);

        if(check.isPresent())
        {
            RequestDForm editRdf = check.get();
            editRdf.setDissertationName(newRDF.getDissertationName());
            editRdf.setDissertationDesc(newRDF.getDissertationDesc());
            editRdf.setStdResult(newRDF.getStdResult());
            editRdf.setQualification(newRDF.getQualification());
            rdfs.saveRdf(editRdf);
            return ResponseEntity.ok("Form updated successfully");
        }
        else {
            newRDF.setRdfId(UUID.randomUUID().toString().split("-")[0]);

            newRDF.setStudentId(id);

            rdfs.saveRdf(newRDF);
            return ResponseEntity.ok("Form submitted successfully");
        }
    }

    @GetMapping("/getRDF/{sid}")
    public ResponseEntity<RequestDForm> getRDF(@PathVariable("sid") String sId) {
        Optional<RequestDForm> form = rdfrepo.findByStudentId(sId);
        if (!form.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        RequestDForm rdf = form.get();
        return ResponseEntity.ok(rdf);
    }

    @PutMapping("/editRDF/{rdfid}")
    public ResponseEntity<String> updateRDF(@PathVariable("rdfid") String rdfId, @RequestBody RequestDForm updatedRDF) {
        Optional<RequestDForm> form = rdfrepo.findByStudentId(rdfId);
        if (!form.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        RequestDForm existingRDF = form.get();
        // Update the existing RDF document with the data from the request body
        existingRDF.setDissertationName(updatedRDF.getDissertationName());
        existingRDF.setDissertationDesc(updatedRDF.getDissertationDesc());
        existingRDF.setStdResult(updatedRDF.getStdResult());
        existingRDF.setQualification(updatedRDF.getQualification());
        rdfs.saveRdf(existingRDF);
        return ResponseEntity.ok("Form updated successfully");
    }

    @GetMapping("/getrdf/from/{stdid}")
    public String getrdf(@PathVariable("stdid")String stdId)
    {
        Optional<RequestDForm> std = rdfrepo.findByStudentId(stdId);

        if(std.isPresent())
        {
            return std.get().getRdfId();
        }

        return "NO STUDENT RDF";
    }

    //for getting the details of student in guide dashboard new requests
    @GetMapping("/getrdfdetails/from/{stdid}")
    public ResponseEntity<?> getrdfdetails(@PathVariable("stdid")String stdId)
    {
        Optional<RequestDForm> std = rdfrepo.findByStudentId(stdId);

        if(std.isPresent())
        {
            return ResponseEntity.ok(std);
        }

        return ResponseEntity.ok("No Student");
    }

    //get rdf details for the student requested and show it in viewrdf page
    @GetMapping("/viewrdf/{stdid}")
    public ResponseEntity<?> viewrdf(@PathVariable("stdid") String stdId)
    {
        Optional<RequestDForm> rdfdeets = rdfrepo.findByStudentId(stdId);

        if(rdfdeets.isPresent())
        {
            return ResponseEntity.ok(rdfdeets.get());
        }
        return ResponseEntity.notFound().build();
    }
}
