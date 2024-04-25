

import { BrowserRouter as Router, Route, Routes ,Navigate, useParams} from "react-router-dom";

import './App.css'
import { useState } from "react";
import Navbar from './components/Layout/Navbar/navbar';
import Home from './screens/home';
import ChatRoom from "./components/ChatBot/ChatBox";
import MainSignUp from './components/Regsiter/SignupPage/MainSignUp';
import Signup from './components/Regsiter/SignupPage/Signup';
import Login from './components/Regsiter/LoginPage/Login';
import GuideSignUp from './components/Regsiter/SignupPage/GuideSignUp';
import StuGuideDashboard from './components/CommonPage/StuGuideDashboard';
import GuideDashboard from './components/Guide/GuideDashboard/GuideDashboard';
import Faqs from './components/LandingPage/FAQS/Faqs';
import MainLayout from './components/TrendingPage/Layout';
import { useAuth } from './AuthContext';
import MainGuideDashboard from './components/Guide/MainGuideDashboard';
import ProtectedRoute from "./ProtectedRoute";
import RequestForm from "./components/RequestConnection/RequestForm";
import Statistics from "./components/LandingPage/Statistics/Statistics";
import GuideCard from "./CommonCard/GuideCard";
import StudentDashBoard from "./components/Student/StudentDashBoard";
import WebTeamMain from "./components/WebTeam/WebTeamMain";
import RequestGuide from "./components/RequestConnection/RequestGuide";
import ViewRDF from "./components/RequestConnection/ViewRDF";
import ProfilePage from "./components/Student/ProfilePage";
// import Form from "./components/CommonPage/pages/ResearchWorkForm/Form";
import PastStudentData from "./components/PastWork/PastStudentData";
import OurGuideData from "./components/PastWork/OurGuideData";
import PastPage from "./components/PastWork/PastPage";
import Template from "./components/Template/Template"
import Experts from "./components/PastWork/Experts";
const App = () => {
  const [user, setUser] = useState();
  const { authenticated, userRole, useremail } = useAuth();
  return (
    <Router>
    <Navbar/> 

    <Routes>
      
      <Route path="/" element={<Home />} />
      {/* <Route path="/chatlogin" element={<AuthPage onAuth={(user) => setUser(user)} />} /> */}
      {/* <Route path="/chatroom" element={<ChatsPage/>} /> */}
      <Route path="/chatroom" element={<ChatRoom/>} />
        <Route path="/signup" element={<MainSignUp />} />
        <Route path="/login" element={<Login />} />


        {authenticated && userRole === 'guide' ? (
          <Route path="/signup/guide" element={<GuideSignUp />} />
        ) : (
          <Route path="/signup/guide" element={<Navigate to="/" />} />
        )}
        {authenticated && userRole === 'student' ? (
          <Route path="/signup/student" element={<Signup />} />
        ) : (
          <Route path="/signup/student" element={<Navigate to="/" />} />
        )}
        <Route path="/studentguide/*" element={<StuGuideDashboard />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/trending" element={<MainLayout />} />
        {authenticated && userRole === 'guide' && useremail? (
          <Route path={`/mentorprofile/*`} element={<MainGuideDashboard />} />
        ) : (
          <Route path="/mentorprofile" element={<Navigate to="/" />} />
        )}
        {authenticated && userRole === 'student' ? (
          <Route exact path="/studentdashboard" element={<StudentDashBoard />} ></Route>
        ) : (
          <Route path="/studentdashboard" element={<Navigate to="/" />} />
        )} 
        
         <Route path=":studentid/studentguide/*" element={< StuGuideDashboard/>}></Route>
          <Route path=":studentid/studentguide" element={<StuGuideDashboard />} />
          <Route path="/signup/guide" element={<GuideSignUp />} />
          <Route path="/signup/student" element={<Signup />} />
          <Route path="/studentguide/*" element={<StuGuideDashboard />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/trending" element={<MainLayout />} />
          <Route exact path="/studentdashboard/:studentId" element={<StudentDashBoard />} ></Route>
        <Route exact path="/requestform/:sid" element={<RequestForm />}></Route>
        <Route exact path="/statistics" element={<Statistics />}></Route>
        <Route exact path="/showguide" element={<GuideCard />}></Route>
        {/* <Route exact path="/chatroom" element={<ChatRoom />}></Route> */}


        <Route exact path="/webteam"  element={<WebTeamMain />} ></Route>
        <Route exact path="/requestguidepage"  element={<RequestGuide />} ></Route>
        <Route exact path="/rdfActions/viewrdf/:stdid"  element={<ViewRDF />} ></Route>
        <Route exact path="/editprofilepage"  element={<ProfilePage />} ></Route>
    
        <Route exact path="/paststudentdata"  element={<PastStudentData />} ></Route>
        <Route exact path="/ourguidedata"  element={<OurGuideData />} ></Route>
        <Route exact path="/pastpage"  element={<PastPage />} ></Route>
        <Route exact path="/templates"  element={<Template />} ></Route>

        <Route exact path="/experts"  element={<Experts />} ></Route>




      </Routes>
    </Router>
  );
};

// const ChatRoomPage = () => {
//   let { username } = useParams();

//   return <ChatsPage user={username} />;
// };

export default App;
