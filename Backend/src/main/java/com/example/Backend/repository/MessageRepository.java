package com.example.Backend.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.Backend.model.*;
@Repository
public interface MessageRepository extends MongoRepository<Message, Long> {
    // Define custom query methods if needed
    @Autowired
    List<Message> findBySenderNameAndReceiverNameOrderByDate(String sender, String receiver);

}

