import React from 'react';
import './common.css';
import Sidebar from './UI/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import MentorsCard from './pages/Mentors/MentorsCard';
import Progress from './pages/Progress/Progress';
import Schedule from './pages/Schedule/Schedule';
import Guide from './pages/Guide/Guide';
import { Routes, Route } from 'react-router-dom';
import ResearchWorkForm from './pages/ResearchWorkForm/ResearchWorkForm';
import Header from './UI/Header/Header'

const StuGuideDashboard = () => {
  return (
  <div>
    <Header/>
    <div className='d-flex'>
        <Sidebar />
        <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mentors" element={<MentorsCard />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/guide" element={<Guide />} /> 
          <Route path="/add-work" element={<ResearchWorkForm />} />
        </Routes></div>
      </div></div>
  );
};

export default StuGuideDashboard;
