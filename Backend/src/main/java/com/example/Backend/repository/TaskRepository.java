package com.example.Backend.repository;

import com.example.Backend.model.Tasks;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import com.example.Backend.model.Task;
import java.util.List;


public interface TaskRepository extends MongoRepository<Task, String> {

       List<Task> findBySeverity(int severity);

       @Query("{assignee: ?0}")
       List<Task> getTasksByAssignee(String assignee);

}
