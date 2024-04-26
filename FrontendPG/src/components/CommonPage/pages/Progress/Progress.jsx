import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './progress.css'
import { FaDownload, FaList } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import CircularProgressBar from './CircularProgressBar';

const tasks = [
  { task: 'Task 1', status: 'On Track', progress: '100%', date: '2022-03-10', priority: 'High', approvalStage: 'Approved', mentor: 'John Doe' },
  { task: 'Task 2', status: 'Delayed', progress: '50%', date: '2022-03-15', priority: 'Medium', approvalStage: 'Pending Approval', mentor: 'Jane Smith' },
  // Add more tasks as needed
];


const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'yellow';
    case 'Delayed':
      return 'red';
    case 'On Track':
      return 'green';
    case 'Approved':
      return 'green';
    default:
      return 'black';
  }
};

const getPriorityColor = (priority) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'red';
    case 'medium':
      return 'orange';
    case 'low':
      return 'yellow';
  }
}

const getApprovalColor = (approval) => {
  switch (approval) {
    case 'Approved':
      return 'lightgreen';
    case 'Rejected':
      return 'red';
    case 'Pending':
      return 'yellow';
  }
}

const Progress = () => {
  const [tasks, setTasks] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { studentid } = useParams();
  const [completeTasks, setCompleteTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [credits,setCredits]=useState(0);
  const [totalCredits,setTotalCredits]=useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(prevPercentage => (prevPercentage + 10) % 100);
    }, 1000);

    return () => clearInterval(interval);
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

  const timelineData = [
    { title: 'Step 1', progress: 20 },
    { title: 'Step 2', progress: 50 },
    { title: 'Step 3', progress: 80 },
    { title: 'Step 4', progress: 100 }
  ];

  
  return (
    <div className='common-pg-contents'>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/${studentid}/studentguide`}>Dissertation</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Progress</li>
        </ol>
      </nav>
      <div className="container common-pg-progress-section row">
       
          <div>
            <div className="common-pg-progress-circles row col-sm-12 container">
              <div className='common-pg-progress-ring col-sm-3'><CircularProgressBar percentage={creditProgress} />CR Progress</div>
              <div className='common-pg-progress-ring col-sm-3'><CircularProgressBar percentage={pendingProgress} />Pending Tasks</div>
              <div className='common-pg-progress-ring col-sm-3'><CircularProgressBar percentage={completeProgress} />Completed Tasks</div>
            </div>
            {/* <div className="common-pg-timeline-div  col-sm-12 col-md-12 col-lg-12">
              <div className="common-pg-time-line">
                <ul>
                  <li data-escena="Intro" className="checkpoint">
                    0
                  </li>
                  <li>
                    <progress value="200" max="200"></progress>
                  </li>
                  <li data-escena="uno" className="checkpoint">
                    1
                  </li>
                  <li>
                    <progress value="100" max="200"></progress>
                  </li>
                  <li data-escena="dos" className="checkpoint">
                    2
                  </li>
                  <li>
                    <progress value="0" max="100"></progress>
                  </li>
                  <li data-escena="tres" className="checkpoint">
                    3
                  </li>
                  <li>
                    <progress value="0" max="100"></progress>
                  </li>
                  <li data-escena="cuatro" className="checkpoint">
                    4
                  </li>
                  <li>
                    <progress value="0" max="100"></progress>
                  </li>
                  <li data-escena="Completed" className="checkpoint">
                    5
                  </li>
                </ul>
              </div>
            </div> */}
            <div className="common-pg-progress-table-div col-sm-12">
              <table className='common-pg-progress-table'>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Priority</th>
                    <th>Max Credits</th>
                    <th>Received Credits</th>
                    <th>Approval Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks && tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.taskName}</td>
                      <td><span className="status-dot" style={{ backgroundColor: getStatusColor(task.status) }}></span>{task.status}</td>
                      <td>{new Date(task.startDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                      })} <br /> to <br /> {new Date(task.endDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                      })}</td>
                      <td><div className='priority' style={{ backgroundColor: getPriorityColor(task.priority) }}>{task.priority}</div></td>
                      <td>{task.maxCredits}</td>
                      <td>{task.revCredits}</td> 
                      <td><div className='approval' style={{ backgroundColor: getApprovalColor(task.approvalStage) }}>{task.approvalStage}</div></td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
     
      </div>
    </div>
  );
};

export default Progress;
