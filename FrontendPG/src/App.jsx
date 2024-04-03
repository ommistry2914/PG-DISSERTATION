import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

const App = () => {
  const { authenticated, userRole } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
        {authenticated && userRole === 'guide' ? (
          <Route path="/mentorprofile" element={<GuideDashboard />} />
        ) : (
          <Route path="/mentorprofile" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
