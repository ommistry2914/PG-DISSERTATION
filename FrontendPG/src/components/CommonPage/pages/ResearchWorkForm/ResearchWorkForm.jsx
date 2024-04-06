import React, { useState } from 'react';

import './researchWorkForm.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';


function ResearchWorkForm() {
  const { studentid, taskid } = useParams();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [formData, setFormData] = useState({
    taskName: '',
    abstract: '',
    references: '',
    file: null
  });


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

    const formData = {
        taskName: e.target.taskName.value,
        summary: e.target.abstract.value,
        references: e.target.references.value
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
            setFormData({
                taskName: '',
                abstract: '',
                references: '',
                file: null
            });
            console.log('Work added successfully!');
            window.location.href = `/${studentid}/submit-for`;
        } else {
            console.error('Failed to add work');
            setShowErrorAlert(true);
        }
    } catch (error) {
        console.error('Error adding work:', error);
        setShowErrorAlert(true);
    }
};


  return (
    <div className="common-pg-contents">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Student</a></li>
          <li className="breadcrumb-item"><Link to={`/${studentid}/studentguide`}>Dissertation</Link></li>
          <li className="breadcrumb-item"><Link to={`/${studentid}/studentguide/submit-for`}>Task Submission</Link></li>
          <li className="breadcrumb-item active" aria-current="page">ResearchWorkSubmission</li>
        </ol>
      </nav>
      <div className="common-pg-forms">
        <form onSubmit={handleSubmit} className='common-pg-add-work-form'>
          <h4 style={{ alignSelf: 'center', color: 'purple' }}>Research Work Submission</h4>
        
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
