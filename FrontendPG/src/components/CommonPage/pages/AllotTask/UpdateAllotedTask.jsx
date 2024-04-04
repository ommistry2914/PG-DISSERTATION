import React, { useState, useEffect } from 'react';
import '../ResearchWorkForm/researchWorkForm.css'
import { useParams } from 'react-router-dom';

function UpdateAllotedTask() {
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

  const { studentid, taskid } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  //Submit updated form
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

    fetch(`http://localhost:8080/allottask/${studentid}/update/${taskid}`, {
      method: 'PUT',
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

  //Form Data to edit
  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await fetch(`http://localhost:8080/${studentid}/progress`);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            const taskToUpdate = data.find(task => task.id === taskid);
            if (taskToUpdate) {
                setFormData({
                    taskName: taskToUpdate.taskName,
                    taskDescription: taskToUpdate.taskDescription,
                    startDate: new Date(taskToUpdate.startDate).toISOString().slice(0, 16),
                    endDate: new Date(taskToUpdate.endDate).toISOString().slice(0, 16),
                    priority: taskToUpdate.priority,
                    maxCredits: taskToUpdate.maxCredits
                });
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    fetchTasks();
}, [studentid, taskid]);

 
  return (
    <div className="common-pg-contents">
     <div className="common-pg-forms">
        <form onSubmit={onSubmitForm} className='common-pg-add-work-form'>
          <h4 style={{ alignSelf: 'center', color: 'purple' }}>Task Updating Form</h4>
          {showSuccessAlert && (
            <div className="alert alert-success" role="alert">
              Updated successfully!
            </div>
          )}
          {showErrorAlert && (
            <div className="alert alert-danger" role="alert">
              Update Unsuccessful!
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
                type="text"
                name="maxCredits"
                className='form-control'
                value={formData.maxCredits}
                onChange={handleChange}
                required
              />
           </div></div>




          <button type="submit" className='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAllotedTask;
