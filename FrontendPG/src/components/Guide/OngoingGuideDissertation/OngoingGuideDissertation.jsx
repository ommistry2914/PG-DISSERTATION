// import './OngoingGuideDissertation.css';
// const OngoingGuideDissertation = ()=>{
//     return (
//         <>
//         <div id="gongoing_dissertation">
//         <div className="guidereq_head">
//             <div className="guidereq_img">
//             <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=105&w=145&h=97" alt="" />
//             </div>
//                 <div>
//                 <h2>Abc </h2>
//                 <p>Phd in Phycology</p>
//                 </div>
//             </div>
// <h2>Ongoing Dissertations</h2>
// <div className="guide_ongoingD">
//     <div className="guide_ongoingDis">
//         <div className="stu_img">
//             <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
//         </div>
//         <div className="ongoing_content">
//             <p>Topic: Lorem ipsum dolor sit amet</p>
//             <p>Name: ABC XYZ</p>
//             <p>Email: abc@gmail.com</p>
//             <button>View More</button>
//         </div>
//     </div>
//     <div className="guide_ongoingDis">
//         <div className="stu_img">
//             <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
//         </div>
//         <div className="ongoing_content">
//             <p>Topic: Lorem ipsum dolor sit amet</p>
//             <p>Name: ABC XYZ</p>
//             <p>Email: abc@gmail.com</p>
//             <button>View More</button>
//         </div>
//     </div>
//     <div className="guide_ongoingDis">
//         <div className="stu_img">
//             <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
//         </div>
//         <div className="ongoing_content">
//             <p>Topic: Lorem ipsum dolor sit amet</p>
//             <p>Name: ABC XYZ</p>
//             <p>Email: abc@gmail.com</p>
//             <button>View More</button>
//         </div>
//     </div>
//     <div className="guide_ongoingDis">
//         <div className="stu_img">
//             <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
//         </div>
//         <div className="ongoing_content">
//             <p>Topic: Lorem ipsum dolor sit amet</p>
//             <p>Name: ABC XYZ</p>
//             <p>Email: abc@gmail.com</p>
//             <button>View More</button>
//         </div>
//     </div>
//     <div className="guide_ongoingDis">
//         <div className="stu_img">
//             <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
//         </div>
//         <div className="ongoing_content">
//             <p>Topic: Lorem ipsum dolor sit amet</p>
//             <p>Name: ABC XYZ</p>
//             <p>Email: abc@gmail.com</p>
//             <button>View More</button>
//         </div>
//     </div>
// </div>
// </div>
//         </>
//     )
// }
// export default OngoingGuideDissertation;

import React, { useEffect, useState } from 'react';
import './OngoingGuideDissertation.css';



import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
//import { useParams } from 'react-router-dom';

