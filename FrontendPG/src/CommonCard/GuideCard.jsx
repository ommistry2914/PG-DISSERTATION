// import React from 'react';
// import './Guidecard.css';
// import img1 from '../assests/techo-home.png'

// const GuideCard = () => {
//   return (
//     <div className='main-bobwork1'>
//       <h2>Our Top Experts</h2>
//       <div className='guide-main'>
//         <div className='guide-card-container'>
//           {/* Render 4 cards */}
//           {[...Array(4)].map((_, index) => (
//             <div className='guide-card' key={index}>
//               <div className='guide-card-content'>
//                 <img src={img1} alt="name" className='guide-img'></img>
//                 <div className="content">
//                   <h4>MSU Teacher</h4>
                  
//                   <div className='pcss'>
//                     <p>Expertise in AI and ML </p>
//                     <p>with experience of 3+ years</p>
//                   </div>
//                   <div className="button-container">
//                     <button className='button'>Details</button>
//                     <button className='button'>Request</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className='viewmore'>
//         <button className='button-view'>View More</button>
//       </div>
//     </div>
//   );
// }

// export default GuideCard;


// import React from 'react'
// import './TopResearcher.css';

// const TopResearcher = () => {
//   return (
//     <div>
//       <div class="topResearches">
//         <h2>Top Researches</h2>
//         <div class="trContents">
//              <div class="trContent">
//                 <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
//                 <p>-by Soumya Sharma</p>
//                 <p>-guided by Abhishek Patel</p>
//                 <button>Details</button>
//              </div>
//              <div class="trContent">
//                 <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
//                 <p>-by Soumya Sharma</p>
//                 <p>-guided by Abhishek Patel</p>
//                 <button>Details</button>
//              </div>
//              <div class="trContent">
//                 <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
//                 <p>-by Soumya Sharma</p>
//                 <p>-guided by Abhishek Patel</p>
//                 <button>Details</button>
//              </div>
//              <div class="trContent">
//                 <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
//                 <p>-by Soumya Sharma</p>
//                 <p>-guided by Abhishek Patel</p>
//                 <button>Details</button>
//              </div>
//         </div>
//             <button class="trview_more">View More</button>
        
//     </div>
//     </div>
//   )
// }

// export default TopResearcher

// import React from 'react';
// import './TopResearcher.css';

// const TopResearcher = () => {
//   const researchData = [
//     {
//       id: 1,
//       content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//       author: "Soumya Sharma",
//       guide: "Abhishek Patel"
//     },
//     {
//       id: 2,
//       content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//       author: "Soumya Sharma",
//       guide: "Abhishek Patel"
//     },
//     {
//       id: 3,
//       content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//       author: "Soumya Sharma",
//       guide: "Abhishek Patel"
//     },
//     {
//       id: 4,
//       content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
//       author: "Soumya Sharma",
//       guide: "Abhishek Patel"
//     }
//   ];

//   return (
    
//       <div className="topResearches">
//         <h2>Templates</h2>
//         <div className="trContents">
//           {researchData.map((research) => (
//             <div className="trContent" key={research.id}>
//               <p>{research.content}</p>
//               <p>-by {research.author}</p>
//               <p>-guided by {research.guide}</p>
//               <button>Details</button>
//             </div>
//           ))}
//         </div>
//         <button className="trview_more">View More</button>
//       </div>
    
//   );
// };

// export default TopResearcher;

import React from 'react';
import './Guidecard.css';

import  { Link } from "react-router-dom";

const GuideCard = () => {
  // Sample data for demonstration
  const researchData = [
    {
      id: 1,
      image: "https://msu-new-2023-ec2-ubuntu-unzip.s3.ap-south-1.amazonaws.com/asset/storage/staff_pic/913ams.jpg",
      author: "Prof. (Dr.) Apurva M. Shah",
      guide: "Professor"
    },
    {
      id: 2,
      image: "https://msu-new-2023-ec2-ubuntu-unzip.s3.ap-south-1.amazonaws.com/asset/storage/staff_pic/701mcp.jpg",
      author: "Dr. Mamta C. Padole",
      guide: "Associate Professor"
    },
    {
      id: 3,
      image: "https://msu-new-2023-ec2-ubuntu-unzip.s3.ap-south-1.amazonaws.com/asset/storage/staff_pic/Dr._Viral_Kapadia-removebg-preview.png",
      author: "Dr. Viral V. Kapadia",
      guide: "Associate Professor"
    },
    {
      id: 4,
      image: "https://msu-new-2023-ec2-ubuntu-unzip.s3.ap-south-1.amazonaws.com/asset/storage/staff_pic/764kshitij.jpg",
      author: "Mr. Kshitij U Gupte",
      guide: "Assistant Professor"
    }
  ];

  return (
    <div className="topResearches">
      <h2>Our Experts</h2>
      <div className="trContents">
        {researchData.map((research) => (
          <div className="trContent expert-main" key={research.id}>
            <img src={research.image} alt={`Research ${research.id}`} className="research-image" />
            <p> {research.author}</p>
            <p>{research.guide}</p>
          </div>
        ))}
      </div>
      <div className='trview_more'>
      <Link to="/requestguidepage"><button className='trview_more'>View More</button></Link>
      </div>
    </div>
  );
};

export default GuideCard;

