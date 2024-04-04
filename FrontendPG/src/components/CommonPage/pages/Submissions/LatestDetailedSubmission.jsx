import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaDownload } from 'react-icons/fa';

const DetailedSubmission = () => {
  const [submission, setSubmission] = useState(null);
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


  useEffect(() => {
    // Fetch submission data based on submissionId
    fetch(`http://localhost:8080/${studentid}/submissions/${taskid}/${submissionid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubmission(data);
      })
      .catch((error) => {
        console.error('Error fetching submission:', error);
      });
  }, [studentid, submissionid, taskid]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('guideFeedback', feedback);

      await fetch(`http://localhost:8080/${studentid}/submissions/${taskid}/${submissionid}/feedback`, {
        method: 'PUT',
        body: formData
      });
      console.log('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleApprovalSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credits = formData.get('credits');
    const creditsValue = approvalStatus === 'Approved' ? credits : 0;
    console.log(`${approvalStatus} ${credits}`);
    fetch(`http://localhost:8080/${studentid}/submissions/${taskid}/${submissionid}`)
      .then(response => response.json())
      .then(data => {
        // Use submissionDate in the fetch request
        fetch(`http://localhost:8080/${studentid}/submissions/${taskid}/${submissionid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            approvalStage: approvalStatus,
            revCredits: creditsValue
          })
        })
          .then(response => {
            if (response.ok) {
              setFormData({
                approvalStatus: '',
              });
              console.log('Work added successfully!');
              setShowSuccessAlert(true);
              setShowErrorAlert(false);
            } else {
              console.error('Failed to add work');
              setShowSuccessAlert(false);
              setShowErrorAlert(true);
            }
          })
          .catch(error => {
            console.error('Error adding work:', error);
            setShowSuccessAlert(false);
            setShowErrorAlert(true);
          });
      })
      .catch(error => {
        console.error('Error fetching submission data:', error);
        setShowSuccessAlert(false);
        setShowErrorAlert(true);
      });
  }





  const handleDownload = () => {
    // Implement download logic
    alert('Downloading file...');
  };

  if (!submission) {
    return <p>Loading...</p>;
  }

  return (
    <div className="common-pg-contents">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Student</a></li>
          <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
          <li className="breadcrumb-item"><a href="#">Submissions</a></li>
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
            <div className="common-pg-sub-details"> Definition:
              Ring topology is a type of network configuration where devices are connected in a circular
              manner, forming a closed loop. In this setup, each device is connected to exactly two other
              devices, creating a continuous pathway for data transmission. This means that data travels in
              only one direction around the ring, passing through each device until it reaches its destination.
              ❖ Characteristics:
              1. Circular Structure: In a ring topology, the network devices are arranged in a closed
              loop or circle.
              2. Unidirectional Data Flow: Data travels in only one direction around the ring, passing
              through each device until it reaches its destination.
              3. Token Passing: To avoid collisions, some ring networks use a method called token
              passing, where a special packet (token) is passed from one device to the next,
              granting the right to send data.
              4. Reliability: Ring topology can be relatively reliable because if one device or
              connection fails, it doesn't necessarily disrupt the entire network.
              5. Performance: In terms of performance, ring networks can be efficient for
              transmitting data, especially if token passing is used to manage access to the
              network{submission.summary}</div>
            <p><strong>References:</strong></p>
            <div className="common-pg-sub-details">     manner, forming a closed loop. In this setup, each device is connected to exactly two other
              devices, creating a continuous pathway for data transmission. This means that data travels in
              only one direction around the ring, passing through each device until it reaches its destinatio manner, forming a closed loop. In this setup, each device is connected to exactly two other
              devices, creating a continuous pathway for data transmission. This means that data travels in
              only one direction around the ring, passing through each device until it reaches its destinatiomanner, forming a closed loop. In this setup, each device is connected to exactly two other
              devices, creating a continuous pathway for data transmission. This means that data travels in
              only one direction around the ring, passing through each device until it reaches its destination.{submission.references}</div>
            <p><strong>File:</strong></p>
            <div className="common-pg-sub-details"><p>{submission.fileSubmitted} <button onClick={handleDownload} className="common-pg-add-work-submit"><FaDownload /></button></p>
            </div>  </div>
          <div className="common-pg-latest-sub-form">
            <h6>Feedback and Approval Forms</h6>
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
                   Approved</div>
                  <div className="col-12"> <input
                    type="radio"
                    name="approvalStage"
                    value="Rejected"
                    checked={approvalStatus === "Rejected"}
                    onChange={() => setApprovalStatus("Rejected")}
                    required
                  />
                    Rejected</div>
                  <div className="col-12"><input
                    type="radio"
                    name="approvalStage"
                    value="Pending"
                    checked={approvalStatus === "Pending"}
                    onChange={() => setApprovalStatus("Pending")}
                    required
                  />
                    Request Revisions
                  </div>




                </div>
              </div>
              {approvalStatus === 'Approved' && (
                <div>

                  <label htmlFor="credits">Credits (Out of )</label>
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
