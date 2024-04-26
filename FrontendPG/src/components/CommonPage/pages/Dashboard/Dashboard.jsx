import { Link, useParams } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css'
import './dashboard.css'
import CircularProgressBar from "../Progress/CircularProgressBar";
import { FaChevronRight, FaCaretRight } from "react-icons/fa";
import Photo1 from '../../images/photo1.png';
import Lottie from 'react-lottie';
import animationData from './Student.json';
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from '../../../../AuthContext';

const Profile = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState([]);
  const [completeTasks, setCompleteTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [credits,setCredits]=useState(0);
  const [totalCredits,setTotalCredits]=useState(0);
  const [studentDetails , setStudentDetails] = useState({});

  const { studentid } = useParams();
  const{userRole} = useAuth();
  console.log("Role : ",userRole);
  console.log("student id coming from dashboard : ",studentid);
  const MyLottieAnimation = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return <Lottie options={defaultOptions} />;
  };

  useEffect(() => {
    fetchStudent();
  }, [studentid]);

  const fetchStudent = async()=>{
    try
    {
      console.log("Checking id : ",studentid);
      const dissresp = await axios.get(`http://localhost:8080/api/auth/dissertations/getmydissertation/${studentid}`);
      console.log(dissresp.data);

      const studentval = dissresp.data.studentId;
      console.log("STUDENT FROM DISSERTATION : ",studentval);

      const stdresp = await axios.get(`http://localhost:8080/api/auth/student/getmongoid/${studentval}`);
      console.log(stdresp.data);

      

      // Calculate end date
const endDate = new Date(
  new Date(studentDetails.dstart).getTime() + 365 * 24 * 60 * 60 * 1000
);

// Calculate difference in milliseconds between end date and today's date
const timeDifference = endDate.getTime() - new Date().getTime();

// Convert milliseconds to days
const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
console.log("TIME : ",daysRemaining);

setStudentDetails({
  name : stdresp.data.name,
  branch : stdresp.data.branch,
  dname : dissresp.data.dissertationName,
  ddesc : dissresp.data.dissertationDesc,
  dstart : dissresp.data.drtstartDate,
  dend : endDate,
  drem : daysRemaining,
  image : stdresp.data.image_url
});

    }
    catch(error)
    {
      console.log("Error while fetching student details in common page dashboard :", error);
    }
  };


  const day = 75;
  const totalDays = 300;

  const fetchEvents = async () => {
    try {
      const currentDate = new Date(); // Get the current date
      const response = await fetch(`http://localhost:8080/${studentid}/studentguide/schedule`);
      const data = await response.json();

      const formattedDate = currentDate.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');
      console.log(formattedDate)

      const formattedDateForComparison = formattedDate.split('-').reverse().join('-');

      if (data) {
        const filteredEvents = data.filter(item => {
          if (item.event && item.from && item.to) {
            const eventFromDate = new Date(item.from);
            const eventToDate = new Date(item.to);
            return formattedDateForComparison >= eventFromDate.toISOString().slice(0, 10) &&
              formattedDateForComparison <= eventToDate.toISOString().slice(0, 10);
          }
          return false;
        }).slice(0, 3); // Limit the number of events to 3

        const filteredNotes = data.filter(item => {
          if (item.notes) {
            // const noteDate = new Date(item.date);
            // return formattedDateForComparison === noteDate.toISOString().slice(0, 10);
            const noteDate = new Date(item.date);
            noteDate.setDate(noteDate.getDate() - 1); // Subtract one day
            eventDates.push(noteDate.toDateString());
          }
          return false;
        }).slice(0, 3);

        const filteredTasks = [...filteredEvents, ...filteredNotes];

        if (filteredTasks.length > 0) {
          console.log('Tasks from API:', filteredTasks); // Log the tasks if they exist
          setTasks(filteredTasks);
        } else {
          console.log('No tasks found for the selected day');
          setTasks([]);
        }
      } else {
        console.log('No events or notes found in the response');
        setTasks([]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);



  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:8080/${studentid}/progress`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const progresses = await response.json();
        setProgress(progresses);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [studentid]);
  useEffect(() => {
    let total = progress.length;

    let complete = 0;
    let credit = 0;
    let totalCredit = 0
    tasks.forEach(task => {
      if (task.approvalStage === 'Approved') {
        complete++;
      }
      credit += task.revCredits;
      totalCredit += task.maxCredits;
      setTotalCredits(totalCredit);
      setCredits(credit);
      setCompleteTasks(complete);
      setTotalTasks(total);
    });
  })

  const pendingTasks = totalTasks - completeTasks;
  const completeProgress = (completeTasks / totalTasks) * 100 || 0;
  const pendingProgress = (pendingTasks / totalTasks) * 100 || 0;
  const creditProgress = (credits / totalCredits) * 100 || 0;
  const overallProgress = (((completeProgress) + (pendingProgress * 0.5) + (creditProgress * 2)) / 3).toFixed(2);

  return <div className="common-pg-contents">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          {/* <Link to={`/studentdashboard/${studentid}`}>Student</Link> */}
          { userRole === 'guide' ? (
                            <Link to="#">Student</Link>

                        ) : (
                          <Link to={`/studentdashboard/${studentid}`}>Student</Link>

                        )}
          </li>
        <li className="breadcrumb-item active" aria-current="page">Dissertation</li>
      </ol>
    </nav>
    <div className=" common-pg-dashboard-content">

      <div className=' common-pg-project-div row'>
        <div className=" common-pg-student-name col-sm-12 col-md-4 col-lg-4">
          <div className="common-pg-profile-img"><img src={studentDetails.image} alt="" className="common-pg-profile-pic" /></div>
          <div className="common-pg-profile-detail">
            <h4>{studentDetails.name}</h4>
            <p id="common-pg-field">{studentDetails.branch}</p>
            <p id="common-pg-college">Maharaja Sayajirao University</p>
          </div>

        </div>

        

        <div className="common-pg-project-overviews col-sm-12 col-md-2 col-lg-2">Project: <p id="common-pg-project-name">{studentDetails.dname}</p></div>
        <div className="common-pg-project-overviews col-sm-12 col-md-2 col-lg-2">
          <div className="common-pg-calender-icon">
            <span className="common-pg-handle-one"></span>
            <span className="common-pg-handle-two"></span>
            <div className="common-pg-block"></div>
            <div className="common-pg-day-left">{studentDetails.drem}</div>
          </div>
          <p>days remaining</p>
        </div>
        <div className="common-pg-anime col-sm-12 col-md-2 col-lg-2"><MyLottieAnimation /></div>

      </div>
      <div className=' common-pg-additional-div'>
        <div className=" common-pg-project-details">
          <p style={{fontWeight:"bold"}}>Description </p>
          <p>{studentDetails.ddesc}</p>
          <p><span style={{fontWeight:"bold"}}>Start Date:</span> <span>{new Date(studentDetails.dstart).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}&nbsp;&nbsp;&nbsp;</span> <span style={{fontWeight:"bold"}}>End Date: </span>{" "}
                      <span>
                        {new Date(
                          new Date(studentDetails.dstart).getTime() + 365 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </span></p>
        </div>
        <div className="common-pg-task-details row">
          <div className=" common-pg-overall-progress col-sm-12 col-md-6 col-lg-6">
            <div class="common-pg-wrapper">
              <div class="common-pg-lid one"></div>
              <div class="common-pg-lid two"></div>
              <div class="common-pg-envelope">Overall Progress</div>
              <div class="common-pg-letter">

                <p style={{ display: 'flex', justifyContent: 'center' }}><CircularProgressBar percentage={overallProgress} /></p>

              </div>
            </div>
          </div>
          <div className="common-pg-todays-task col-sm-12 col-md-6 col-lg-6">
            <h6>Todays Schedule</h6>
            {tasks.length > 0 ? (
              <ul className='common-pg-today-task-ul'>
                {tasks.map((task) => (
                  task.event ? (
                    <li key={task.id}><FaCaretRight /><span>{task.event}, {task.description} &nbsp; &nbsp; {new Date(task.from).toISOString().slice(11, 16)} to {new Date(task.to).toISOString().slice(11, 16)}</span></li>
                  ) : (
                    <li key={task.id}><FaCaretRight /><span>{task.notes}</span></li>
                  )
                ))}
              </ul>
            ) : (
              <p>No events for today</p>
            )}
            {tasks.length > 0 && (
              <Link to={`schedule`}><button className="common-pg-view-all">View all <FaChevronRight /></button></Link>
            )}
          </div>

        </div>
      </div>
    </div></div>;
};

export default Profile;
