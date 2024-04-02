import React from 'react'
import MSUDescription from '../components/LandingPage/MSUdescription/MSUDescription'
import Head from '../components/LandingPage/Head/Head'
import Footer from '../components/Layout/Footer'
import Faqs from '../components/LandingPage/FAQS/Faqs'
import TopResearcher from '../components/LandingPage/TopResearches/TopResearcher'
import StudentCardList from '../components/PastWork/PastWork'
import FaqsMain from '../components/LandingPage/FAQS/FaqsMain'
import GuideCard from '../CommonCard/GuideCard'
const Home = () => {
  return (
    <div>


      <Head/>
      <MSUDescription/>
      <TopResearcher/>
      <StudentCardList/>
      <FaqsMain/>
      <Footer/>


    </div>
  )
}

export default Home;
