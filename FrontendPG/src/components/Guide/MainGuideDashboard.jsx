import React, { useEffect, useState } from 'react'
import GuideDashboard from './GuideDashboard/GuideDashboard';
import { Routes, Route } from 'react-router-dom';
import NewGuideRequest from './NewGuideRequest/NewGuideRequest';
import OngoingGuideDissertation from './OngoingGuideDissertation/OngoingGuideDissertation';
import StudentMentored from './StudentMentored/StudentMentored';
import EditGuide from './EditGuide';
import AllotTask from './AllotTask/AllotTask';
import AllotedTasks from './AllotTask/AllotedTasks';
import UpdateAllotedTask from './AllotTask/UpdateAllotedTask';
// import Sidebar from '../CommonPage/UI/Sidebar/Sidebar';


import SidebarG from './SidebarG';

import Sidebar from '../CommonPage/UI/Sidebar/Sidebar';
import { guidebardata } from '../CommonPage/UI/Sidebar/sidebardata';




import axios from 'axios';
import { useAuth } from '../../AuthContext';
import Navbar from '../Layout/Navbar/navbar';
import '../Layout/Navbar/navbar.css'
import NewSBar from '../CommonPage/UI/Sidebar/NewSBar';

const MainGuideDashboard = () => {

  const {authenticated, useremail}=useAuth();
  
  return (
    <div>
        <div className='d-flex'>
        {/* <SidebarOm sidebarData={GuideSidebar} /> */}
        {/* <SidebarG/> */}
        <NewSBar sidebarData={guidebardata}/>
        <div>
          <Routes>
          <Route path="/" element={<GuideDashboard />} />
          <Route path="/request" element={<NewGuideRequest />} />
          <Route path="/ongoing" element={<OngoingGuideDissertation />} />
          <Route path="/pastStudents" element={<StudentMentored />} />
          <Route path="/edit" element={<EditGuide />} />
          <Route path={`/ongoing/allottask/:studentId`} element={<AllotTask />}></Route>
          <Route path={`/ongoing/allottask/:studentId/alloted`} element={<AllotedTasks />}></Route>
          <Route path={`/ongoing/allottask/:studentid/update/:taskid`} element={<UpdateAllotedTask />}></Route>
        </Routes>
        </div>
      </div>
      
    </div>
  )
}

export default MainGuideDashboard;
