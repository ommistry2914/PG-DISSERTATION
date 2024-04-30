
import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";
import img1 from "../../assests/techo-home.png";
import { FaChalkboardTeacher, FaUserEdit } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { HiTrendingUp } from "react-icons/hi";
import { GrTemplate } from "react-icons/gr";
import { SiGoogleforms } from "react-icons/si";
import axios from "axios";
import {Link} from 'react-router-dom';
import { useParams } from "react-router-dom";


import NewSBar from "../CommonPage/UI/Sidebar/NewSBar";
import { studentbardata } from "../CommonPage/UI/Sidebar/sidebardata";

const StudentDashboard = () => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [notify,setNotify]=useState([]);
  const [events,setEvents]=useState([]);
  const [details, setDetails] = useState();
  const [greeting, setGreeting] = useState();
  const [notification , setNotification] = useState();
  const [t1, setT1] = useState(0); // Initialize with default value 0
  const [t2, setT2] = useState(0); // Initialize with default value 0
  const [t3, setT3] = useState(0); // Initialize with default value 0
  const [t4, setT4] = useState(0); // Initialize with default value 0


  const { studentId } = useParams();
  console.log(studentId);

  const hideCalendar = () => {
    setShowCalendar(false);
  };
  const today = new Date();
  const showCalendarAgain = () => {
    setShowCalendar(true);
  };
  let count=0;
  useEffect(()=>{
    const fetchNotification=async ()=>{
       try {
            const res=await axios.get('http://localhost:8080/xyz/studentguide/schedule/events');
            setEvents(res.data);
            console.log(events.length)
            events.forEach(async date=>{
              const to=new Date(date.to);
              //const formattedDate = `${today.getFullYear()}-${(today.getMonth()+1) < 10 ? '0' : ''}${(today.getMonth()+1)}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`;
              if(today>to && !date.completionStatus && date.notify){
                console.log(date.completionStatus)
                console.log(date.notify);
                console.log(date.event);
                 count++;
                const notification={
                  senderId:'xyz',
                  receiverId:'xyz',
                  createdAt:today,
                  type:`${date.event} date passed!!`,
                  link:`Event added`
              }

              try {
                const getNotification=async()=>{
                  const res=await axios.get('http://localhost:8080/api/auth/notification/receiverId/abc@gmail.com');
                  setNotify(res.data);
                  console.log(notify);
                  notify.forEach(async send=>{
                     console.log(send.type);
                  });
                }
               getNotification();
              } catch (error) {
                console.log(error)
              }
              

              /**notify.forEach(async data=>{
                 if(data.type==(`${date.event} date passes!!`)){
                  const response=axios.post('http://localhost:8080/api/auth/notification',notification);
                  console.log((await response).data);       
                    console.log('notify!!');
                 }
              }); */
              
              }
              console.log(count);
            })
      } catch (error) {
        console.log(error);
      }
  
    };
    fetchNotification();
    
  },[])
  
  useEffect(() => {
    console.log("Loading Student Dashboard Details.......");
    console.log("UseEffect mein se values are sabse pehle :",t1,t2,t3,t4);
    fetchDetails();
    console.log("UseEffect mein se values are baadmein :",t1,t2,t3,t4);
  }, [studentId]);

  const fetchDetails = async () => {
    try {
      console.log("Hello before api");
      const response = await axios.get(
        `http://localhost:8080/api/auth/dissertations/getmydissertation/${studentId}`
      );
      if (response.status === 200) {
        console.log("RESPONSE : ",response.data);

        const stdemail = await axios.get(
          `http://localhost:8080/api/auth/student/getuseremail/${studentId}`
        );
        console.log("EMAIL KE LIYE DATA : ",stdemail.data);
        const smail = stdemail.data;

        const std = await axios.get(
          `http://localhost:8080/api/auth/student/getstd/${smail}`
        );
        console.log("EMAIL SE FETCHED DATA : ",std.data);

        const name = std.data.name;


        const currentTime = new Date().getHours();

    if (currentTime >= 6 && currentTime < 12) {
      setGreeting('Good Morning!');
    } else if (currentTime >= 12 && currentTime < 18) {
      setGreeting('Good Afternoon!');
    } else {
      setGreeting('Good Evening!');
    }

  
    const dissresp = await axios.get(`http://localhost:8080/api/auth/dissertations/getmydissertation/${studentId}`)
    console.log(dissresp.data);

    setDetails({
      ...response.data,
      stdname: name,
      dname:dissresp.data.dissertationName,
      dguide : dissresp.data.guideId,
      dstart : dissresp.data.drtstartDate,
      dstatus : dissresp.data.dissertationStatus,
      image : std.data.image_url
    });

    const email = await axios.get(`http://localhost:8080/api/auth/student/getstudentemail/for/${studentId}`);
    console.log("EMAIL : ",email.data);

    const notiresp = await axios.get(`http://localhost:8080/api/auth/notification/receiverId/${email.data}`);
    console.log("NOTIFICATION : ",notiresp.data);
    const val = notiresp.data.length;

    // Assuming `notificationTime` is the time when the notification was received
const notificationTime = new Date(notiresp.data.createdAt); // Example notification time

// Get the current time
const currenttime = new Date();

// Calculate the difference in milliseconds
const timeDifference = currenttime - notificationTime;

// Convert the time difference to minutes
const minutesPassed = Math.floor(timeDifference / (1000 * 60)); // 1000 milliseconds = 1 second, 60 seconds = 1 minute

console.log(`Time passed since notification: ${minutesPassed} minutes`);


    if(val != 0)
    {
      setNotification({
        sender : notiresp.data.senderId,
        type : notiresp.data.type,
        time : minutesPassed
      });
    }
    else{
      setNotification({
        ...notification,
        msg : "NO Notifications"
      })
    }

    console.log("in timeline");
    const diss = await axios.get(`http://localhost:8080/api/auth/dissertations/getmydissertation/${studentId}`);
    console.log("Timeline 1 : ",diss.data);

    const dissdata = diss.data;

    if(dissdata === "NO DISSERTATION")
    {
      setT1(0);
setT2(1);
setT3(1);
setT4(1);

// console.log("IN TIMELINE 1");
// console.log("t1 : ",t1);
// console.log("t2 : ",t2);
// console.log("t3 : ",t3);
// console.log("t4 : ",t4);
    }
    else
    {
      setT1(1);
      setT2(0);
      setT3(0);
      setT4(0);
    }


    const start = await axios.get(`http://localhost:8080/submissions/${studentId}`);
    console.log("Timeline 2 : ",start.data);

    const startdata = start.data;

    if(startdata === "Submission Exist")
    {
      setT1(1);
      setT2(1);
      setT3(0);
      setT4(0);
    }
    else
    {
      if(t1 === 1)
      {
        setT1(1);
      setT2(0);
      setT3(0);
      setT4(0);
      }
      else{
        setT1(0);
setT2(1);
setT3(1);
setT4(1);

// console.log("IN TIMELINE 2");
// console.log("t1 : ",t1);
// console.log("t2 : ",t2);
// console.log("t3 : ",t3);
// console.log("t4 : ",t4);
      }
    }


    const dateval = diss.data.drtstartDate;
    const sdate = new Date(dateval);
    const today = new Date();
    const checkdate = sdate - today;
    const monthsPassed = Math.floor(checkdate / (1000 * 60 * 60 * 24 * 30.436875));
    console.log("Timeline 3 : ",monthsPassed);

    if(monthsPassed >= 6)
    {
      setT1(1);
      setT2(1);
      setT3(1);
      setT4(0);
    }
    else
    {
      if(t1 === 1 && t2 === 1)
      {
        setT1(1);
      setT2(1);
      setT3(0);
      setT4(0);
      }
      else
      {
        setT1(0);
setT2(1);
setT3(1);
setT4(1);

// console.log("IN TIMELINE 3");
// console.log("t1 : ",t1);
// console.log("t2 : ",t2);
// console.log("t3 : ",t3);
// console.log("t4 : ",t4);
      }
    }

    const approval = await axios.get(`http://localhost:8080/${studentId}/progress`);
    console.log("Timeline 4 : ",approval.data);

    const size = approval.data.length;
    let count = 0;

    const approvaldata = approval.data;

    approvaldata.forEach(t => {

      if(t.approvalStage === "Approved")
      {
        count++;
      }
    });

    if(count > 0 && count == size)
    {
      setT1(1);
      setT2(1);
      setT3(1);
      setT4(1);

      const ans = await axios.put(`http://localhost:8080/api/auth/dissertations/`)

//       console.log("IN TIMELINE 4");
// console.log("t1 : ",t1);
// console.log("t2 : ",t2);
// console.log("t3 : ",t3);
// console.log("t4 : ",t4);
    }
    else
    {
      if(t1 === 1 && t2 === 1 && t3 === 1)
      {
        setT1(1);
      setT2(1);
      setT3(1);
      setT4(0);
      }
      else{
        setT1(0);
setT2(1);
setT3(1);
setT4(1);

// console.log("IN TIMELINE 4");
// console.log("t1 : ",t1);
// console.log("t2 : ",t2);
// console.log("t3 : ",t3);
// console.log("t4 : ",t4);
      }
    }

// setT1(0);
// setT2(1);
// setT3(1);
// setT4(1);
       
      } else if (response.status === 404) {
        console.log(response.data);
        setDetails(null); // or set empty object based on your requirements
      }
    } catch (error) {
      console.log("Error while fetching details in student dashboard:", error);
    }
  };



  return (
    <div className="sd-main-bg">
      <NewSBar sidebarData={studentbardata.map(item => {
        if (item.text === "Request Dissertation Form") {
          return {
            ...item,
            path: `/requestform/${studentId}`, // Update path with studentId
          };
        }
        else if (item.text === "My Dissertation") {
          return {
            ...item,
            path: `/${studentId}/studentguide`, // Update path with studentId
          };
        }
        return item;
      })} />

      {/*       <div className="sd-sidebar" style={{ width: showCalendar ? '20%' : '25%' }}> */}
      {/*         <h6 className="sd-heading"> */}
      {/*           PG DISSERTATION */}
      {/*         </h6> */}
      {/*         <ul className="sd-navlist"> */}
      {/*         <li><GrTemplate />&nbsp;&nbsp;&nbsp;Templates</li> */}
      {/*         <li><PiStudentFill />&nbsp;&nbsp;&nbsp;Past Work</li> */}
      {/*         <li><FaChalkboardTeacher />&nbsp;&nbsp;&nbsp;Request Guide */}
      {/*         </li> */}
      {/*         <li><HiTrendingUp />&nbsp;&nbsp;&nbsp;Trending Topics</li> */}
      {/*         <li><FaUserEdit />&nbsp;&nbsp;&nbsp;Edit Profile</li> */}
      {/*         <li><SiGoogleforms />&nbsp;&nbsp;&nbsp;Request &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dissertation Form</li> */}
      {/*         <Link to='/chatlogin'> */}
      {/*         <li><SiGoogleforms />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chatbox</li></Link> */}
      {/*         </ul> */}
      {/*       </div> */}

      <div
        className="sd-main-content"
        style={{ width: showCalendar ? "60%" : "100%" }}
      >
        <section className="sd-addressing">
          <img src={details ? details.image : "Student"} alt="userimg" className="sd-userimage"></img>
          <h2>Hello {details ? details.stdname : "Student"}, {greeting}</h2>
        </section>

        <div className="sd-status">
          <ul className="sd-step-wizard-list">
            <li className={`sd-step-wizard-item ${t1 === 0 ? 'sd-current-item' : ''}`}>
              <span className="sd-progress-count">1</span>
              <span className="sd-progress-label">Guide Assigned</span>
            </li>

            <li className={`sd-step-wizard-item ${t2 === 0 ? 'sd-current-item' : ''}`}>
              <span className="sd-progress-count">2</span>
              <span className="sd-progress-label">Started Working</span>
            </li>

            <li className={`sd-step-wizard-item ${t3 === 0 ? 'sd-current-item' : ''}`}>
              <span className="sd-progress-count">3</span>
              <span className="sd-progress-label">Dissertation Halfway</span>
            </li>

            <li className={`sd-step-wizard-item ${t4 === 0 ? 'sd-current-item' : ''}`}>
              <span className="sd-progress-count">4</span>
              <span className="sd-progress-label">Approved by Guide</span>
            </li>
          </ul>
        </div>
        <hr></hr>
        <h4 className="sd-dhead">Dissertations</h4>

        <section className="sd-currently-working sd-notification">
  <div className="sd-notititle">{details?.dname || "Dissertation Name"}</div>
  <br />
  <div className="sd-notibody">Guide :  &nbsp;<span>{details?.dguide ||  "Guide Name here"}</span></div>
  <br />
  <div className="sd-notibody">Date of Starting : &nbsp;<span>{details?.dstart || "Starting date"}</span></div>
  <br />
  <div className="sd-notibody">Status :  &nbsp;<span>{details?.dstatus || "status of dissertation"}</span></div>
  <br />
</section>

        {!showCalendar && (
          <button className="sd-bring-back-btn" onClick={showCalendarAgain}>
            Notifications
          </button>
        )}
      </div>

      {showCalendar && (
        <div className="sd-calendar">
          <h5>
            Notifications
            <button className="sd-close-btn" onClick={hideCalendar}>
              ×
            </button>
          </h5>

          {notification && notification.length > 0 ? (
  notification.map((message, index) => (
    <div className="sd-card" key={index}>
      <div className="sd-img"></div>
      <div className="sd-textBox">
        <div className="sd-textContent">
          <p className="sd-h1">{message.sender}</p>
          <span className="sd-span">{message.time} ago</span>
        </div>
        <p className="sd-p">{message.type}</p>
        <div></div>
      </div>
    </div>
  ))
) : (
  <div>
    <p>No Notifications</p>
  </div>
)}

          

        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
