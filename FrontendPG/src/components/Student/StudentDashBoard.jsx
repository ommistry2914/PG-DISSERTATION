
import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";
import img1 from "../../assests/techo-home.png";
import { FaChalkboardTeacher,FaUserEdit } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { HiTrendingUp } from "react-icons/hi";
import { GrTemplate } from "react-icons/gr";
import { SiGoogleforms } from "react-icons/si";
import axios from 'axios';
import {Link} from 'react-router-dom';


import Sidebar from '../CommonPage/UI/Sidebar/Sidebar';
import {  studentbardata } from '../CommonPage/UI/Sidebar/sidebardata';

const StudentDashboard = () => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [notify,setNotify]=useState([]);
  const [events,setEvents]=useState([]);

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
  

  return (
    <div className="sd-main-bg">
        <Sidebar sidebarData={studentbardata}/>


      <div className="sd-sidebar" style={{ width: showCalendar ? '20%' : '25%' }}>
        <h6 className="sd-heading">
          PG DISSERTATION
        </h6>
        <ul className="sd-navlist">
        <li><GrTemplate />&nbsp;&nbsp;&nbsp;Templates</li>
        <li><PiStudentFill />&nbsp;&nbsp;&nbsp;Past Work</li>
        <li><FaChalkboardTeacher />&nbsp;&nbsp;&nbsp;Request Guide
        </li>
        <li><HiTrendingUp />&nbsp;&nbsp;&nbsp;Trending Topics</li>
        <li><FaUserEdit />&nbsp;&nbsp;&nbsp;Edit Profile</li>
        <li><SiGoogleforms />&nbsp;&nbsp;&nbsp;Request &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dissertation Form</li>
        <Link to='/chatlogin'>
        <li><SiGoogleforms />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chatbox</li></Link>
        </ul>
      </div>

      <div className="sd-main-content" style={{ width: showCalendar ? '60%' : '100%' }}>
        <section className="sd-addressing">
          <img src={img1} alt="userimg" className="sd-userimage"></img>
          <h2>Hello Sakshi, Good Evening</h2>
        </section>

        <div className="sd-status">
          <ul className="sd-step-wizard-list">
          <li className="sd-step-wizard-item">
                <span className="sd-progress-count">1</span>
                <span className="sd-progress-label">Guide Assigned</span>
              </li>

              <li className="sd-step-wizard-item sd-current-item">
                <span className="sd-progress-count">2</span>
                <span className="sd-progress-label">Started Working</span>
              </li>

              <li className="sd-step-wizard-item">
                <span className="sd-progress-count">3</span>
                <span className="sd-progress-label">Dissertation Halfway</span>
              </li>

              <li className="sd-step-wizard-item">
                <span className="sd-progress-count">4</span>
                <span className="sd-progress-label">Approved by Guide</span>
              </li>

              <li className="sd-step-wizard-item">
                <span className="sd-progress-count">5</span>
                <span className="sd-progress-label">Approved by Dean</span>
              </li>
          </ul>
        </div>
        <hr></hr>
<h4 className="sd-dhead">Dissertations</h4>

        <section className="sd-currently-working sd-notification">
          <div className="sd-notititle">First dissertation</div>
          <br />
          <div className="sd-notibody">Guide: </div>
          <br />
          <div className="sd-notibody">Date of Starting:</div>
          <br />
          <div className="sd-notibody">Status: </div>
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
          
          <h5>Notifications
          <button className="sd-close-btn" onClick={hideCalendar}>×</button>
          </h5>
          
          
       <div className="sd-card">
  <div className="sd-img">
  </div>
  <div className="sd-textBox">
    <div className="sd-textContent">
      <p className="sd-h1">Clans of Clash</p>
      <span className="sd-span">12 min ago</span>
    </div>
    <p className="sd-p">Xhattmahs is not attacking your base!</p>
  <div>
</div></div></div>

<div className="sd-card">
  <div className="sd-img">
  </div>
  <div className="sd-textBox">
    <div className="sd-textContent">
      <p className="sd-h1">Clans of Clash</p>
      <span className="sd-span">12 min ago</span>
    </div>
    <p className="sd-p">Xhattmahs is not attacking your base!</p>
  <div>
</div></div></div>

<div className="sd-card">
  <div className="sd-img">
  </div>
  <div className="sd-textBox">
    <div className="sd-textContent">
      <p className="sd-h1">Clans of Clash</p>
      <span className="sd-span">12 min ago</span>
    </div>
    <p className="sd-p">Xhattmahs is not attacking your base!</p>
  <div>
</div></div></div>


        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
