import { Link, useParams } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css'
import './dashboard.css'
import CircularProgressBar from "../Progress/CircularProgressBar";
import { FaChevronRight, FaCaretRight } from "react-icons/fa";
import Photo1 from '../../images/photo1.png';
import Lottie from 'react-lottie';
import animationData from './Student.json';
import { useEffect, useState } from "react";

const Profile = () => {
  const [tasks,setTasks]=useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  const [completeTasks, setCompleteTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [credits,setCredits]=useState(0);
  const [totalCredits,setTotalCredits]=useState(0);
  const { studentid } = useParams();
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



  const day = 75;
  const totalDays = 300;
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ProgressService.getProgress();
        setProgress(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);


  const fetchEvents = async () => {
    try {
      const currentDate = new Date("2024-04-05"); // Get the current date
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
            const noteDate = new Date(item.date);
            return formattedDateForComparison === noteDate.toISOString().slice(0, 10);
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
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [studentid]);
  useEffect(()=>{
    let total=tasks.length;
    let complete=0;
    let credit=0;
    let totalCredit=0
    tasks.forEach(task => {
      if (task.approvalStage === 'Approved') {
        complete++;
      }
      credit+=task.revCredits;
      totalCredit+=task.maxCredits;
      setTotalCredits(totalCredit);
      setCredits(credit);
      setCompleteTasks(complete);
      setTotalTasks(total);
    });
   })
  

 const pendingTasks = totalTasks - completeTasks;
 const completeProgress = (completeTasks / totalTasks) * 100 || 0;
 const pendingProgress = (pendingTasks / totalTasks) * 100 || 0;
 const creditProgress=(credits/totalCredits)*100 || 0;
 const overallProgress= (((completeProgress)+(pendingProgress*0.5)+(creditProgress*2))/3).toFixed(2);


 if (loading) {
  return <div>Loading...</div>;

}
  return <div className="common-pg-contents">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="#">Student</a></li>
        <li className="breadcrumb-item active" aria-current="page">Dissertation</li>
      </ol>
    </nav>
    <div className=" common-pg-dashboard-content">

      <div className=' common-pg-project-div row'>
        <div className=" common-pg-student-name col-sm-12 col-md-4 col-lg-4">
          <div className="common-pg-profile-img"><img src={Photo1} alt="" className="common-pg-profile-pic" /></div>
          <div className="common-pg-profile-detail">
            <h4>Shruti Patel</h4>
            <p id="common-pg-field">Computer Science and Engineering</p>
            <p id="common-pg-college">Maharaja Sayajirao University</p>
          </div>

        </div>
        <div className="common-pg-project-overviews col-sm-12 col-md-2 col-lg-2">Project: <p id="common-pg-project-name">Lorem ipsum dolor sit amet consectetur adipisicing.</p></div>
        <div className="common-pg-project-overviews col-sm-12 col-md-2 col-lg-2">
          <div className="common-pg-calender-icon">
            <span className="common-pg-handle-one"></span>
            <span className="common-pg-handle-two"></span>
            <div className="common-pg-block"></div>
            <div className="common-pg-day-left">75</div>
          </div>
          <p>days remaining</p>
        </div>
        <div className="common-pg-anime col-sm-12 col-md-2 col-lg-2"><MyLottieAnimation /></div>

      </div>
      <div className=' common-pg-additional-div'>
        <div className=" common-pg-project-details">
          <p>Description </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatem repellendus eos ab excepturi rerum facilis vero quam quisquam ratione. Suscipit eligendi quis sed nostrum iure dolor optio rerum quae quam dolore earum quidem ut quas blanditiis repudiandae voluptatibus, nobis est explicabo totam vitae beatae cupiditate alias dolores accusamus. Vitae sequi ducimus ratione corporis asperiores fugit suscipit nemo iure alias. Voluptatem vel magni, necessitatibus maxime aliquam asperiores doloremque cum dolorem nesciunt et assumenda? Ipsam nulla similique veritatis consequatur, sapiente et adipisci corporis doloremque rerum eum delectus. Laboriosam natus fuga modi repellendus error magnam maxime eveniet architecto atque totam molestiae repellat, quam, quo sapiente. Distinctio, libero cupiditate minus quam adipisci itaque accusantium consectetur tempora veritatis. Quo beatae deserunt voluptate tenetur quia non dolorum possimus. Iste voluptates atque aperiam? Commodi, necessitatibus! Ad consequatur neque, rerum voluptates impedit modi vitae dignissimos alias culpa mollitia magni laborum beatae sunt, eveniet distinctio fuga. Veniam, deserunt!</p>
          <p><span>Start Date:</span> <span>21 feb 2024</span> <span>End Date: </span> <span>21 feb 2024</span></p>
        </div>
        <div className="common-pg-task-details row">
          <div className=" common-pg-overall-progress col-sm-12 col-md-6 col-lg-6">
            <div class="common-pg-wrapper">
              <div class="common-pg-lid one"></div>
              <div class="common-pg-lid two"></div>
              <div class="common-pg-envelope">Overall Progress</div>
              <div class="common-pg-letter">
                {progress.map(progress => (
                  <p style={{ display: 'flex', justifyContent: 'center' }}><CircularProgressBar percentage={progress.overallProgressRate} /></p>
                ))}
              </div>
            </div>
          </div>
          <div className=" common-pg-todays-task col-sm-12 col-md-6 col-lg-6">
            <h6>Todays Schedule</h6>
            <ul className='common-pg-today-task-ul'>
              {task.map((task) => (
                task.event ? (
                  <li key={task.id}><FaCaretRight/><span>{task.event}, {task.description} &nbsp; &nbsp; {new Date(task.from).toISOString().slice(11, 16)} to {new Date(task.to).toISOString().slice(11, 16)}</span></li>
                ) : (
                  <li key={task.id}><FaCaretRight/><span>{task.notes}</span></li>
                )

              ))}

            </ul>
            <Link to={`schedule`}><button className="common-pg-view-all">View all <FaChevronRight /></button></Link>
          </div>
        </div>
      </div>
    </div></div>;
};

export default Profile;
