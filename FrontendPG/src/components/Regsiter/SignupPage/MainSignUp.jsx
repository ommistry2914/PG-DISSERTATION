import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import './MainSignUp.css'; // Import CSS file

const { Title } = Typography;

const MainSignUp = () => {
  return (
    <div className="main-signup-container">
      <Title level={2}>Welcome to [Website Name]</Title>
      <Link to="/signup/student">
        <button className="signup-button">Sign Up as Student</button>
      </Link>
      <Link to="/signup/guide">
        <button className="signup-button">Sign Up as Guide</button>
      </Link>
    </div>
  );
};

export default MainSignUp;
