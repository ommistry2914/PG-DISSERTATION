import React from 'react'
import GuideDashboard from './GuideDashboard/GuideDashboard';
import { Routes, Route } from 'react-router-dom';
import NewGuideRequest from './NewGuideRequest/NewGuideRequest';
import OngoingGuideDissertation from './OngoingGuideDissertation/OngoingGuideDissertation';
import StudentMentored from './StudentMentored/StudentMentored';
import EditGuide from './EditGuide';
// import Sidebar from '../CommonPage/UI/Sidebar/Sidebar';
import SidebarOm from '../CommonPage/UI/Sidebar/SidebarOm';
import { GuideSidebar } from "../CommonPage/UI/Sidebar/sidebardata";
import SidebarG from './SidebarG';


const MainGuideDashboard = () => {
  return (
    <div>
        <div className='d-flex'>
        {/* <SidebarOm sidebarData={GuideSidebar} /> */}
        <SidebarG/>
        <div>
        <Routes>
          <Route path="/" element={<GuideDashboard />} />
          <Route path="/request" element={<NewGuideRequest />} />
          <Route path="/ongoing" element={<OngoingGuideDissertation />} />
          <Route path="/pastStudents" element={<StudentMentored />} />
          <Route path="/edit" element={<EditGuide />} />
         
        </Routes>
        </div>
      </div>
      
    </div>
  )
}

export default MainGuideDashboard;
