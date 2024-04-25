import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaDownload } from 'react-icons/fa';

const PastDetailedSubmission = () => {
  const [submission, setSubmission] = useState(null);
  const { studentid, submissionid, taskid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const submissionResponse = await fetch(`http://localhost:8080/${studentid}/submissions/${taskid}/${submissionid}`);
            const submissionData = await submissionResponse.json();
            console.log(submissionData);
            setSubmission(submissionData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, [studentid, submissionid, taskid]);


  const handleDownload = () => {
    alert('Downloading file...');
  };


  if (!submission) {
    return  <div className="common-pg-contents"><p>Loading...</p></div>;
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
        </div>
      </div>
    </div>
  );
};

export default PastDetailedSubmission;
