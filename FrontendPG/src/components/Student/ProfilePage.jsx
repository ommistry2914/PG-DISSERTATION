// import React, { useEffect, useState } from 'react'
// import "./ProfilePage.css";
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../../AuthContext';
// import axios from 'axios';

// const ProfilePage = () => {

//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     branch: '',
//     prn: '',
//     image: '',
//     phone: ''
//   });
  
//   const{authenticated,useremail} = useAuth();
//   console.log('Authenticated:', authenticated);
//   console.log('User email:', useremail);

//   useEffect(()=>{
//     fetchDetails();
//   }
//   ,[useremail]); // only run once when the id changes

//   const fetchDetails = async() => {
//     try{
//       //const response = await axios.get(`http://localhost:8080/api/auth/student/${id}`);
//       const response = await axios.get(`http://localhost:8080/api/auth/student/getstd/${useremail}`);
//       console.log("THIS IS ME : ",response.data);

//       setUser({
//         name : response.data.name,
//         email : response.data.email,
//         branch : response.data.branch,
//         prn : response.data.prn,
//         image : response.data.image_url,
//         phone : response.data.phoneNumber
//       });
//     }
//     catch(error)
//     {
//       console.error('Error fetching profile details:', error);
//     }
//   };

//   return (
//     <div className='vdf-main-bg'>
//    <div className="vdf-card">
//         <h2>Profile Details</h2>
//         <hr />

//         <div className="vdf-content">
//         <div className="rg-card" key={user.id}>
//                         <div className="rg-divider">
//                             <img src={user.image} alt="name" className="rg-dp" />
//                         </div>
//                         <div>
//                             <h4 className="rg-name">Name : </h4><input type="text" name="stdname" value={user.name} className='form-control'></input>
//                             <p className="rg-name">Branch : </p><input type="text" name="stdname" value={user.branch} className='form-control' readOnly></input>
//                             <p className="rg-name">PRN : </p><input type="text" name="stdname" value={user.prn} className='form-control' readOnly></input>
//                             <p className="rg-name">Phone Number : </p><input type="text" name="stdname" value={user.phone} className='form-control'></input>
//                             <p className="rg-name">Email : </p><input type="text" name="stdname" value={user.email} className='form-control' readOnly></input>
//                             <div className="rg-buttonCont">

//                                 <button className="rg-btn" id="rg-guide-details">Edit</button>
                                
//                             </div>
//                             <div>
              
//                         </div>
//                     </div>
//                     </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProfilePage

import React, { useEffect, useState } from 'react';
import "./ProfilePage.css";
import { useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    branch: '',
    prn: '',
    image: '',
    phoneNumber: '',
    id : ''
  });
  const [editMode, setEditMode] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [editedUser, setEditedUser] = useState({
    name: '',
    phoneNumber: ''
  });

  const { authenticated, useremail , id } = useAuth();

  useEffect(() => {
    fetchDetails();
  }, [useremail]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/student/getstd/${useremail}`);
      setUser({
        name: response.data.name,
        email: response.data.email,
        branch: response.data.branch,
        prn: response.data.prn,
        image: response.data.image_url,
        phoneNumber: response.data.phoneNumber,
        id : response.data._id
      });
      setEditedUser({
        name: response.data.name,
        phoneNumber: response.data.phoneNumber
      });
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      // Perform save operation here
      const response = await axios.get(`http://localhost:8080/api/auth/student/getstd/${useremail}`);
      const sid = response.data.id;
      const newdata = await axios.put(`http://localhost:8080/api/auth/student/editprofile/${sid}`, editedUser);
      setSubmitMessage(newdata.data);
      // For demonstration purposes, just updating state
      setUser({
        ...user,
        name: editedUser.name,
        phoneNumber: editedUser.phoneNumber
      });

      // Show success message
      // alert('Profile updated successfully');

      // Exit edit mode
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleNameChange = (e) => {
    setEditedUser({ ...editedUser, name: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setEditedUser({ ...editedUser, phoneNumber: e.target.value });
  };

  return (
    <div className='vdf-main-bg'>
      <div className="vdf-card">
        <h2>Profile Details</h2>
        <hr />

        <div className="vdf-content">
          <div className="rg-card" key={user.id}>
            <div className="rg-divider">
              <img src={user.image} alt="name" className="rg-dp" />
            </div>
            <div>
              <p className="rg-name">Name :</p>
              
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleNameChange}
                  className='form-control'
                />
              
              <p className="rg-name">Branch :</p>
              <input type='text' value={user.branch} className='form-control' readOnly></input>
              {/* //<p className="rg-name">{user.branch}</p> */}
              <p className="rg-name">PRN :</p>
              <input type='text' value={user.prn} className='form-control' readOnly></input>
              {/* //<p className="rg-name">{user.prn}</p> */}
              <p className="rg-name">Phone Number :</p>
              
                <input
                  type="text"
                  name="phone"
                  value={editedUser.phoneNumber}
                  onChange={handlePhoneChange}
                  className='form-control'
                />
              
              <p className="rg-name">Email :</p>
              <input type='text' value={user.email} className='form-control' readOnly></input>
              {/* //<p className="rg-name">{user.email}</p> */}
              <div className="rg-buttonCont">
                {!editMode ? (
                  <button className="rg-btn" id="rg-guide-details" onClick={handleEdit}>
                    Edit
                  </button>
                ) : (
                  <button className="rg-btn" id="rg-guide-details" onClick={handleSave}>
                    Save
                  </button>
                )}
              </div>
              {submitMessage && (
                    <div className="alert alert-success mt-3" role="alert">
                        {submitMessage}
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
