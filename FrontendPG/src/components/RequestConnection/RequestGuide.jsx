import React, { useEffect, useState } from "react";
import "./RequestGuide.css";
import img1 from "../../assests/techo-home.png";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../../AuthContext";

const RequestGuide = () => {
    const [submitMessage, setSubmitMessage] = useState('');
    const [successGuide, setSuccessGuide] = useState('');
    const [guides, setGuides] = useState([]);
    const [sendSuccess,setSendSuccess]=useState(false);
    const [sendError,setSendError]=useState(false);
    const [notification,setNotification]=useState({});

    const navigate = useNavigate();

    const{authenticated, id , useremail} = useAuth();
    console.log(authenticated);
    console.log("ID FROM PARAMS : ",id);
    console.log("MAIL CHECK : ",useremail);

    //const stdid = id;

    useEffect(() => {
        if (!authenticated) {
            // If the user is not authenticated, redirect to the login page
            navigate('/login');
        } else {
            fetchGuides();
        }
    }, [id]);

    // useEffect(() => {
    //     // console.log("Authenticated:", authenticated);
    //     // console.log("ID:", id);
    //     fetchGuides();
    // }, [authenticated, id]);
    
    const fetchGuides = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/guide');

            const updatedGuides = await Promise.all(response.data.map(async (guide) => {
                const guideStatus = await axios.get(`http://localhost:8080/checkAvailability/checkfor/${guide.id}`);
                const availability = guideStatus.data;
                return { ...guide, status: availability };
            }));

            setGuides(updatedGuides);
        } catch (error) {
            console.error('Error fetching guides:', error);
        }
    };


    const handleRequest = async (e, gid) => {
        e.preventDefault();
        console.log("Hello from handle");
        try {

            const std = await axios.get(`http://localhost:8080/api/auth/student/getuserid/${useremail}`);
 const stdid = std.data;
 console.log("Check : ",stdid);
console.log("Hello from handle p1");
            const rdf = await axios.get(`http://localhost:8080/rdfActions/getrdf/from/${stdid}`);
            const rdfresponse = rdf.data;
            console.log("RDF : ",rdfresponse);

            const requestBody = {
                ReqStudent: stdid,
                RdfId: rdfresponse,
                ReqGuide: gid
            };
            console.log(requestBody)
            console.log("Hello from handle p2");
            await axios.post(`http://localhost:8080/requestConnection/addReqBy/${stdid}/with/${rdfresponse}/to/${gid}`, requestBody);
            console.log("Request Sent");

            const res = await axios.get(`http://localhost:8080/api/auth/guide/getmailfromid/${gid}`);

            let today=new Date();
    
    
    setNotification({
        senderId:useremail,
        receiverId:res.data,
        createdAt:today,
        type:'New Request',
        link:'http://localhost:5173/mentorprofile/request'
});

        const response=axios.post('http://localhost:8080/api/auth/notification',notification);
        if((await response).status===200){
          console.log('Notification send');
          setSendSuccess(true);
          setSendError(false);
        }
        else{
            setSendError(true);
            setSendSuccess(false);
        }
        console.log(notification);
        
    

           
        setSubmitMessage("Request Sent Successfully");
            setSuccessGuide(gid); // Set the guide for which the request was sent successfully
        } catch (error) {
            console.error('Error while handling request:', error);
        }
    };

    return (
        <div className="rg-main-bg">
            <h3 className="rg-heading">Explore Guides for your Dissertation</h3>
            <hr />
            <div className="rg-back-div">
                {guides.map(guide => (
                    <div className="rg-card" key={guide.guideId}>
                        <div className="rg-divider">
                            <img src={img1} alt="name" className="rg-dp" />
                        </div>
                        <div>
                            <h4 className="rg-name">{guide.name}</h4>
                            <p className="rg-name">{guide.areaOfSpecialization}</p>
                            <p className="rg-name">Status: {guide.status}</p>
                            <div className="rg-buttonCont">

                                <button className="rg-btn" id="rg-guide-details">Details</button>
                                {guide.status !== "Occupied" && (
                                    <button className="rg-btn" id="rg-guide-connect" onClick={(e) => handleRequest(e, guide.id)}>Connect</button>
                                )}
                                {guide.status === "Occupied" && (
                                    <button className="rg-btn-disabled" id="rg-guide-connect" disabled>Connect</button>
                                )}
                            </div>
                            <div>
                            
                            {successGuide === guide.guideId && (
                                    <div className="alert alert-success mt-3" role="alert">
                                        {submitMessage}
                                    </div>
                                )}

{sendSuccess && (
            <div className="alert alert-success" role="alert">
              Notification sent successfully!
            </div>
          )}
          {sendError && (
            <div className="alert alert-danger" role="alert">
              Failed to send notification.
            </div>
                    )}
                        </div>
                    </div>
                    </div>
                ))}
        </div>
        </div>
    );
};

export default RequestGuide;

// import React, { useEffect, useState } from "react";
// import "./RequestGuide.css";
// import img1 from "../../assests/techo-home.png";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; 
// import { useAuth } from "../../AuthContext";

// const RequestGuide = () => {
//     const [submitMessage, setSubmitMessage] = useState('');
//     const [successGuide, setSuccessGuide] = useState('');
//     const [guides, setGuides] = useState([]);
//     const [sendSuccess, setSendSuccess] = useState(false);
//     const [sendError, setSendError] = useState(false);
//     const [userEmail, setUserEmail] = useState('');

//     const navigate = useNavigate();
//     const { authenticated, id, useremail } = useAuth();
//     console.log(id);

//     const stdid = id;

//     useEffect(() => {
//         if (!authenticated) {
//             // If the user is not authenticated, redirect to the login page
//             navigate('/login');
//         } else {
//             fetchGuides();
//             setUserEmail(useremail); // Set userEmail once the component mounts
//         }
//     }, []);

//     const fetchGuides = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/auth/guide');

//             const updatedGuides = await Promise.all(response.data.map(async (guide) => {
//                 const guideStatus = await axios.get(`http://localhost:8080/checkAvailability/checkfor/${guide.guideId}`);
//                 const availability = guideStatus.data;
//                 return { ...guide, status: availability };
//             }));

//             setGuides(updatedGuides);
//         } catch (error) {
//             console.error('Error fetching guides:', error);
//         }
//     };


//     const handleRequest = async (e, gid) => {
//         e.preventDefault();
//         try {
//             const rdf = await axios.get(`http://localhost:8080/rdfActions/getrdf/from/${stdid}`);
//             const rdfresponse = rdf.data;

//             const requestBody = {
//                 ReqStudent: stdid,
//                 RdfId: rdfresponse,
//                 ReqGuide: gid
//             };

//             await axios.post(`http://localhost:8080/requestConnection/addReqBy/${stdid}/with/${rdfresponse}/to/${gid}`, requestBody);
//             console.log("Request Sent");

//             const res = await axios.get(`http://localhost:8080/api/auth/guide/getmailfromid/${gid}`);

//             let today = new Date();

//             const notification = {
//                 senderId: userEmail, // Use userEmail obtained from the state
//                 receiverId: res.data,
//                 createdAt: today,
//                 type: 'New Request',
//                 link: 'http://localhost:5173/mentorprofile/request'
//             };

//             const response = await axios.post('http://localhost:8080/api/auth/notification', notification);
//             if (response.status === 200) {
//                 console.log('Notification send');
//                 setSendSuccess(true);
//                 setSendError(false);
//             } else {
//                 setSendError(true);
//                 setSendSuccess(false);
//             }
//             console.log(notification);

//             setSubmitMessage("Request Sent Successfully");
//             setSuccessGuide(gid); // Set the guide for which the request was sent successfully
//         } catch (error) {
//             console.error('Error while handling request:', error);
//         }
//     };

//     return (
//         <div className="rg-main-bg">
//             <h3 className="rg-heading">Explore Guides for your Dissertation</h3>
//             <hr />
//             <div className="rg-back-div">
//                 {guides.map(guide => (
//                     <div className="rg-card" key={guide.guideId}>
//                         <div className="rg-divider">
//                             <img src={img1} alt="name" className="rg-dp" />
//                         </div>
//                         <div>
//                             <h4 className="rg-name">{guide.name}</h4>
//                             <p className="rg-name">{guide.areaOfSpecialization}</p>
//                             <p className="rg-name">Status: {guide.status}</p>
//                             <div className="rg-buttonCont">

//                                 <button className="rg-btn" id="rg-guide-details">Details</button>
//                                 {guide.status !== "Occupied" && (
//                                     <button className="rg-btn" id="rg-guide-connect" onClick={(e) => handleRequest(e, guide.guideId)}>Connect</button>
//                                 )}
//                                 {guide.status === "Occupied" && (
//                                     <button className="rg-btn-disabled" id="rg-guide-connect" disabled>Connect</button>
//                                 )}
//                             </div>
//                             <div>
//                                 {successGuide === guide.guideId && (
//                                     <div className="alert alert-success mt-3" role="alert">
//                                         {submitMessage}
//                                     </div>
//                                 )}

//                                 {sendSuccess && (
//                                     <div className="alert alert-success" role="alert">
//                                         Notification sent successfully!
//                                     </div>
//                                 )}
//                                 {sendError && (
//                                     <div className="alert alert-danger" role="alert">
//                                         Failed to send notification.
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default RequestGuide;
