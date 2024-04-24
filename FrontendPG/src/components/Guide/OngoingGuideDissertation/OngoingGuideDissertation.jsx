// import './OngoingGuideDissertation.css';
// const OngoingGuideDissertation = ()=>{
//     return (
//         <>
//         <div id="gongoing_dissertation">
//         <div className="guidereq_head">
//             <div className="guidereq_img">
//             <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=105&w=145&h=97" alt="" />
//             </div>
//                 <div>
//                 <h2>Abc </h2>
//                 <p>Phd in Phycology</p>
//                 </div>
//             </div>
// <h2>Ongoing Dissertations</h2>
// <div className="guide_ongoingD">
//     <div className="guide_ongoingDis">
//         <div className="stu_img">
//             <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
//         </div>
//         <div className="ongoing_content">
//             <p>Topic: Lorem ipsum dolor sit amet</p>
//             <p>Name: ABC XYZ</p>
//             <p>Email: abc@gmail.com</p>
//             <button>View More</button>
//         </div>
//     </div>
//     <div className="guide_ongoingDis">
//         <div className="stu_img">
//             <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
//         </div>
//         <div className="ongoing_content">
//             <p>Topic: Lorem ipsum dolor sit amet</p>
//             <p>Name: ABC XYZ</p>
//             <p>Email: abc@gmail.com</p>
//             <button>View More</button>
//         </div>
//     </div>
//     <div className="guide_ongoingDis">
//         <div className="stu_img">
//             <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
//         </div>
//         <div className="ongoing_content">
//             <p>Topic: Lorem ipsum dolor sit amet</p>
//             <p>Name: ABC XYZ</p>
//             <p>Email: abc@gmail.com</p>
//             <button>View More</button>
//         </div>
//     </div>
//     <div className="guide_ongoingDis">
//         <div className="stu_img">
//             <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
//         </div>
//         <div className="ongoing_content">
//             <p>Topic: Lorem ipsum dolor sit amet</p>
//             <p>Name: ABC XYZ</p>
//             <p>Email: abc@gmail.com</p>
//             <button>View More</button>
//         </div>
//     </div>
//     <div className="guide_ongoingDis">
//         <div className="stu_img">
//             <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
//         </div>
//         <div className="ongoing_content">
//             <p>Topic: Lorem ipsum dolor sit amet</p>
//             <p>Name: ABC XYZ</p>
//             <p>Email: abc@gmail.com</p>
//             <button>View More</button>
//         </div>
//     </div>
// </div>
// </div>
//         </>
//     )
// }
// export default OngoingGuideDissertation;

import React, { useEffect, useState } from 'react';
import './OngoingGuideDissertation.css';


// const   OngoingGuideDissertation = () => {

import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
const OngoingGuideDissertation = () => {
    const {authenticated, useremail}=useAuth();
    const [guides,setGuides]=useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true)
            try {
                const response=await axios.get(`http://localhost:8080/api/auth/guide/guideEmail/${useremail}`)
                setGuides(response.data);
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        };
        fetchData();
    },[]);

    // Dummy data representing ongoing dissertations
    const ongoingDissertationsData = [
        {
            topic: 'Lorem ipsum dolor sit amet',
            name: 'ABC XYZ',
            email: 'abc@gmail.com'
        },
        {
            topic: 'Lorem ipsum dolor sit amet',
            name: 'ABC XYZ',
            email: 'abc@gmail.com'
        },
        {
            topic: 'Lorem ipsum dolor sit amet',
            name: 'ABC XYZ',
            email: 'abc@gmail.com'
        },
        {
            topic: 'Lorem ipsum dolor sit amet',
            name: 'ABC XYZ',
            email: 'abc@gmail.com'
        },
        {
            topic: 'Lorem ipsum dolor sit amet',
            name: 'ABC XYZ',
            email: 'abc@gmail.com'
        },
        {
            topic: 'Lorem ipsum dolor sit amet',
            name: 'ABC XYZ',
            email: 'abc@gmail.com'
        },
        {
            topic: 'Lorem ipsum dolor sit amet',
            name: 'ABC XYZ',
            email: 'abc@gmail.com'
        },
        // Add more ongoing dissertation objects as needed
    ];
    const dataToSend = { receiver: 'xyz' };
   
    if (loading) {
        return <div>Loading...</div>;
    
    }
    return (
        <div id="New_request">
            {/* <div className="guidereq_head">
                <div className="guidereq_img">
                    <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=105&w=145&h=97" alt="" />
                </div>
                <div>
                    <h2>Abc </h2>
                    <p>Phd in Phycology</p>
                </div>
            </div> */}
            <h2>Ongoing Dissertations</h2>
            <div className="new_requests">
                {ongoingDissertationsData.map((dissertation, index) => (
                    <div className="new_request" key={index}>
                        <div className="student_img">
                            <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
                        </div>
                        <div className="greq_head">
                            <p>Topic: {dissertation.topic}</p>
                            <p>Name: {dissertation.name}</p>
                            <p>Email: {dissertation.email}</p>

                        </div>
                        <div className="greq_button">
//                             <button>view more</button>

                            <Link to={`allottask/${dissertation.email}`}><button>Allot Task</button></Link>
                            <Link to={`/${useremail}/studentguide/`}><button>View More</button></Link>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OngoingGuideDissertation;
