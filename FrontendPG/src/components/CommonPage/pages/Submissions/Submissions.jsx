import React, { useState, useEffect } from 'react';
import './submission.css';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../../AuthContext';
import { FaBan, FaEdit, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';

export default function Submissions() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const { studentid } = useParams();

  const { userRole } = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      try {

        const submissionsResponse = await fetch(`http://localhost:8080/${studentid}/submissions`);
        const submissionsData = await submissionsResponse.json();
        console.log(submissionsData);
        setTasks(submissionsData);
        setActiveTab(submissionsData.length > 0 ? submissionsData[0] : null);
        setSelectedTask(submissionsData.length > 0 ? submissionsData[0] : null);


        if (submissionsData.length > 0) {
          const taskSubmissionsResponse = await fetch(`http://localhost:8080/${studentid}/submissions/${submissionsData[0].id}`);
          const taskSubmissionsData = await taskSubmissionsResponse.json();

          const sortedSubmissions = taskSubmissionsData.sort((a, b) => new Date(b.dateOfSubmission) - new Date(a.dateOfSubmission));
          setSelectedTask({ ...submissionsData[0], submissions: sortedSubmissions });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [studentid]);


  const handleTaskClick = async (task) => {
    setSelectedTask(task);

    try {
      const response = await fetch(`http://localhost:8080/${studentid}/submissions/${task.id}`);
      const data = await response.json();
      const sortedSubmissions = data.sort((a, b) => new Date(b.dateOfSubmission) - new Date(a.dateOfSubmission));
      setSelectedTask({ ...task, submissions: sortedSubmissions });
      setActiveTab(task);
    } catch (error) {
      console.error('Error fetching submissions for task:', error);
    }
  };


  const canEdit = (submissionDate) => {
    const now = new Date();
    const submissionTime = new Date(submissionDate);
    const diffInHours = (now - submissionTime) / (1000 * 60 * 60);
    return diffInHours <= 1;
  };


  if (!tasks) {
    return <div className="contents"><p>Loading...</p></div>;
  }

  return (
    <div className='common-pg-contents'>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/${studentid}/studentguide`}>Dissertation</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Submissions</li>
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
          {selectedTask ? (
            <div>
              <h2>{selectedTask.taskName}</h2>
              {selectedTask.submissions && selectedTask.submissions.length > 0 ? (
                <div>
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
                      <tr key={selectedTask.submissions[0].id}>
                        <td>{selectedTask.submissions[0].taskName}
                     <sub className='common-pg-details-link'> 
                        { userRole === 'guide' ? (
                            <Link to={`${selectedTask.submissions[0].taskId}/${selectedTask.submissions[0].id}/latest`}>Details</Link>

                        ) : (
                          <Link to={`${selectedTask.submissions[0].taskId}/${selectedTask.submissions[0].id}/past`}>Details</Link>

                        )}
                      </sub>
                        {/* <sub className='common-pg-details-link'> <Link to={`${selectedTask.submissions[0].taskId}/${selectedTask.submissions[0].id}/latest`}>Details</Link> </sub>  */}
                        </td>
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
                            <th>Feedback</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTask.submissions.slice(1).map((submission) => (
                            <tr key={submission.id}>
                              <td>Work <sub className='common-pg-details-link'><Link to={`${submission.taskId}/${submission.id}/past`}>Details</Link></sub></td>
                              <td>{new Date(submission.dateOfSubmission).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                              })}</td>
                              <td>{selectedTask.guideFeedback ? selectedTask.guideFeedback : '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                <p>No submission yet.</p>
              )}
            </div>
          ) : (
            <p>No task allotted yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}
