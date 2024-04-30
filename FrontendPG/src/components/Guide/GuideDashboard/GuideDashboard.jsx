import { useEffect, useState } from 'react'
import React from 'react'
import './GuideDashboard.css'
import axios from 'axios';
import { useAuth } from '../../../AuthContext';
import {useParams} from 'react-router-dom';
const GuideDashboard = () => {
    const [guides,setGuides]=useState(null);
    const [loading, setLoading] = useState(true);
    const {useremail}=useAuth();
    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true)
            try {
                const response=await axios.get(`http://localhost:8080/api/auth/guide/guideEmail/${useremail}`)
                setGuides(response.data);
                console.log(response);
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        };
        fetchData();
    },[]);
    if (loading) {
        return <div>Loading...</div>;
    
    }
    return (
        
        <>
            <div className='guide_dashboard'>
                
                <div className='guide_main'>
                    {/*<div className='guide_head'>
                    </div>*/}
                    {guides.map(guides=>(
                        <div key={guides.id}>
                        <div className='guide_content'>
                        <div className="guide_profile">
                            <div className="guide_img">
                                <img src={guides.image} alt="" />
                            </div>
                            <div className="ghead">
                                <h2>{guides.name}</h2>
                                <p>{guides.academicQualification} </p>
                            </div>
                            <div className="guide_contact">
                                <p>Guide Id: <input type="text" name="" id="" value={guides.guideId} readOnly/></p>
                                <p>Email: <input type="text" name="" id="" value={guides.email} readOnly/></p>
                                <p>Phone: <input type="text" name="" id="" value={guides.phoneNumber} readOnly/></p>
                                <p>Gender: <input type="text" name="" id="" value={guides.gender} readOnly/></p>
                            </div>
                            
                        </div>
   
                        <div className="guide_details">
                            <div id="gdashboard">
                                <h3>About</h3>
                                <div className="guide_about">
                                    <p>Working for the betterment of students' dissertation</p>
                                </div>
                                <h3>Details</h3>
                                <p>Academic Qualifications: <input type="text" name="" id="" value={guides.academicQualification} readOnly /></p>
                                <p>Years of Experience: <input type="text" name="" id="" value={guides.yearOfExperience} readOnly /></p>
                                <p>Area of Specialization: <input type="text" name="" id="" value={guides.areaOfSpecialization} readOnly /></p>
                                <p>Students Mentored: <input type="text" name="" id="" value={'Around 70'} readOnly /></p>
                            </div>
   
                        </div>
                    </div>
                    </div>
                    ))}
                    
                </div>
            </div>
        </>
    )
}

export default GuideDashboard
