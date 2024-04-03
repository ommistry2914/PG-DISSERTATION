import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import Login from "./components/Regsiter/LoginPage/Login"
import Signup from "./components/Regsiter/SignupPage/Signup"
import GuideSignUp from "./components/Regsiter/SignupPage/GuideSignUp";
import MainSignUp from "./components/Regsiter/SignupPage/MainSignUp";
import GuideDashboard from "./components/Guide/GuideDashboard/GuideDashboard";
import RequestForm from "./components/RequestConnection/RequestForm";
import Statistics from "./components/LandingPage/Statistics/Statistics";
import GuideCard from "./CommonCard/GuideCard";
import StudentDashBoard from "./components/Student/StudentDashBoard";
import WebTeamMain from "./components/WebTeam/WebTeamMain";



function App() {

  return (
    <Router>
     
      <Routes>
        
           <Route path="/studentguide/*" element={< StuGuideDashboard/>}></Route>
           <Route path="/studentguide" element={<StuGuideDashboard />} />
       <Route exact path="/login" element={<Login/>}></Route> 
      <Route exact path="/mainsign" element={<MainSignUp/>}></Route>
      <Route exact path="/signup/student" element={<Signup/>}></Route>
      <Route exact path="/signup/guide" element={<GuideSignUp/>}></Route>
      <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/signup" element={<MainSignUp/>}></Route>
        <Route exact path="/mentorprofile" element={<GuideDashboard/>}></Route>
        <Route exact path="/faqs" element={<Faqs/>}></Route>
        <Route exact path="/requestform" element={<RequestForm />}></Route>
        <Route exact path="/statistics" element={<Statistics />}></Route>
        <Route exact path="/showguide" element={<GuideCard />}></Route>
        <Route exact path="/studentdashboard" element={<StudentDashBoard />} ></Route>
        <Route exact path="/webteam"  element={<WebTeamMain />} ></Route>


      </Routes>
    </Router>
  )
}

export default App;
