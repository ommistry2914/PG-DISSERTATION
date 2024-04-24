import React from 'react'
import "./ProfilePage.css";

const ProfilePage = () => {
  return (
    <div className='vdf-main-bg'>
   <div className="vdf-card">
        <h2>Profile Details</h2>
        <hr />

        <div className="vdf-content">
          <label className="vdf-label">Student Name: </label>
          <input
            type="text"
            className="form-control vdf-input"
            readOnly
            
          />
          <label className="vdf-label">Branch: </label>
          <input
            type="text"
            className="form-control vdf-input"
            readOnly
            
          />
          <label className="vdf-label">Dissertation Name: </label>
          <input
            type="text"
            className="form-control vdf-input"
            readOnly
           
          />
          <label className="vdf-label">Dissertation Description: </label>
          <textarea
            className="form-control vdf-input"
            readOnly
            
          />
          <label className="vdf-label">Latest Result: </label>
          <input
            type="text"
            className="form-control vdf-input"
            readOnly
            
          />
          <label className="vdf-label">Qualification: </label>
          <input
            type="text"
            className="form-control vdf-input"
            readOnly
           
          />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage