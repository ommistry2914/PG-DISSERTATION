import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './researchWorkForm.css'

function ResearchWorkForm() {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    area: '',
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
    // Perform form submission logic, e.g., send data to server
    console.log(formData);
  };

  return (
    <div className="common-pg-contents">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Student</a></li>
          <li className="breadcrumb-item active" aria-current="page">ResearchWorkSubmission</li>
        </ol>
      </nav>
      <form onSubmit={handleSubmit} className='common-pg-add-work-form'>
        <h4 style={{alignSelf: 'center', color: 'purple'}}>Research Work Submission</h4>
        <hr />
        <label>
          Title<sup className='common-pg-necessary-sup'>*</sup>
          <input
            type="text"
            name="title"
            className='form-control'
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Abstract<sup className='common-pg-necessary-sup'>*</sup>
          <textarea
            name="abstract"
            className='form-control'
            value={formData.abstract}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Research Paper Area<sup className='common-pg-necessary-sup'>*</sup>
          <input
            type="text"
            name="area"
            className='form-control'
            value={formData.area}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          References<sup className='common-pg-necessary-sup'>*</sup>
          <textarea
            name="references"
            value={formData.references}
            className='form-control'
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Attach Research Paper<sup className='common-pg-necessary-sup'>*</sup>
          <input
            type="file"
            name="file"
            className='form-control'
            onChange={handleFileChange} 
            required
          />
        </label>
        <button type="submit" className='common-pg-add-work-submit'>Submit</button>
      </form></div>
  );
}

export default ResearchWorkForm;
