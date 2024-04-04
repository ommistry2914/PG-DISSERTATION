import React, { useState, useEffect } from 'react';
import './researchWorkForm.css';
import { useParams } from 'react-router-dom';

function UpdateForm() {
  const { studentid, taskid, submissionid } = useParams();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
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

  const handleSubmit = (e) => {
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

    fetch(`http://localhost:8080/${studentid}/submissions/${taskid}/${submissionid}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          setFormData({
            taskName: '',
            abstract: '',
            references: '',
            file: null
          });
          console.log('Updated successfully!');
          setShowSuccessAlert(true);
          setShowErrorAlert(false);
        } else {
          console.error('Failed to update work');
          setShowSuccessAlert(false);
          setShowErrorAlert(true);
        }
      })
      .catch(error => {
        console.error('Error adding work:', error);
        setShowSuccessAlert(false);
        setShowErrorAlert(true);
      });

  };


  const fetchSubmission = async () => {
    try {
      const response = await fetch(`http://localhost:8080/${studentid}/submissions/${taskid}/${submissionid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch submission');
      }
      const submission = await response.json();
      setFormData({
        taskName: submission.taskName,
        abstract: submission.summary,
        references: submission.references,
        file: submission.fileSubmitted
      });
    } catch (error) {
      console.error('Error fetching submission:', error);
    }
  };

  useEffect(() => {
    fetchSubmission();
  }, [studentid, taskid, submissionid]);


  return (
    <div className="common-pg-contents">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Student</a></li>
          <li className="breadcrumb-item active" aria-current="page">ResearchWorkSubmission</li>
        </ol>
      </nav>
      <div className="common-pg-forms">
        <form onSubmit={handleSubmit} className='common-pg-add-work-form'>
          <h4 style={{ alignSelf: 'center', color: 'purple' }}>Research Work Submission</h4>
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
          <div className="row"><label>
            Abstract<sup className='common-pg-necessary-sup'>*</sup>
            <textarea
              name="abstract"
              className='form-control'
              value={formData.abstract}
              onChange={handleChange}
              required
            />
          </label></div>

          <div className="row"> <label>
            References<sup className='common-pg-necessary-sup'>*</sup>
            <textarea
              name="references"
              value={formData.references}
              className='form-control'
              onChange={handleChange}
              required
            />
          </label></div>
          <div className="row">   <label>
            Attach Research Paper<sup className='common-pg-necessary-sup'>*</sup>
            <input
              type="file"
              name="file"
              className='form-control'
              onChange={handleFileChange}
              required
            />
          </label></div>
          {/* {formData.file && (
            <div className="row">
              <label>
                Current File:
                <a href={formData.file} target="_blank" rel="noreferrer">{formData.file}</a>
              </label>
            </div>
          )} */}
          <button type="submit" className='submit'>Submit</button>
        </form></div></div>
  );
}

export default UpdateForm;
