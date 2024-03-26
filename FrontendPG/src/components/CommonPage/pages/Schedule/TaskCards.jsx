import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './calender.css'

const tasks = [
  { task: 'Task 1', time: '10:00 AM' },
  { task: 'Task 2', time: '11:00 AM' },
  { task: 'Task 3', time: '12:00 PM' },
  { task: 'Task 4', time: '01:00 PM' },
  { task: 'Task 5', time: '01:00 PM' },
  { task: 'Task 6', time: '01:00 PM' },
];

const TaskCards = () => {
  return (
    <div className="common-pg-task-cards common-pg-calender-container-col">
      {tasks.map((task, index) => (
        <div key={index} className="common-pg-task-card">
          <div className="common-pg-calender-task">{task.task}</div>
          <div className="common-pg-calender-time">{task.time}</div>
        </div>
      ))}
    </div>
  );
};

export default TaskCards;

