import React, { useEffect, useState } from 'react';
import './EditGuide.css'
import axios from 'axios';

const EditGuide = () => {
    const [guides,setGuides]=useState(null);
    const [loading, setLoading] = useState(true);
   
    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true)
            try {
                const response=await axios.get(`http://localhost:8080/api/auth/guide/guideEmail/${useremail}`);
                setGuides(response.data);
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        };
        fetchData();
    },[]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
           const response = await axios.put("http://localhost:8080/guides/guideId/wdhcdh", guides);
          console.log('Update successful:', response.data);
          // Handle success (e.g., display success message)
        } catch (error) {
          console.error('Update failed:', error);
          // Handle error (e.g., display error message)
        }
        setLoading(false);
      };
    if (loading) {
        return <div>Loading...</div>;
    }
  return (
    <div>
      {guides.map(guides=>(
        <div key={guides.id}>
        <div className='guide_dashboard'>  
        <div className='guide_main'>
            {/*<div className='guide_head'>
            </div>*/}
            <div id="New_request">
    <div className="guidereq_head">
    <div className="guidereq_img">
    <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=105&w=145&h=97" alt="" />
    </div>
        <div>
        <h2>{guides.name} </h2>
        <p>{guides.academicQualification}</p>
    
        </div>
    </div>
            <h2>Edit Details</h2>
           <form onSubmit={handleSubmit}>
           <div className="guide_edit">
                        <p>Guide Id: <input type="text" name="guideId" id="" value={guides.guideId} onChange/></p>
                        <p>Email: <input type="email" name="email" id="" value={guides.email}  onChange/></p>
                        <p>Phone: <input type="text" name="phoneNumber" id="" value={guides.phoneNumber}  onChange/></p>
                        <p>Gender: <input type="text" name="gender" id="" value={guides.gender}  onChange/></p>
                        <p>Academic Qualifications: <input type="text" name="academicQualification" id="" value={guides.academicQualification}   onChange/></p>
                        <p>Years of Experience: <input type="text" name="yearOfExperience" id="" value={guides.yearOfExperience}   onChange/></p>
                        <p>Area of Specialization: <input type="text" name="areaOfSpecialization" id="" value={guides.areaOfSpecialization}   onChange/></p>
                        <p>Students Mentored: <input type="text" name="yearOfExperience" id="" value={guides.yearOfExperience}   onChange/></p>
                        
                    </div >
                    <div className='guide_editButton'>
                    <button type='submit'>Edit</button>
                    </div>
           </form>
            </div>
            </div>
            </div>
      </div>
      ))}

    </div>
  );
}

export default EditGuide;
