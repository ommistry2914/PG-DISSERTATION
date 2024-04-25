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
import './TopResearcher.css';
import { Link } from 'react-router-dom';

const TopResearcher = () => {
  // Sample data for demonstration
  const researchData = [
    {
      id: 1,
      image: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
      author: "Soumya Sharma",
      guide: "Abhishek Patel"
    },
    {
      id: 2,
      image: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
      author: "Soumya Sharma",
      guide: "Abhishek Patel"
    },
    {
      id: 3,
      image: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
      author: "Soumya Sharma",
      guide: "Abhishek Patel"
    },
    {
      id: 4,
      image: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
      author: "Soumya Sharma",
      guide: "Abhishek Patel"
    }
  ];

  return (
    <div className="topResearches">
      <h2>Templates</h2>
      <div className="trContents">
        {researchData.map((research) => (
          <div className="trContent" key={research.id}>
            <img src={research.image} alt={`Research ${research.id}`} className="research-image" />
            <p>-by {research.author}</p>
            <p>-guided by {research.guide}</p>
            <button>
            <a download=""  href="/src/assests/sampleTemplate">Download</a>
            </button>
          </div>
        ))}
      </div>
      <button className="trview_more">
        <Link to="/templates">View More</Link>
      </button>
    </div>
  );
};

export default TopResearcher;
