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

import SubmitFor from './pages/ResearchWorkForm/Submitfor';
import UpdateForm from './pages/ResearchWorkForm/UpdateForm'
import Submissions from './pages/Submissions/Submissions';
import LatestDetailedSubmission from './pages/Submissions/LatestDetailedSubmission';
import PastDetailedSubmission from './pages/Submissions/PastDetailedSubmission';

// import SidebarOm from './UI/Sidebar/SidebarOm';

const StuGuideDashboard = () => {
  return (
    <div>
      <Header />

      <div className='d-flex'>
        <Sidebar />
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mentors" element={<MentorsCard />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/guide" element={<Guide />} />

            <Route path='/submit-for/:taskid/add-work' element={<ResearchWorkForm />} />
            
            <Route path='/submit-for' element={<SubmitFor />} />
            <Route path='/submissions' element={<Submissions />} />
            <Route path='/submissions/:taskid/:submissionid/update' element={<UpdateForm />} />
            <Route path='/submissions/:taskid/:submissionid/latest' element={<LatestDetailedSubmission />} />
            <Route path='/submissions/:taskid/:submissionid/past' element={<PastDetailedSubmission />} />

            

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default StuGuideDashboard;
