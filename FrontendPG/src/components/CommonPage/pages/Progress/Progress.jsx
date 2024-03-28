import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './progress.css'
import { FaDownload, FaList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
    default:
      return 'black';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'red';
    case 'Medium':
      return 'orange';
    case 'Low':
      return 'yellow';
  }
}

const getApprovalColor = (approval) => {
  switch (approval) {
    case 'Approved':
      return 'lightgreen';
    case 'Expecting Changes':
      return 'skyblue';
    case 'Pending Approval':
      return 'yellow';
  }
}


const Progress = () => {

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(prevPercentage => (prevPercentage + 10) % 100);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


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
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Student</a></li>
          <li className="breadcrumb-item active" aria-current="page">Progress</li>
        </ol> 
      </nav>
      <div className="container common-pg-progress-section row">

        <div className="common-pg-progress-circles row col-sm-12 container">
          <div className='common-pg-progress-ring col-sm-4'><CircularProgressBar percentage={60} />CR Progress</div>
          <div className='common-pg-progress-ring col-sm-4'><CircularProgressBar percentage={30} />Pending Tasks</div>
          <div className='common-pg-progress-ring col-sm-4'><CircularProgressBar percentage={70} />Completed Tasks</div>
        </div>
        <div className="common-pg-timeline-div  col-sm-12 col-md-12 col-lg-12">
          <div className="common-pg-time-line">
            <ul>
              <li data-escena="Intro" class="checkpoint">
                0
              </li>
              <li>
                <progress value="200" max="200"></progress>
              </li>
              <li data-escena="uno" class="checkpoint">
                1
              </li>
              <li>
                <progress value="100" max="200"></progress>
              </li>
              <li data-escena="dos" class="checkpoint">
                2
              </li>
              <li>
                <progress value="0" max="100"></progress>
              </li>
              <li data-escena="tres" class="checkpoint">
                3
              </li>
              <li>
                <progress value="0" max="100"></progress>
              </li>
              <li data-escena="cuatro" class="checkpoint">
                4
              </li>
              <li>
                <progress value="0" max="100"></progress>
              </li>
              <li data-escena="Completed" class="checkpoint">
                5
              </li>
            </ul>
          </div>
        </div>
        <div className="common-pg-progress-table-div col-sm-12">
          <table className='common-pg-progress-table'>
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Approval Stage</th>
                <th>Mentor</th>
                <th>Submissions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td><Link><FaList /> </Link>{task.task}</td>
                  <td> <span className="common-pg-status-dot" style={{ backgroundColor: getStatusColor(task.status) }}></span>
                    {task.status}</td>
                  <td><div className="common-pg-progress-bar" style={{ width: `${task.progress}`, height: '15px', backgroundColor: 'skyblue', borderRadius: '10px', fontSize: '12px' }}>{task.progress}</div></td>
                  <td>{task.date}</td>
                  <td><div className='common-pg-priority' style={{ backgroundColor: getPriorityColor(task.priority) }}>{task.priority}</div></td>
                  <td><div className='common-pg-approval' style={{ backgroundColor: getApprovalColor(task.approvalStage) }}>{task.approvalStage}</div></td>
                  <td>{task.mentor}</td>
                  <td><div className='common-pg-download-div'>filename12345.txt<span><FaDownload id='common-pg-download-icon'/></span></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Progress;
