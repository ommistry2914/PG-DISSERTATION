import React, { useState, useEffect } from 'react';
import './submission.css';
import { Link, useParams } from 'react-router-dom';
import { FaBan, FaEdit, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';

export default function Submissions() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const { studentid } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/${studentid}/submissions`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
        setActiveTab(data.length > 0 ? data[0] : null); // Set the first task as active
        setSelectedTask(data.length > 0 ? data[0] : null); // Set the first task as selected
        if (data.length > 0) {
          fetch(`http://localhost:8080/${studentid}/submissions/${data[0].id}`)
            .then((response) => response.json())
            .then((submissions) => {
              const sortedSubmissions = submissions.sort((a, b) => new Date(b.dateOfSubmission) - new Date(a.dateOfSubmission));
              setSelectedTask({ ...data[0], submissions: sortedSubmissions });
            })
            .catch((error) => {
              console.error('Error fetching submissions for task:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching submissions:', error);
      });
  }, [studentid]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    fetch(`http://localhost:8080/${studentid}/submissions/${task.id}`)
      .then((response) => response.json())
      .then((data) => {
        // Sort submissions by date in descending order
        const sortedSubmissions = data.sort((a, b) => new Date(b.dateOfSubmission) - new Date(a.dateOfSubmission));
        setSelectedTask({ ...task, submissions: sortedSubmissions });
        setActiveTab(task); // Set the clicked task as active
      })
      .catch((error) => {
        console.error('Error fetching submissions for task:', error);
      });
  };

  const canEdit = (submissionDate) => {
    const now = new Date();
    const submissionTime = new Date(submissionDate);
    const diffInHours = (now - submissionTime) / (1000 * 60 * 60);
    return diffInHours <= 1;
  };

  return (
    <div className='common-pg-contents'>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Student</a></li>
          <li className="breadcrumb-item"><a href="#">Working</a></li>
          <li className="breadcrumb-item active" aria-current="page"><a href="#">Submissions</a></li>
        </ol>
      </nav>
      <div className='common-pg-submissions-content'>
        <div className="common-pg-horizontal-tabs">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`common-pg-tab ${activeTab === task ? 'common-pg-active' : ''}`}
              onClick={() => handleTaskClick(task)}
            >
              {task.taskName}
            </div>
          ))}
        </div>
        <div id="common-pg-tasks">
          {selectedTask && (
            <div>
              <h2>{selectedTask.taskName}</h2>
              <h6>Latest Submission</h6>
              <table className='common-pg-progress-table table table-striped'>
                <thead>
                  <tr>
                    <th>Submission</th>
                    <th>Date of Submission</th>
                    <th>Edit <br /><p style={{ fontSize: "13px" }}>(Editable only within 1 hour  of submission)</p></th>
                    <th>Status</th>
                    <th>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTask.submissions && selectedTask.submissions.length > 0 && (
                    <tr key={selectedTask.submissions[0].id}>
                      <td>{selectedTask.submissions[0].taskName} <sub className='common-pg-details-link'><Link to={`${selectedTask.submissions[0].taskId}/${selectedTask.submissions[0].id}/latest`}>Details</Link></sub></td>
                      <td>{new Date(selectedTask.submissions[0].dateOfSubmission).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                      })}</td>
                      <td>{canEdit(selectedTask.submissions[0].dateOfSubmission) ? <Link to={`${selectedTask.submissions[0].taskId}/${selectedTask.submissions[0].id}/update`}><FaEdit /></Link> : <FaBan />}</td>
                      <td>
                        {selectedTask.approvalStage === 'Approved' && <span><FaCheckCircle style={{ color: 'green' }} /> Completed</span>}
                        {selectedTask.approvalStage === 'Pending' && <span><FaHourglassHalf style={{ color: 'orange' }} /> Pending</span>}
                        {selectedTask.approvalStage === 'Rejected' && <span><FaTimesCircle style={{ color: 'red' }} /> Rejected</span>}
                        {!['Approved', 'Pending', 'Rejected'].includes(selectedTask.approvalStage) && '-'}
                      </td>
                      <td>{selectedTask.submissions[0].guideFeedback ? selectedTask.submissions[0].guideFeedback : '-'}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {selectedTask.submissions && selectedTask.submissions.length > 1 && (
                <div>
                  <h6>Past Submissions</h6>
                  <table className='common-pg-progress-table'>
                    <thead className='.thead-dark'>
                      <tr>
                        <th>Submissions</th>
                        <th>Date of Submission</th>
                        <th>Status</th>
                        <th>Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTask.submissions.slice(1).map((submission) => (
                        <tr key={submission.id}>
                          <td>{submission.fileSubmitted} <sub className='common-pg-details-link'><Link to={`${submission.taskId}/${submission.id}/past`}>Details</Link></sub></td>
                          <td>{new Date(submission.dateOfSubmission).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                          })}</td>
                          <td>
                            {selectedTask.approvalStage === 'Approved' && <span> <FaCheckCircle style={{ color: 'green' }} /> Completed</span>}
                            {selectedTask.approvalStage === 'Pending' && <span><FaHourglassHalf style={{ color: 'orange' }} /> Pending</span>}
                            {selectedTask.approvalStage === 'Rejected' && <span><FaTimesCircle style={{ color: 'red' }} /> Rejected</span>}
                          </td>
                          <td>{selectedTask.guideFeedback}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
