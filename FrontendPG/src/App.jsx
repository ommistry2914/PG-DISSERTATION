import { BrowserRouter as Router, Route, Routes, useLocation, Outlet } from "react-router-dom";
import './App.css'
import Home from "./screens/home";
import StuGuideDashboard from "./components/CommonPage/StuGuideDashboard";
import Progress from "./components/CommonPage/pages/Progress/Progress";
import Schedule from "./components/CommonPage/pages/Schedule/Schedule";
import MentorsCard from "./components/CommonPage/pages/Mentors/MentorsCard";
import ResearchWorkForm from "./components/CommonPage/pages/ResearchWorkForm/ResearchWorkForm";
import FaqsMain from "./components/LandingPage/FAQS/FaqsMain";
import Faqs from "./components/LandingPage/FAQS/Faqs";
import Guide from "./components/CommonPage/pages/Guide/Guide"

function App() {

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<StuGuideDashboard/>}>
          <Route path="/mentors" element={<MentorsCard />}></Route>
          <Route path="/guide" element={<Guide />} />
          <Route path="/progress" element={<Progress />}></Route>
          <Route path="/schedule" element={<Schedule />}></Route>
          <Route path="/add-work" element={<ResearchWorkForm />} />
        </Route> */}
      </Routes>
    </Router>
  )
}

export default App
