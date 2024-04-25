import React, { useState } from 'react';

import './researchWorkForm.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useParams } from 'react-router-dom';
import axios from 'axios';


function ResearchWorkForm() {
  const { studentid, taskid } = useParams();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formData, setFormData] = useState({
    taskName: '',
    abstract: '',
    references: '',
    file: null
  });
  const [notification,setNotification]=useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const currentDateTimeString = currentDate.toISOString();
    const formData = {
        taskName: e.target.taskName.value,
        summary: e.target.abstract.value,
        references: e.target.references.value,
        dateofsubmission: currentDateTimeString
    };

    console.log('Form Data:', formData);

    try {
        const response = await fetch(`http://localhost:8080/${studentid}/submit-for/${taskid}/add-work`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
          const today=new Date();
          try {
            const notification={
              senderId:studentid,
              receiverId:'guideId',
              createdAt:today,
              type:'Task Submitted',
              link:`http://localhost:5173/guideId/studentguide/submissions`
          }
          const res=axios.post('http://localhost:8080/api/auth/notification',notification);
        }
        catch(e){
          console.log(e);
        }
        console.log(notification);
        window.location.href = `/${studentid}/submit-for`;
          setFormData({
            taskName: '',
            abstract: '',
            references: '',
            file: null
          });
          console.log('Work added successfully!');
          setShowSuccessAlert(true);
          setShowErrorAlert(false);
        } else {
            console.error('Failed to add work');
            setShowSuccessAlert(false);
            setShowErrorAlert(true);
        }
    } catch (error) {
        console.error('Error adding work:', error);
        setShowSuccessAlert(false);
        setShowErrorAlert(true);
    }
};


  return (
    <div className="common-pg-contents">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/${studentid}/studentguide`}>Dissertation</Link></li>
          <li className="breadcrumb-item"><Link to={`/${studentid}/studentguide/submit-for`}>Task Submission</Link></li>
          <li className="breadcrumb-item active" aria-current="page">ResearchWorkSubmission</li>
        </ol>
      </nav>
      <div className="common-pg-forms">
        <form onSubmit={handleSubmit} className='common-pg-add-work-form'>
          <h4 style={{ alignSelf: 'center', color: 'purple' }}>Research Work Submission</h4>
          {showSuccessAlert && (
            <div className="alert alert-success" role="alert">
              Submission Added and notification sent successfully!
            </div>
          )}
          {showErrorAlert && (
            <div className="alert alert-danger" role="alert">
              Add Unsuccessful!
            </div>
          )}
          <div className="row">
            <label>
              Task Name/Title<sup className='common-pg-necessary-sup'>*</sup>
              <input
                type="text"
                name="taskName"
                className='form-control'
                value={formData.taskName}
                onChange={handleChange}
                required
              />
            </label></div>
          <div className="row">
            <label>
              Abstract<sup className='common-pg-necessary-sup'>*</sup>
              <textarea
                name="abstract"
                className='form-control'
                value={formData.abstract}
                onChange={handleChange}
                required
              />
            </label></div>
          <div className="row">
            <label>
              References<sup className='common-pg-necessary-sup'>*</sup>
              <textarea
                name="references"
                value={formData.references}
                className='form-control'
                onChange={handleChange}
                required
              />
            </label></div>
          <div className="row"> <label>
            Attach Research Paper<sup className='common-pg-necessary-sup'>*</sup>
            <input
              type="file"
              name="file"
              className='form-control'
              onChange={handleFileChange}
              required
            />
          </label></div>
          <button type="submit" className='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ResearchWorkForm;
