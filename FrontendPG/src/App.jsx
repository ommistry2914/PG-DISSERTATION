import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './App.css'
import Home from "./screens/home";
import Homepages from "./components/home/Homepages"
import SinglePage from "./components/singlePage/SinglePage"
import Culture from "./components/culture/Culture"
import GuideCard from "./CommonCard/GuideCard";
import StudentCard from "./CommonCard/StudentCard";
import Layout from "./routes/layout";
import StudentCardList from "./components/PastWork/PastWork";
function App() {

  return (
    <Router>
      <Layout/>
      <Routes>       
        <Route exact path='/' element={<Homepages/>} />
        <Route exact path='/student' element={<StudentCardList/>} />
          <Route path='/singlepage/:id' exact element={<SinglePage/>} />
          <Route exact path='/culture' element={<GuideCard/>} />
      </Routes>
    </Router>
  )
}

export default App
