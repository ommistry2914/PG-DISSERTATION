import React, { useState } from 'react';
import './RequestForm.css';
import { CiEdit } from "react-icons/ci";
import axios from 'axios';

const RequestForm = () => {
    const [formData, setFormData] = useState({ studentId: '', bname: '', dissertationName: '', dissertationDesc: '', stdResult: '', qualification: '' });
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
                response = await axios.post('http://localhost:8080/rdfActions/addRDF', formData);
            }
            console.log('Response:', response.data);
            setSubmitMessage(response.data);
            setFormData({ studentId: '', bname: '', dissertationName: '', dissertationDesc: '', stdResult: '', qualification: '' }); // Reset form data
            setIsEditing(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEditClick = async (id) => {
        setIsEditing(true);
        try {
            const response = await axios.get(`http://localhost:8080/rdfActions/getRDF/${id}`);
            const latestSubmission = response.data;
            setFormData(latestSubmission);
            setEditId(id);

const stdid = response.data.studentId;
            const studentResponse = await axios.get(`http://localhost:8080/api/auth/student/${stdid}`);
                    const studentData = studentResponse.data;
                    setFormData(prevState => ({
                        ...prevState,
                        bname: studentData.branch ,
                        studentId : studentData.email
                    }));
        } catch (error) {
            console.error('Error loading latest submission:', error);
        }
    };

    return (
        <div className='req-main-bg'>
            <div className='req-card'>
                <h1>Request Your Dissertation</h1>
                <div className='req-btn-cont'>
                    <button className='btn req-edit-btn' onClick={() => handleEditClick("9e78717b")}>Edit <CiEdit /></button>
                </div>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <label className='form-label'>Email of the Student : </label>
                    <input type="text" name="studentId" id="studentId" className='form-control' required value={formData.studentId} onChange={handleChange} disabled={isEditing} />

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
