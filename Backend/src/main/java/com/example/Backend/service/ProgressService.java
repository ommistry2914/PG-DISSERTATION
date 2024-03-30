package com.example.Backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.model.Progress;
import com.example.Backend.repository.ProgressRepository;

@Service
public class ProgressService {
    @Autowired
    private ProgressRepository repository;

    public Progress addProgress(Progress progress){
        progress.setId(UUID.randomUUID().toString().split("-")[0]);
        return repository.save(progress);
    }
    
    public List<Progress> findAllProgresses(){
        return repository.findAll();
    }
    public List<Progress> getProgressByUserId(String userId){
        return repository.getProgressByUserId(userId);
    }
}

