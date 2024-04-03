import React from 'react';
import StudentCard from '../../CommonCard/StudentCard'; // Assuming StudentCard is in the same directory
import './PastWork.css';
const DummyData = [
  {
    profile: "",
    name: 'John Doe',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link1: '/',
    link2: '/',
    img: "",
  },
  {
    profile:"",
    name: 'Jane Smith',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link1: '/',
    link2: '/',
    img: "",
  },
  {
    profile: "",
    name: 'Jane Smith',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link1: '/',
    link2: '/',
    img: "",
  },
  {
    profile:"",
    name: 'Jane Smith',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link1: '/',
    link2: '/',
    img: "",
  },
  // Add more dummy data as needed
];

const StudentCardList = () => {
  return (
    <div className='main-bobwork'>
    <h2>Top Researches</h2>
    <div className='main_class'>
      {DummyData.map((data, index) => (
        <StudentCard
          key={index}
          profile={data.profile}
          name={data.name}
          desc={data.desc}
          link1={data.link1}
          link2={data.link2}
          img={data.img}
        />
      ))}
    </div>
    </div>
    
  );
};

export default StudentCardList;
