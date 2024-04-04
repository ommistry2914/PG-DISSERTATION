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

import React from 'react';
import './OngoingGuideDissertation.css';

const OngoingGuideDissertation = () => {
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

    return (
        <div id="gongoing_dissertation">
            <div className="guidereq_head">
                <div className="guidereq_img">
                    <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=105&w=145&h=97" alt="" />
                </div>
                <div>
                    <h2>Abc </h2>
                    <p>Phd in Phycology</p>
                </div>
            </div>
            <h2>Ongoing Dissertations</h2>
            <div className="guide_ongoingD">
                {ongoingDissertationsData.map((dissertation, index) => (
                    <div className="guide_ongoingDis" key={index}>
                        <div className="stu_img">
                            <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=95&w=145&h=97" alt="" />
                        </div>
                        <div className="ongoing_content">
                            <p>Topic: {dissertation.topic}</p>
                            <p>Name: {dissertation.name}</p>
                            <p>Email: {dissertation.email}</p>
                            <button>View More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OngoingGuideDissertation;
