// import React, { useState, useEffect } from 'react';
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
//   list,
// } from "firebase/storage";
// import { storage } from "../../../../firebase";
// import { v4 } from "uuid";
// import './researchWorkForm.css';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import {Link, useParams } from 'react-router-dom';
// import axios from 'axios';


// function ResearchWorkForm() {

//   const [imageUrls, setImageUrls] = useState([]);
//   const imagesListRef = ref(storage, "images/");

//   const { studentid, taskid } = useParams();
//   const [showErrorAlert, setShowErrorAlert] = useState(false);
//   const [showSuccessAlert, setShowSuccessAlert] = useState(false);
//   const [File, setFile] = useState(null);
//   const [formData, setFormData] = useState({
//     taskName: '',
//     abstract: '',
//     references: '',
//     files: '',
//   });
//   const [notification,setNotification]=useState(null);

//   const uploadFile = () => {
//     if (File == null) return;
//     const imageRef = ref(storage, `images/${File.name + v4()}`);
//     uploadBytes(imageRef, File).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImageUrls((prev) => [...prev, url]);
//         console.log(imageUrls);
//       });
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleFileChange = (e) => {
//    setFile(e.target.files[0]);

//    uploadFile();
//   };

//   const handleSubmit = async (e) => {

  
//     e.preventDefault();
//     const currentDate = new Date();
//     const currentDateTimeString = currentDate.toISOString();
//     const formData = {
//         taskName: e.target.taskName.value,
//         summary: e.target.abstract.value,
//         references: e.target.references.value,
//         fileSubmitted: imageUrls,
//         dateofsubmission: currentDateTimeString
//     };

//     console.log('Form Data:', formData);

//     try {

//       // const formDatas = new FormData();
//       // formDatas.append('file', File);

     
//       // const fileResponse = await axios.post('http://localhost:8080/api/auth/upload', formDatas);
//       // if(fileResponse.ok){
//       //   console.log("success");
//       // }
//       // else{
//       //   console.log("error");
//       // }

//         const response = await fetch(`http://localhost:8080/${studentid}/submit-for/${taskid}/add-work`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         });

//         if (response.ok) {
//           const today=new Date();
//           try {
//             const notification={
//               senderId:studentid,
//               receiverId:'guideId',
//               createdAt:today,
//               type:'Task Submitted',
//               link:`http://localhost:5173/guideId/studentguide/submissions`
//           }
//           const res=axios.post('http://localhost:8080/api/auth/notification',notification);
//         }
//         catch(e){
//           console.log(e);
//         }
//         console.log(notification);
//         // window.location.href = `/${studentid}/submit-for`;
//           setFormData({
//             taskName: '',
//             abstract: '',
//             references: '',
//             file: ''
//           });
//           console.log('Work added successfully!');
//           setShowSuccessAlert(true);
//           setShowErrorAlert(false);
//         } else {
//             console.error('Failed to add work');
//             setShowSuccessAlert(false);
//             setShowErrorAlert(true);
//         }
//     } catch (error) {
//         console.error('Error adding work:', error);
//         setShowSuccessAlert(false);
//         setShowErrorAlert(true);
//     }
// };


//   return (
//     <div className="common-pg-contents">
//       <nav aria-label="breadcrumb">
//         <ol className="breadcrumb">
//           <li className="breadcrumb-item"><Link to={`/${studentid}/studentguide`}>Dissertation</Link></li>
//           <li className="breadcrumb-item"><Link to={`/${studentid}/studentguide/submit-for`}>Task Submission</Link></li>
//           <li className="breadcrumb-item active" aria-current="page">ResearchWorkSubmission</li>
//         </ol>
//       </nav>
//       <div className="common-pg-forms">
//       <form encType='multipart/form-data' onSubmit={handleSubmit} className='common-pg-add-work-form'>

//           <h4 style={{ alignSelf: 'center', color: 'purple' }}>Research Work Submission</h4>
//           {showSuccessAlert && (
//             <div className="alert alert-success" role="alert">
//               Submission Added and notification sent successfully!
//             </div>
//           )}
//           {showErrorAlert && (
//             <div className="alert alert-danger" role="alert">
//               Add Unsuccessful!
//             </div>
//           )}
//           <div className="row">
//             <label>
//               Task Name/Title<sup className='common-pg-necessary-sup'>*</sup>
//               <input
//                 type="text"
//                 name="taskName"
//                 className='form-control'
//                 value={formData.taskName}
//                 onChange={handleChange}
//                 required
//               />
//             </label></div>
//           <div className="row">
//             <label>
//               Abstract<sup className='common-pg-necessary-sup'>*</sup>
//               <textarea
//                 name="abstract"
//                 className='form-control'
//                 value={formData.abstract}
//                 onChange={handleChange}
//                 required
//               />
//             </label></div>
//           <div className="row">
//             <label>
//               References<sup className='common-pg-necessary-sup'>*</sup>
//               <textarea
//                 name="references"
//                 value={formData.references}
//                 className='form-control'
//                 onChange={handleChange}
//                 required
//               />
//             </label></div>
//           <div className="row"> <label>
//             Attach Research Paper<sup className='common-pg-necessary-sup'>*</sup>
//             <input
//               type="file"
//               name="files"
//               className='form-control'
//               onChange={handleFileChange}
//               required
//             />
//           </label></div>
//           {/* <div className="row">
//             <label>
//               File Name<sup className='common-pg-necessary-sup'>*</sup>
//               <input
//               type='text'
//                 name="file"
//                 className='form-control'
//                 value={formData.filename}
//                 onChange={handleChange}
//                 required
//               />
//             </label></div> */}
//           <button type="submit" className='submit'>Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ResearchWorkForm;


import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";
import { v4 } from "uuid";
import './researchWorkForm.css';
import axios from 'axios';

function ResearchWorkForm() {
  const { studentid, taskid } = useParams();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [formData, setFormData] = useState({
    taskName: '',
    abstract: '',
    references: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFileUrl('');
    if (file) {
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      setFileUrl(downloadURL);
      console.log(fileUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const formDataToSend = {
      taskName: formData.taskName,
      summary: formData.abstract,
      references: formData.references,
      fileSubmitted: fileUrl,
      dateofsubmission: currentDate
    };

    try {
      const response = await fetch(`http://localhost:8080/${studentid}/submit-for/${taskid}/add-work`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataToSend)
      });

      if (response.ok) {
        const today = new Date();
        try {
          const notification = {
            senderId: studentid,
            receiverId: 'guideId',
            createdAt: today,
            type: 'Task Submitted',
            link: `http://localhost:5173/guideId/studentguide/submissions`
          }
          await axios.post('http://localhost:8080/api/auth/notification', notification);
        } catch (e) {
          console.log(e);
        }

        setFormData({
          taskName: '',
          abstract: '',
          references: '',
        });

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
        <form encType='multipart/form-data' onSubmit={handleSubmit} className='common-pg-add-work-form'>
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
            </label>
          </div>
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
            </label>
          </div>
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
            </label>
          </div>
          <div className="row">
            <label>
              Attach Research Paper<sup className='common-pg-necessary-sup'>*</sup>
              <input
                type="file"
                name="files"
                className='form-control'
                onChange={handleFileChange}
                required
              />
            </label>
          </div>
          <button type="submit" className='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ResearchWorkForm;
