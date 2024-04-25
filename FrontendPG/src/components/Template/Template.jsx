import React from 'react';
import './template.css';

const Template = () => {
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
      <h5>For more knowledge about templates and topic please visit this website</h5>
      <span className='pg-msu'><a href="https://about.proquest.com/en/dissertations/" target='_blank'>www.proquest.com</a></span>
    </div>
  );
};

export default Template;
