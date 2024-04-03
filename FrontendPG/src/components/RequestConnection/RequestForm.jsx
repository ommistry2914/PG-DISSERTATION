import React from 'react'
import './RequestForm.css'
import { CiEdit } from "react-icons/ci";

const RequestForm = () => {
  return (
    <div className='req-main-bg'>
        <div className='req-card'>
            <h1>Request Your Dissertation</h1>
            <div className='req-btn-cont'>
            <button className='btn req-edit-btn'>Edit <CiEdit /></button>
            </div>
<hr></hr>
            <form>
                <label className='form-label'>Name of the Student : </label>
                <input  type="text" name="stname" id="stname" className='form-control' required></input>

                <label className='form-label'>Branch Name : </label>
                <input  type="text" name="bname" id="bname" className='form-control' required></input>

                <label className='form-label'>Dissertation Name : </label>
                <input  type="text" name="dname" id="dname" className='form-control' required></input>

                <label className='form-label'>Dissertation Idea : </label>
                <textarea name="didea" id="didea" className='form-control' required></textarea>

                <label className='form-label'>Latest Result : </label>
                <input  type="text" name="result" id="result" className='form-control' required></input>

                <label className='form-label'>Qualification  : </label>
                <input  type="text" name="qfl" id="qfl" className='form-control' required></input>

                <button type="submit" className='btn req-btnlocal'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default RequestForm