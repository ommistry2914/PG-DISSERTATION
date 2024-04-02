import React from 'react'
import GuideDashboard from './GuideDashboard/GuideDashboard';
import { Routes, Route } from 'react-router-dom';
import NewGuideRequest from './NewGuideRequest/NewGuideRequest';
import OngoingGuideDissertation from './OngoingGuideDissertation/OngoingGuideDissertation';
import StudentMentored from './StudentMentored/StudentMentored';
// import Sidebar from '../CommonPage/UI/Sidebar/Sidebar';
import SidebarOm from '../CommonPage/UI/Sidebar/SidebarOm';
import { GuideSidebar } from "../CommonPage/UI/Sidebar/sidebardata";


const MainGuideDashboard = () => {
  return (
    <div>
        <div className='d-flex'>
        {/* <SidebarOm sidebarData={GuideSidebar} /> */}
        <div>
          <Routes>
            <Route path="/" element={<GuideDashboard />} />
            <Route path="/newrequest" element={<NewGuideRequest />} />
            <Route path="/ongoingdis" element={<OngoingGuideDissertation />} />
            <Route path="/studentmentored" element={< StudentMentored/>} />
          </Routes>
        </div>
      </div>
      
    </div>
  )
}

export default MainGuideDashboard;
