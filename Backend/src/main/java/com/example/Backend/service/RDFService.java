package com.example.Backend.service;

import com.example.Backend.model.RequestDForm;
import com.example.Backend.repository.RequestDFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RDFService {

    @Autowired
    private RequestDFormRepository rdfrepo;

    public void saveRdf(RequestDForm newRdf)
    {
        rdfrepo.save(newRdf);
    }
}
