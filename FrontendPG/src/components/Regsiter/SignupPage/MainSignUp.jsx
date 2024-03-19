import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import HeadAnim from '../../../assests/HeadAnimation.json';

import './MainSignUp.css';

const { Title } = Typography;

const MainSignUp = () => {
  return (
    <>
  <div className="form-main">

    <div className="form-left">
      <div className="anim-div">
      <Lottie animationData={HeadAnim}/>
    </div>
  
  </div>

  <div className="form-right">
  <Title level={2}>Welcome to [Website Name]</Title>
       <Link to="/signup/student">
        <button className="signup-button">Sign Up as Student</button>
      </Link>
       <Link to="/signup/guide">
         <button className="signup-button">Sign Up as Guide</button>
       </Link>
  
  </div>
</div>
    
    </>
    
    // <div className="main-signup-container">
    //   <Title level={2}>Welcome to [Website Name]</Title>
    //   <Link to="/signup/student">
    //     <button className="signup-button">Sign Up as Student</button>
    //   </Link>
    //   <Link to="/signup/guide">
    //     <button className="signup-button">Sign Up as Guide</button>
    //   </Link>
    // </div>
  );
};

export default MainSignUp;