const OngoingGuideDissertation = () => {
    const {authenticated, useremail}=useAuth();
    const [dissertation,setDissertations]=useState(null);
    const [loading, setLoading] = useState(true);

    // const {mailid} = useParams();
    // console.log("MAIL RECEIVED HERE : ",mailid);

    console.log("AUTH MAIL : ",useremail);
    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true)
            try {
                // const response=await axios.get(`http://localhost:8080/api/auth/guide/guideEmail/${useremail}`)
                // setGuides(response.data);

                const mail = await axios.get(`http://localhost:8080/api/auth/guide/getidbymail/${useremail}`);
                console.log("MAIL TO ID : ",mail.data);

                const response = await axios.get(`http://localhost:8080/api/auth/dissertations/getmyguidedissertation/${mail.data}`)
                console.log("RESPONSE : ",response.data);

                const fresp = response.data;
                

                if(response.data !== "No Record Available Currently")
                {
                    const dissertationsData = fresp.map(async dissertation => {
                        const stdid = dissertation.studentId;
                        console.log("Dissertation se id  : ",stdid);
                        const studentResponse = await axios.get(`http://localhost:8080/api/auth/student/givenamebranch/${stdid}`);
                        const studentData = studentResponse.data;
                        return {
                            dissertationName: dissertation.dissertationName,
                            studentName: studentData.name,
                            studentBranch: studentData.branch,
                            studentId : stdid,
                            email : useremail
                        };
                    });

                    const resolvedDissertationsData = await Promise.all(dissertationsData);
                    setDissertations(resolvedDissertationsData);
                }

            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        };
        fetchData();
    },[useremail]);

    // Dummy data representing ongoing dissertations
    // const ongoingDissertationsData = [
    //     {
    //         topic: 'Lorem ipsum dolor sit amet',
    //         name: 'ABC XYZ',
    //         email: 'abc@gmail.com'
    //     },
    //     {
    //         topic: 'Lorem ipsum dolor sit amet',
    //         name: 'ABC XYZ',
    //         email: 'abc@gmail.com'
    //     },
    //     {
    //         topic: 'Lorem ipsum dolor sit amet',
    //         name: 'ABC XYZ',
    //         email: 'abc@gmail.com'
    //     },
    //     {
    //         topic: 'Lorem ipsum dolor sit amet',
    //         name: 'ABC XYZ',
    //         email: 'abc@gmail.com'
    //     },
    //     {
    //         topic: 'Lorem ipsum dolor sit amet',
    //         name: 'ABC XYZ',
    //         email: 'abc@gmail.com'
    //     },
    //     {
    //         topic: 'Lorem ipsum dolor sit amet',
    //         name: 'ABC XYZ',
    //         email: 'abc@gmail.com'
    //     },
    //     {
    //         topic: 'Lorem ipsum dolor sit amet',
    //         name: 'ABC XYZ',
    //         email: 'abc@gmail.com'
    //     },
    //     // Add more ongoing dissertation objects as needed
    // ];

    const dataToSend = { receiver: 'xyz' };
   
    if (loading) {
        return <div>Loading...</div>;
    
    }
    return (
        <div id="New_request">
            {/* <div className="guidereq_head">
                <div className="guidereq_img">
                    <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=105&w=145&h=97" alt="" />
                </div>
                <div>
                    <h2>Abc </h2>
                    <p>Phd in Phycology</p>
                </div>
            </div> */}
            <h2>Ongoing Dissertations</h2>
            <div className="new_requests">
                {/* {ongoingDissertationsData.map((dissertation, index) => (
                    <div className="new_request" key={index}>
                        <div className="student_img">
                            <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
                        </div>
                        <div className="greq_head">
                            <p>Topic: {dissertation.topic}</p>
                            <p>Student: {dissertation.name}</p>
                            <p>Branch: {dissertation.email}</p>

                        </div>
                        <div className="greq_button">

                            <Link to={`allottask/${dissertation.email}`}><button>Allot Task</button></Link>
                            <Link to={`/${useremail}/studentguide/`}><button>View More</button></Link>

                        </div>
                    </div>
                ))} */}

{/*{dissertation.map((diss, index) => (
                    <div className="new_request" key={index}>
                        <div className="student_img">
                            <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
                        </div>
                        <div className="greq_head">
                            <p>Topic: {diss.dissertationName}</p>
                            <p>Student: {diss.studentName}</p>
                            <p>Branch: {diss.studentBranch}</p>
                        </div>
                        <div className="greq_button">
                            <Link to={`allottask/${useremail}`}><button>Allot Task</button></Link>
                            <Link to={`/${diss.studentId}/studentguide/`}><button>View More</button></Link>
                        </div>
                    </div>
                ))}*/}

{dissertation ? (
    dissertation.map((diss, index) => (
        <div className="new_request" key={index}>
            <div className="student_img">
                <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
            </div>
            <div className="greq_head">
                <p>Topic: {diss.dissertationName}</p>
                <p>Student: {diss.studentName}</p>
                <p>Branch: {diss.studentBranch}</p>
            </div>
            <div className="greq_button">
                <Link to={`/mentorprofile/ongoing/allottask/${diss.studentId}/alloted`}><button>Allot Task</button></Link>
                <Link to={`/${diss.studentId}/studentguide/`}><button>View More</button></Link>
            </div>
        </div>
    ))
) : (
    <div>No records available</div>
)}

            </div>
        </div>
    );
}

export default OngoingGuideDissertation;
