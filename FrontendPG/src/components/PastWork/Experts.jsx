import React from 'react';
// import './template.css';

const Experts = () => {
  // Sample data for demonstration
  const researchData = [
    {
      id: 1,
      image: "https://msu-new-2023-ec2-ubuntu-unzip.s3.ap-south-1.amazonaws.com/asset/storage/staff_pic/913ams.jpg",
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
    },
    {
      id: 5,
      image: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
      author: "Soumya Sharma",
      guide: "Abhishek Patel"
    },
    {
      id: 6,
      image: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
      author: "Soumya Sharma",
      guide: "Abhishek Patel"
    },
    {
      id: 7,
      image: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
      author: "Soumya Sharma",
      guide: "Abhishek Patel"
    },
    {
      id: 8,
      image: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
      author: "Soumya Sharma",
      guide: "Abhishek Patel"
    },
  ];

  return (
    <div className="topResearches">
      <h2>Our Experts</h2>
      <div className="trContents">
        {researchData.map((research) => (
          <div className="trContent" key={research.id}>
            <img src={research.image} alt={`Research ${research.id}`} className="research-image" />
            <p>-by {research.author}</p>
            <p>-guided by {research.guide}</p>
            <button>
            <a href=''>Profile</a>
            </button>
              
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Experts;
