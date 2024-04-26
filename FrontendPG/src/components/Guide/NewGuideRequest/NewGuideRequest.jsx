import React, { useState, useEffect } from "react";
import "./NewGuideRequest.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuth } from "../../../AuthContext";

const NewGuideRequest = () => {
  const [requests, setRequests] = useState([]);
  const [submitMessage, setSubmitMessage] = useState('');
  const [refresh, setRefresh] = useState(false); // State to trigger page refresh

  const {authenticated , useremail} = useAuth();
  console.log("mail check : ",useremail);

  //const guideId = "0987654321";

  useEffect(() => {
    fetchRequests();
  }, [refresh,useremail]); // Refresh page when 'refresh' state changes

  const fetchRequests = async () => {
    try {

      const check = await axios.get(`http://localhost:8080/api/auth/guide/getidbymail/${useremail}`);
      const guideId = check.data;
      const response = await axios.get(
        `http://localhost:8080/requestConnection/getmyrequests/${guideId}`
      );

      if (response.status === 200) {
        console.log(response.data);
        const requestsWithDetails = await Promise.all(
          response.data.map(async (request) => {
            const studentResponse = await axios.get(
              `http://localhost:8080/rdfActions/getrdfdetails/from/${request.reqStudent}`
            );
            const studentDetails = studentResponse.data;
            console.log(studentDetails);

            const studentemail = await axios.get(
              `http://localhost:8080/api/auth/student/getstudentemail/for/${request.reqStudent}`
            );


// import React from 'react';
// import './NewGuideRequest.css';
// import img1 from "../../../assests/techo-home.png";


// const NewGuideRequest = () => {
//     // Dummy data representing new guide requests
//     const newGuideRequestsData = [
//         {
//             name: 'Bobby Upreti',
//             desc: 'Impact of Environment on Mental health',
//             email: 'abc@gmail.com',
//             mobile: 7418529630,
//             appliedDate: '20-7-2024'
//         },
//         {
//             name: 'Bobby Upreti',
//             desc: 'Impact of Environment on Mental health',
//             email: 'abc@gmail.com',
//             mobile: 7418529630,
//             appliedDate: '20-7-2024'
//         },
//         {
//             name: 'Bobby Upreti',
//             desc: 'Impact of Environment on Mental health',
//             email: 'abc@gmail.com',
//             mobile: 7418529630,
//             appliedDate: '20-7-2024'
//         },
//         {
//             name: 'Bobby Upreti',
//             desc: 'Impact of Environment on Mental health',
//             email: 'abc@gmail.com',
//             mobile: 7418529630,
//             appliedDate: '20-7-2024'
//         },
//         {
//             name: 'Bobby Upreti',
//             desc: 'Impact of Environment on Mental health',
//             email: 'abc@gmail.com',
//             mobile: 7418529630,
//             appliedDate: '20-7-2024'
//         },
//         {
//             name: 'Abc',
//             desc: 'Impact of Environment on Mental health',
//             email: 'abc@gmail.com',
//             mobile: 7418529630,
//             appliedDate: '20-7-2024'
//         },
//         // Add more new guide request objects as needed
//     ];

//     return (
//         <div id="New_request">
//             {/* <div className="guidereq_head">
//                 <div className="guidereq_img">
//                     <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=105&w=145&h=97" alt="" />
//                 </div>
//                 <div>
//                     <h2>Abc </h2>
//                     <p>Phd in Phycology</p>
//                 </div>
                
//             </div> */}
            

//             <h2>New Request</h2>
//             <div className="new_requests">
//                 {newGuideRequestsData.map((request, index) => (
//                     <div className="new_request" key={index}>
//                         <div className="student_img">
//                             <img src={img1} alt="" />
//                         </div>
//                         <div className="greq_head">
//                             <h3>{request.name}</h3>
//                             <p>{request.desc}</p>
//                         </div>
//                         <div className="greq_contact">
//                             <p>view more {request.email}</p>
//                             {/* <p>Mobile: {request.mobile}</p> */}
//                             {/* <p>Applied on: {request.appliedDate}</p> */}
//                         </div>
//                         <div className="greq_button">
//                             <button>Accept</button>
//                             <button>Decline</button>
//                         </div>
//                     </div>
//                 ))}

            return {
              ...request,
              name: studentDetails.dissertationName,
              email: studentemail.data,
              desc: studentDetails.dissertationDesc
            };
          })
        );
        setRequests(requestsWithDetails);
      } else if (response.status === 404) {
        console.log(response.data);
        setRequests([]);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleReqStatus = async (std, guide, reqstatus) => {
    try {
      const response = await axios.put(`http://localhost:8080/requestConnection/changeStatus/${std}/${guide}/${reqstatus}`);
      console.log(response.data);
      setSubmitMessage(response.data);
      setRefresh(!refresh); // Toggle refresh to trigger page reload
    } catch (error) {
      console.log("Error accepting request", error);
    }
  };

  return (
    <div id="New_request">
      {submitMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {submitMessage}
        </div>
      )}
      <h2>New Requests</h2>
      <div className="new_requests">
        {requests
          .filter(request => request.reqStatus === "N/A") // Filter requests with status "N/A"
          .map((request, index) => (
            <div className="new_request" key={index}>
              <div className="student_img">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=105&w=145&h=97"
                  alt=""
                />
              </div>
              <div className="greq_head">
                <h3>{request.name}</h3>
                <br />
                <p>{request.desc}</p>
              </div>
              <div className="greq_contact">
                <p>Email: {request.email}</p>
                <p className="greq_link">
                  <Link to={`/rdfActions/viewrdf/${request.reqStudent}`}>
                    View Details about Dissertation
                  </Link>

                </p>
{/*                 //<p>{request.reqStudent}</p> */}
              </div>
              <div className="greq_button">
                <button className="greq_btn" onClick={() => handleReqStatus(request.reqStudent, request.reqGuide, "Accept")}>Accept</button>
                <button className="greq_btn" onClick={() => handleReqStatus(request.reqStudent, request.reqGuide, "Decline")}>Decline</button>
              </div>

            </div>
          ))}
      </div>
    </div>
  );
};

export default NewGuideRequest;
