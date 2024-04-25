package com.example.Backend.service;

import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;

// import java.time.LocalDateTime;

// import javax.management.Query;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.mongodb.core.MongoOperations;
// import org.springframework.data.mongodb.core.query.Criteria;
// import org.springframework.data.mongodb.core.query.Update;
// import org.springframework.stereotype.Service;
// import com.example.Backend.repository.*;
// import com.example.Backend.model.*;

// @Service
// public class MessageService {
//     private MongoOperations mongoOperations;

//     public void saveMessage(Message message) {
//         // Save the message to the database
//         message.setDate(LocalDateTime.now()); // Set the current date-time

//         // Find the existing conversation document or create a new one
//         Query query = new Query(Criteria.where("participants").all(Arrays.asList(message.getSenderName(), message.getReceiverName())));
//         Update update = new Update().push("messages", message);
//         mongoOperations.upsert(query, update, "conversations");
//     }

//     // @Autowired
//     // private MessageRepository messageRepository;

//     // public void saveMessage(Message message) {
//     //     // Save the message to the database
//     //     message.setDate(LocalDateTime.now()); // Set the current date-time
//     //     messageRepository.save(message);
//     // }
// }

import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import com.example.Backend.model.*;
import com.example.Backend.repository.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    private final MongoOperations mongoOperations;

    public MessageService(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public void saveMessage(Message message) {
        // Save the message to the database
        // message.setDate(new Date());

        // Find the existing conversation document or create a new one
        Query query = new Query(Criteria.where("senderName").is(message.getSenderName())
        .and("receiverName").is(message.getReceiverName()));

        Update update = new Update().push("messages", message);
        FindAndModifyOptions options = new FindAndModifyOptions().upsert(true);
        mongoOperations.findAndModify(query, update, options, Message.class);
    }

    
 
public List<Message> getChatsBySenderAndReceiver(String sender, String receiver) {
    List<Message> messagesFromSenderToReceiver = messageRepository.findBySenderNameAndReceiverNameOrderByDate(sender, receiver);
    List<Message> messagesFromReceiverToSender = messageRepository.findBySenderNameAndReceiverNameOrderByDate(receiver, sender);

    // Combine messages and sort them by date
    List<Message> allMessages = new ArrayList<>();
    allMessages.addAll(messagesFromSenderToReceiver);
    allMessages.addAll(messagesFromReceiverToSender);

    // Sort the messages by date
    allMessages.sort(Comparator.comparing(Message::getDate));

    // Log the fetched messages
    Logger logger = Logger.getLogger("ChatApiController");
    logger.info("Fetched messages:");
    for (Message message : allMessages) {
        logger.info("Sender: " + message.getSenderName() + ", Receiver: " + message.getReceiverName() + ", Message: " + message.getMessage() + ", Date: " + message.getDate());
    }

    return allMessages;
}
    
    
}
