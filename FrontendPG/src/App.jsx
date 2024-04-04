import { BrowserRouter as Router, Route, Routes ,Navigate} from "react-router-dom";
import './App.css'
import Navbar from './components/Layout/Navbar/navbar';
import Home from './screens/home';
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


const App = () => {

  const { authenticated, userRole } = useAuth();

  return (
    <Router>

     {/* <Navbar/> */}
    <Routes>
      
         
        
      <Route path="/" element={<Home />} />
        <Route path="/signup" element={<MainSignUp />} />
        <Route path="/login" element={<Login />} />
        {/* {authenticated && userRole === 'guide' ? (
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
        {authenticated && userRole === 'guide' ? (
          <Route path="/mentorprofile" element={<GuideDashboard />} />
        ) : (
          <Route path="/mentorprofile" element={<Navigate to="/" />} />
        )}
{authenticated && userRole === 'student' ? (
          <Route exact path="/studentdashboard" element={<StudentDashBoard />} ></Route>
        ) : (
          <Route path="/studentdashboard" element={<Navigate to="/" />} />
        )}
         */}
          <Route path=":studentid/studentguide/*" element={< StuGuideDashboard/>}></Route>
          <Route path=":studentid/studentguide" element={<StuGuideDashboard />} />
            
          <Route path="/signup/guide" element={<GuideSignUp />} />
          <Route path="/signup/student" element={<Signup />} />
          <Route path="/studentguide/*" element={<StuGuideDashboard />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/trending" element={<MainLayout />} />
          <Route path="/mentorprofile" element={<MainGuideDashboard />} />
          <Route path="/mentorprofile/*" element={<MainGuideDashboard />} />
          <Route exact path="/studentdashboard" element={<StudentDashBoard />} ></Route>
        <Route exact path="/requestform" element={<RequestForm />}></Route>
        <Route exact path="/statistics" element={<Statistics />}></Route>
        <Route exact path="/showguide" element={<GuideCard />}></Route>
        <Route exact path="/webteam"  element={<WebTeamMain />} ></Route>
    
      </Routes>
    </Router>
  );
};

export default App;
