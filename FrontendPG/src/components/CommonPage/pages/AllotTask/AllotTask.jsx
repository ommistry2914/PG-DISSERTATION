import React, { useState } from 'react';
import '../ResearchWorkForm/researchWorkForm.css'
import { useParams } from 'react-router-dom';

function AllotTask() {
  const [formData, setFormData] = useState({
    taskName: '',
    taskDescription: '',
    startDate: '',
    endDate: '',
    priority: '',
    maxCredits: ''
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const { studentid } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const formData = {
      taskName: e.target.taskName.value,
      taskDescription: e.target.taskDescription.value,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
      priority: e.target.priority.value,
      maxCredits: e.target.maxCredits.value
    };

    fetch(`http://localhost:8080/allottask/${studentid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Task added successfully!');
          setFormData({
            taskName: '',
            taskDescription: '',
            startDate: '',
            endDate: '',
            priority: '',
            maxCredits: ''
          });
          setShowSuccessAlert(true);
          setShowErrorAlert(false);
        } else {
          console.error('Failed to add task');
          setShowSuccessAlert(false);
          setShowErrorAlert(true);
        }
      })
      .catch(error => {
        console.error('Error adding task:', error);
        setShowSuccessAlert(false);
        setShowErrorAlert(true);
      });
  };

  return (
    <div className="common-pg-contents">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Student</a></li>
          <li className="breadcrumb-item active" aria-current="page">Allocate Task</li>
        </ol>
      </nav>
      <div className="common-pg-forms">
        <form onSubmit={onSubmitForm} className='common-pg-add-work-form'>
          <h4 style={{ alignSelf: 'center', color: 'purple' }}>Task Allotment Form</h4>
          {showSuccessAlert && (
            <div className="alert alert-success" role="alert">
              Task added successfully!
            </div>
          )}
          {showErrorAlert && (
            <div className="alert alert-danger" role="alert">
              Failed to add task.
            </div>
          )}
          <div className="row"><div className="col-12"> <label>
            Task Name<sup className='common-pg-necessary-sup'>*</sup>
            </label><input
              type="text"
              name="taskName"
              className='form-control'
              value={formData.taskName}
              onChange={handleChange}
              required
            />
          </div></div>
          <div className="row"><div className="col-12"><label>
            Task Description<sup className='common-pg-necessary-sup'>*</sup>
           </label> <textarea
              name="taskDescription"
              className='form-control'
              value={formData.taskDescription}
              onChange={handleChange}
              required
            />
          </div></div>


          <div className="row"><div className="col-6"><label>
            Start Date<sup className='common-pg-necessary-sup'>*</sup>
          </label>  <input
              type="datetime-local"
              name="startDate"
              className='form-control'
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
            <div className="col-6"> <label>
              End Date<sup className='common-pg-necessary-sup'>*</sup>
            </label>   <input
                type="datetime-local"
                name="endDate"
                className='form-control'
                value={formData.endDate}
                onChange={handleChange}
                required
              />
           </div></div>
          <div className="row"><div className="col-6"><label>
            Priority<sup className='common-pg-necessary-sup'>*</sup>
         </label>   <input
              type="text"
              name="priority"
              className='form-control'
              value={formData.priority}
              onChange={handleChange}
              required
            />
          </div>
            <div className="col-6"><label>
              Maximum Credits<sup className='common-pg-necessary-sup'>*</sup>
           </label>    <input
                type="number"
                name="maxCredits"
                className='form-control'
                value={formData.maxCredits}
                onChange={handleChange}
                step="0.1"
                required
              />
           </div></div>




          <button type="submit" className='submit'>Submit</button>
        </form>

      </div></div>
  );
}

export default AllotTask;
