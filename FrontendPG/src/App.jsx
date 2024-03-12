import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './App.css'
import Home from "./screens/home";
import Login from "./components/Regsiter/LoginPage/Login"
import Signup from "./components/Regsiter/SignupPage/Signup"
import GuideSignUp from "./components/Regsiter/SignupPage/GuideSignUp";
import MainSignUp from "./components/Regsiter/SignupPage/MainSignUp";
function App() {

  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      {/* <Route exact path="/login" element={<Login/>}></Route> */}
      <Route exact path="/mainsign" element={<MainSignUp/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/signup/student" element={<Signup/>}></Route>
      <Route exact path="/signup/guide" element={<GuideSignUp/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
