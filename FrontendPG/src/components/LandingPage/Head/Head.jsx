import React from 'react'
import Lottie from 'lottie-react';

import techo from '../../../assests/techo-home.png';
import HeadAnim from '../../../assests/HeadAnimation.json';

import './head.css';

const Head = () => {
  return (
    <div className='container-desc'>
      <div className="container-om1 grid grid-two-column">
        <div className="desc-data1">
          <h2 className='desc-head1'>
            <span class="type">
              <span>Welcome to PG World !!!</span>
            </span>
          </h2>
          <p className='desc-para1'>
            Simplify your postgraduate dissertation journey with our user-friendly management system. From proposal to completion, track progress, exchange feedback, and stay organized effortlessly.

          </p>
          {/* <span className='read-link1'>
            read more
          </span> */}
          <button className='head_moreee'>
            <a href="https://msubaroda.ac.in/academics/FTE" target='_blank'>Read More</a>
          </button>
        </div>
        <div className="desc-image1">
          {/* <img src={techo} alt="techo image" className='techo-img'/> */}
          <Lottie animationData={HeadAnim} />
        </div>
      </div>
      {/* <div className="boder-div">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" ><path fill="#d1aef9" fill-opacity="1" d="M0,320L60,298.7C120,277,240,235,360,197.3C480,160,600,128,720,122.7C840,117,960,139,1080,144C1200,149,1320,139,1380,133.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
      </div> */}
      <div class="custom-shape-divider-bottom-1714009675">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
        </svg>
      </div>
    </div>
  )
}

export default Head;
