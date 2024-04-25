import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaDownload } from 'react-icons/fa';
import axios from "axios";
import { useAuth } from "../../../../AuthContext";

const DetailedSubmission = () => {
  const { useremail } = useAuth();
  const [submission, setSubmission] = useState(null);
  const [task, setTask] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { studentid, submissionid, taskid } = useParams();
  const [formData, setFormData] = useState({
    approvalStage: '',
    credits: ''
  });
  const [feedback, setFeedback] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('');
  const [credits, setCredits] = useState('');

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await fetch(`http://localhost:8080/${studentid}/submissions/${taskid}/${submissionid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch submission');
        }
        const data = await response.json();
        console.log(data);
        setSubmission(data);
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };

    fetchSubmission();
  }, [studentid, submissionid, taskid]);



  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:8080/${studentid}/submissions/${taskid}/mcred`);
        if (!response.ok) {
          throw new Error('Failed to fetch task');
        }
        const data = await response.json();
        console.log(data);
        setTask(data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [studentid, taskid]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    try {
      const notification = {
        senderId: useremail,
        receiverId: studentid,
        createdAt: today,
        type: 'Task Feedback',
        link: `http://localhost:5173/${studentid}/studentguide/submissions`
      }
      // const formData = new FormData();
      // formData.append('guideFeedback', feedback);

      await fetch(`http://localhost:8080/${studentid}/submissions/${taskid}/${submissionid}/feedback`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body:  feedback
      });
      setFeedback('');
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      console.log('Feedback submitted successfully');
      const response = axios.post('http://localhost:8080/api/auth/notification', notification);
      console.log((await response).data);
      if (response.OK) {
        console.log("Notification added!")
      }
    } catch (error) {
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
      console.error('Error submitting feedback:', error);
    }
  };
  const today = new Date();
  const handleApprovalSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const credits = formData.get('credits');
    const creditsValue = approvalStatus === 'Approved' ? credits : 0;
    console.log(`${approvalStatus} ${credits}`);
    const notification = {
      senderId: useremail,
      receiverId: studentid,
      createdAt: today,
      type: 'Approval status',
      link: `http://localhost:5173/${studentid}/studentguide/submissions`
    }
    try {
      // Use submissionDate in the fetch request
      const response = await fetch(`http://localhost:8080/${studentid}/submissions/${taskid}/${submissionid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          approvalStage: approvalStatus,
          revCredits: creditsValue
        })
      });

      if (response.ok) {

        setCredits('');
        setApprovalStatus('');
        console.log('Guide updated status!');
        console.log('Work added successfully!');
        try {
          const sendNotification = axios.post('http://localhost:8080/api/auth/notification', notification);
          console.log('Notification send');
        }
        catch (e) {
          console.log(e);
        }
        setShowSuccessAlert(true);
        setShowErrorAlert(false);
      } else {
        console.error('Failed to add work');
        setShowSuccessAlert(false);
        setShowErrorAlert(true);
      }
    }
    catch (error) {
      console.error('Error adding work:', error);
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
    }

  };


  // const handleDownload = () => {
  //   alert('Downloading file...');
  // };


  if (!submission) {
    return <div className="common-pg-contents"><p>Loading...</p></div>;
  }

  return (
    <div className="common-pg-contents">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/${studentid}/studentguide`}>Dissertation</Link></li>
          <li className="breadcrumb-item"><Link to={`/${studentid}/studentguide/submissions`}>Submissions</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Detailed Submission</li>
        </ol>
      </nav>
      <div className="common-pg-detailed-submission-content">

        <div className="common-pg-detailed-submission-row">

          <div className="common-pg-submission-details">
            <h3>{submission.taskName}</h3>
            <p>Submission date: {new Date(submission.dateOfSubmission).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            })}</p>
            <p><strong>Abstract:</strong></p>
            <div className="common-pg-sub-details">{submission.summary}</div>
            <p><strong>References:</strong></p>
            <div className="common-pg-sub-details">{submission.references}</div>
            <p><strong>File:</strong></p>
            <div className="common-pg-sub-details">
  <p>
    <a href={submission.fileSubmitted} target="_blank" rel="noopener noreferrer">Work</a>
    <button onClick={() => window.open(submission.fileSubmitted, '_blank')} className="common-pg-add-work-submit">Open</button>
  </p>
</div>

          </div>

          <div className="common-pg-latest-sub-form">
            <h6>Feedback and Approval Forms</h6>

            {showSuccessAlert && (
              <div className="alert alert-success" role="alert">
                Added successfully!
              </div>
            )}
            {showErrorAlert && (
              <div className="alert alert-danger" role="alert">
                Add Unsuccessful!
              </div>
            )}


            <form onSubmit={handleFeedbackSubmit} className='common-pg-guide-approval-form'>
              <h5>Feedback</h5>
              <div className="form-group">
                <label htmlFor="feedback"> </label>
                <textarea id='common-pg-feedback' name='feedback'
                  placeholder="Enter here"
                  value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
              </div>
              <button type="submit" className="btn common-pg-approval-submit">Send</button>
            </form>
            <form onSubmit={handleApprovalSubmit} className='common-pg-guide-approval-form'>

              <h5>Approval</h5>
              <div className="form-group">
                <label><h6>Approval Status</h6></label>
                <div className="row">
                  <div className="col-12"><input
                    type="radio"
                    name="approvalStage"
                    value="Approved"
                    checked={approvalStatus === "Approved"}
                    onChange={() => setApprovalStatus("Approved")}
                    required
                  />
                    &nbsp; Approved</div>
                  <div className="col-12"> <input
                    type="radio"
                    name="approvalStage"
                    value="Rejected"
                    checked={approvalStatus === "Rejected"}
                    onChange={() => setApprovalStatus("Rejected")}
                    required
                  />
                    &nbsp;  Rejected</div>
                  <div className="col-12"><input
                    type="radio"
                    name="approvalStage"
                    value="Pending"
                    checked={approvalStatus === "Pending"}
                    onChange={() => setApprovalStatus("Pending")}
                    required
                  />
                    &nbsp; Request Revisions
                  </div>




                </div>
              </div>
              {approvalStatus === 'Approved' && (
                <div>

                  <label htmlFor="credits">Credits (Out of {task.maxCredits})</label>
                  <input type='number' id='credits' name='credits'
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)} step="0.1"></input>
                </div>
              )}
              <button type="submit" className="btn common-pg-approval-submit">Submit</button>
            </form>
          </div></div>
      </div>
    </div>
  );
};

export default DetailedSubmission;
