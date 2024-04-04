import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaDownload } from 'react-icons/fa';

const PastDetailedSubmission = () => {
  const [submission, setSubmission] = useState(null);
  const { studentid, submissionid, taskid } = useParams();


  const [latestSubmissionId, setLatestSubmissionId] = useState(null);

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

    // Fetch all submissions for the task
    fetch(`http://localhost:8080/${studentid}/submissions/${taskid}`)
      .then((response) => response.json())
      .then((data) => {
        // Sort submissions by date in descending order
        const sortedSubmissions = data.sort((a, b) => new Date(b.dateOfSubmission) - new Date(a.dateOfSubmission));
        setLatestSubmissionId(sortedSubmissions[0]?.id);
      })
      .catch((error) => {
        console.error('Error fetching submissions for task:', error);
      });
  }, [studentid, submissionid, taskid]);



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

          <div className="common-pg-past-submission-details">
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
        </div>
      </div>
    </div>
  );
};

export default PastDetailedSubmission;
