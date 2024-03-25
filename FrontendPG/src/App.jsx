import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './App.css'
import Home from "./screens/home";
import MainSignUp from "./components/Regsiter/SignupPage/MainSignUp";
import Login from "./components/Regsiter/LoginPage/Login";
import GuideDashboard from "./components/Guide/GuideDashboard/GuideDashboard";
import Signup from "./components/Regsiter/SignupPage/Signup";
import GuideSignUp from "./components/Regsiter/SignupPage/GuideSignUp";
function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/signup" element={<MainSignUp/>}></Route>
        <Route exact path="/signup/student" element={<Signup/>}></Route>
        <Route exact path="/signup/guide" element={<GuideSignUp/>}></Route>
        <Route exact path="/mentorprofile" element={<GuideDashboard/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
