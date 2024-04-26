import React, { useEffect, useState } from 'react';
import './StudentMentored.css';
import { useAuth } from "../../../AuthContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentMentored = () => {
   const { authenticated, useremail } = useAuth();
   console.log("HELLO FROM SM : ",useremail);
   const navigate = useNavigate();
   const [studentsData, setStudentsData] = useState([]);

   useEffect(() => {
      if (authenticated) {
         fetchDetails();
      } else {
         navigate('/login');
      }
   }, [authenticated, useremail]);

   const fetchDetails = async () => {
    try {
       const res = await axios.get(`http://localhost:8080/api/auth/guide/getidbymail/${useremail}`);
       const guideId = res.data;
 
       const ddata = await axios.get(`http://localhost:8080/api/auth/dissertations/getmyguidedissertation/${guideId}`);
       
       if (ddata.data !== "No Record Available Currently") {
          const studentIds = ddata.data.map(student => student.studentId);
          const studentsDetailsPromises = studentIds.map(id => axios.get(`http://localhost:8080/api/auth/student/${id}`));
          const studentsDetailsResponses = await Promise.all(studentsDetailsPromises);
          const studentsDetails = studentsDetailsResponses.map(response => response.data);
          setStudentsData(studentsDetails);
       }
       else {
          setStudentsData([]);
       }
    } catch (error) {
       console.error('Error fetching details:', error);
    }
 };
 
 return (
    <div id="New_request">
       <h2>Student Mentored</h2>
       <div className="new_requests">
          {studentsData.length > 0 ? (
             studentsData.map((student, index) => (
                <div className="new_request" key={index}>
                   <div className="student_img">
                      <img src={student.image_url} alt="" />
                   </div>
                   <div className="greq_head">
                      <h3>{student.name}</h3>
                      <p>{student.branch}</p>
                   </div>
                   <div className="greq_button">
                      <button>View More</button>
                   </div>
                </div>
             ))
          ) : (
             <div className="default_values">
                <h3>No records available</h3>
                {/* <p>Add some default content here.</p> */}
             </div>
          )}
       </div>
    </div>
 );
 
};

export default StudentMentored;
