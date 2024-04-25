import React from 'react';
import StudentCard from '../../CommonCard/StudentCard'; // Assuming StudentCard is in the same directory
import './PastWork.css';
const DummyData = [
  {
    profile: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
    name: 'John Doe',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link1: '/paststudentdata',
    img: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
  },
  {
    profile:"https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
    name: 'Jane Smith',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link1: '/paststudentdata',
    img: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
  },
  {
    profile: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
    name: 'Jane Smith',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link1: '/paststudentdata',
    img: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
  },
  {
    profile:"https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
    name: 'Jane Smith',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link1: '/paststudentdata',
    img: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
  },
  {
    profile:"https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
    name: 'Jane Smith',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link1: '/paststudentdata',
    img: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
  },
  {
    profile:"https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
    name: 'Jane Smith',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link1: '/paststudentdata',
    img: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
  },
  {
    profile:"https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
    name: 'Jane Smith',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link1: '/paststudentdata',
    img: "https://cdn-images.zety.com/pages/4_pdf_word_resume_modern_1.jpg?1648454089",
  },
  // Add more dummy data as needed
];

const StudentCardList = () => {
  return (
    <div className='main-bobworkkk'>
    <h2>Past Works</h2>
    <div className='main_class_p'>
      {DummyData.map((data, index) => (
        <StudentCard
          key={index}
          profile={data.profile}
          name={data.name}
          desc={data.desc}
          link1={data.link1}
          img={data.img}
        />
      ))}
    </div>
    </div>
    
  );
};

export default StudentCardList;
