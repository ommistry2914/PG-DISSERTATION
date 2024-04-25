// import React from 'react'
// import './PastStudentData.css';

// const PastStudentData = () => {
//     return (
//         <div className='vdf-main-bggg'>
//             <div className="vdf-carddds">
//                 <h2>Profile Details</h2>
//                 <hr />

//                 <div className="vdf-contenttt">
//                     <p className="vdf-label">Student Name: </p>
//                     <div className="form-control vdf-input">
//                         <p></p>
//                     </div>
//                     <p className="vdf-label">Branch: </p>
//                     <div className="form-control vdf-input">
//                         <p></p>
//                     </div>
//                     <p className="vdf-label">Dissertation Name: </p>
//                     <p className="form-control vdf-input">

//                     </p>
//                     <p className="vdf-label">Dissertation Description: </p>
//                     <p className="form-control vdf-input"></p>

//                     <p className="vdf-label">Latest Result: </p>
//                     <p className="form-control vdf-input">

//                     </p>
//                     <p className="vdf-label">Qualification: </p>
//                     <p className="form-control vdf-input"></p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default PastStudentData

import { useEffect, useState } from 'react'
import React from 'react'
import './PastStudentData.css'
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import {useParams} from 'react-router-dom';
const PastStudentData = () => {
    const [guides,setGuides]=useState(null);
    const [loading, setLoading] = useState(true);
    const {useremail}=useAuth();
    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true)
            
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
                                <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=105&w=145&h=97" alt="" />
                            </div>
                            <div className="ghead">
                                <h2>{guides.name}</h2>
                                <p>{guides.academicQualification} </p>
                            </div>
                            <div className="guide_contact">
                                <p>Student Id: <input type="text" name="" id="" value={guides.guideId} readOnly/></p>
                                <p>Email: <input type="text" name="" id="" value={guides.email} readOnly/></p>
                                <p>Phone: <input type="text" name="" id="" value={guides.phoneNumber} readOnly/></p>
                                <p>Gender: <input type="text" name="" id="" value={guides.gender} readOnly/></p>
                            </div>
                            
                        </div>
   
                        <div className="guide_details">
                            <div id="gdashboard">
                                <h3>About</h3>
                                <div className="guide_about">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio maxime inventore soluta, maiores totam tempore! Veniam voluptatem quae possimus suscipit neque! Quibusdam dolorem iusto, dignissimos repudiandae ut ullam voluptates molestiae.</p>
                                </div>
                                <h3>Details</h3>
                                <p>Branch : <input type="text" name="" id="" value={guides.academicQualification} readOnly /></p>
                                <p>Dissertation Name : <input type="text" name="" id="" value={guides.yearOfExperience} readOnly /></p>
                                <p>Dissertation Description: <input type="text" name="" id="" value={guides.areaOfSpecialization} readOnly /></p>
                                <p>Qualification : <input type="text" name="" id="" value={'cse'} readOnly /></p>
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

export default PastStudentData;

