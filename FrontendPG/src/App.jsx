import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './App.css'
import Home from "./screens/home";
function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
