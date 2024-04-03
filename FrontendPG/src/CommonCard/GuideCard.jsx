import React from 'react';
import './Guidecard.css';
import img1 from '../assets/home_banner.jpg';

const GuideCard = () => {
 
  return (
    <>
          <h1 className='heading-expert'>Our Top Experts</h1>
    <div className='guide-main'>
      <div className='guide-card'>
        <div className='guide-card-content'>
          <img src={img1} alt="name" className='guide-img'></img>
          <div className="content">
            <h4>MSU Teacher</h4>
            <br/>
            <div>
              <span className='spancss'>Assistant Professor</span>
            </div>
            <br/>
            <div className='pcss'>
            <p>Expertise in AI and ML with experience of 3+ years and also loves Web Development</p>
            </div>
            <div className="button-container">
              <button className='button'>Details</button>
              <button className='button'>Request</button>
            </div>
          </div>
        </div>
      </div>

      <div className='guide-card'>
        <div className='guide-card-content'>
          <img src={img1} alt="name" className='guide-img'></img>
          <div className="content">
            <h4>MSU Teacher</h4>
            <br/>
            <div>
              <span className='spancss'>Assistant Professor</span>
            </div>
            <br/>
            <div className='pcss'>
            <p>Expertise in AI and ML with experience of 3+ years and is also gold medalist</p>
            </div>
            <div className="button-container">
              <button className='button'>Details</button>
              <button className='button'>Request</button>
            </div>
          </div>
        </div>
      </div>

      <div className='guide-card'>
        <div className='guide-card-content'>
          <img src={img1} alt="name" className='guide-img'></img>
          <div className="content">
            <h4>MSU Teacher</h4>
            <br/>
            <div>
              <span className='spancss'>Assistant Professor</span>
            </div>
            <br/>
            <div className='pcss'>
            <p>Expertise in AI and ML with experience of 3+ years and loves to program in multiple languages</p>
            </div>
            <div className="button-container">
              <button className='button'>Details</button>
              <button className='button'>Request</button>
            </div>
          </div>
        </div>
      </div>

     
      
      
    </div>
    <div className='viewmore'>
      <button className='button-view'>View More</button>
    </div>
    </>
  );
}

export default GuideCard;

