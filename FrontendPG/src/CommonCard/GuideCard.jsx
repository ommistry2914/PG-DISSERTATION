import React from 'react';
import './Guidecard.css';
import img1 from '../assests/techo-home.png'

const GuideCard = () => {
  return (
    <div className='main-bobwork'>
      <h2>Our Top Experts</h2>
      <div className='guide-main'>
        <div className='guide-card-container'>
          {/* Render 4 cards */}
          {[...Array(4)].map((_, index) => (
            <div className='guide-card' key={index}>
              <div className='guide-card-content'>
                <img src={img1} alt="name" className='guide-img'></img>
                <div className="content">
                  <h4>MSU Teacher</h4>
                  
                  <div className='pcss'>
                    <p>Expertise in AI and ML </p>
                    <p>with experience of 3+ years</p>
                  </div>
                  <div className="button-container">
                    <button className='button'>Details</button>
                    <button className='button'>Request</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='viewmore'>
        <button className='button-view'>View More</button>
      </div>
    </div>
  );
}

export default GuideCard;
