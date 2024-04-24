import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../AuthContext';
const Form = () => {
    let today=new Date();
    const {useremail}=useAuth();
    const [sendSuccess,setSendSuccess]=useState(false);
    const [sendError,setSendError]=useState(false);
    const [notification,setNotification]=useState({
        senderId:useremail,
        receiverId:'xyz@gmail.com',
        createdAt:today,
        type:'New Request',
        link:'http://localhost:5173/mentorprofile/request'
});


    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=axios.post('http://localhost:8080/api/auth/notification',notification);
        if((await response).status===200){
          console.log('Notification send');
          setSendSuccess(true);
          setSendError(false);
        }
        else{
            setSendError(true);
            setSendSuccess(false);
        }
        console.log(notification);
        }
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><b>rbr
                <b>rbr
                    <br /><br />
                </b>
            </b>
            {sendSuccess && (
            <div className="alert alert-success" role="alert">
              Notification sent successfully!
            </div>
          )}
          {sendError && (
            <div className="alert alert-danger" role="alert">
              Failed to send notification.
            </div>
          )}
            <button type="submit">Submit</button>
        </form>
    </div>
  );
}

export default Form;
