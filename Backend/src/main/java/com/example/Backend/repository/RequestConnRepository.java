package com.example.Backend.repository;

import com.example.Backend.model.RequestConn;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RequestConnRepository extends MongoRepository<RequestConn,String>
{
    public List<RequestConn> findByReqGuide(String gid);

    Optional<RequestConn> findByReqStudentAndReqGuide(String stdId, String gId);

    List<RequestConn> findByReqStudent(String reqStudent);

    List<RequestConn> findByReqStudentAndReqStatusNot(String stdId, String accept);
}
