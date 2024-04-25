import React, { useState } from 'react';
import './RequestForm.css';
import { CiEdit } from "react-icons/ci";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RequestForm = () => {
    const { sid } = useParams();
    console.log("id from params 1st console log  : ",sid);

    const [formData, setFormData] = useState({ studentId: sid,stdemail:'', bname: '', dissertationName: '', dissertationDesc: '', stdResult: '', qualification: '' });
    const [submitMessage, setSubmitMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState('');

   
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isEditing) {
                response = await axios.put(`http://localhost:8080/rdfActions/editRDF/${editId}`, formData);
            } else {
                console.log(formData);
                console.log("ID from the params in submit function : ",sid);
                setFormData(formData);

                console.log("FORMDATA WALA STUDENT ID : ",formData.studentId);
                console.log("NEW WALA : ",formData);
                response = await axios.post('http://localhost:8080/rdfActions/addRDF', formData);
            }
            console.log('Response:', response.data);
            setSubmitMessage(response.data);
            setFormData({ studentId: '',stdemail:'', bname: '', dissertationName: '', dissertationDesc: '', stdResult: '', qualification: '' }); // Reset form data
            setIsEditing(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEditClick = async (id) => {
        //this is student id
        setIsEditing(true);
        try {
            const response = await axios.get(`http://localhost:8080/rdfActions/getRDF/${id}`);
            const latestSubmission = response.data;
            console.log("LATEST : ",latestSubmission);
             setFormData(latestSubmission);

            // const stdid = response.data.studentId;

            const studentResponse = await axios.get(`http://localhost:8080/api/auth/student/getuseremail/${id}`);
            const newdata = await axios.get(`http://localhost:8080/api/auth/student/getstd/${studentResponse.data}`);
            const studentData = newdata.data;
            console.log("STUDENT : ",studentData);

           
            setEditId(id);

            setFormData(prevState => ({
                ...prevState,
                 // Ensure the initial value is defined
                bname: studentData.branch || '', // Ensure the initial value is defined
                studentId : id, // Ensure the initial value is defined
                stdemail : studentData.email || '', // Ensure the initial value is defined
            }));
            console.log("FORM : ",formData);
        } catch (error) {
            console.error('Error loading latest submission:', error);
        }
    };

    return (
        <div className='req-main-bg'>
            <div className='req-card'>
                <h1>Request Your Dissertation</h1>
                <div className='req-btn-cont'>
                <button className='btn req-edit-btn' onClick={() => handleEditClick(sid)}>Edit <CiEdit /></button>
                </div>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <label className='form-label'>Email of the Student : </label>
                    <input type="text" name="stdemail" id="stdemail" className='form-control' required value={formData.stdemail} onChange={handleChange} disabled={isEditing} />

                    <label className='form-label'>Branch Name : </label>
                    <input type="text" name="bname" id="bname" className='form-control' required value={formData.bname} onChange={handleChange} />

                    <label className='form-label'>Dissertation Name : </label>
                    <input type="text" name="dissertationName" id="dissertationName" className='form-control' required value={formData.dissertationName} onChange={handleChange} />

                    <label className='form-label'>Dissertation Idea : </label>
                    <textarea name="dissertationDesc" id="dissertationDesc" className='form-control' required value={formData.dissertationDesc} onChange={handleChange} />

                    <label className='form-label'>Latest Result : </label>
                    <input type="text" name="stdResult" id="stdResult" className='form-control' required value={formData.stdResult} onChange={handleChange} />

                    <label className='form-label'>Qualification : </label>
                    <input type="text" name="qualification" id="qualification" className='form-control' required value={formData.qualification} onChange={handleChange} />

                    <button type="submit" className='btn req-btnlocal'>{isEditing ? 'Update' : 'Submit'}</button>
                </form>
                {submitMessage && (
                    <div className="alert alert-success mt-3" role="alert">
                        {submitMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestForm;
