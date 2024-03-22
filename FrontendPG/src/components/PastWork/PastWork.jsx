import React from 'react';
import StudentCard from '../../CommonCard/StudentCard'; // Assuming StudentCard is in the same directory
import im1 from "../../assets/f.jpg";
const DummyData = [
  {
    profile: im1,
    name: 'John Doe',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link1: '/',
    link2: '/',
    img: im1,
  },
  {
    profile:im1,
    name: 'Jane Smith',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link1: '/',
    link2: '/',
    img: im1,
  },
  {
    profile: im1,
    name: 'Jane Smith',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link1: '/',
    link2: '/',
    img: im1,
  },
  {
    profile:im1,
    name: 'Jane Smith',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link1: '/',
    link2: '/',
    img: im1,
  },
  // Add more dummy data as needed
];

const StudentCardList = () => {
  return (
    <div>
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
  );
};

export default StudentCardList;
