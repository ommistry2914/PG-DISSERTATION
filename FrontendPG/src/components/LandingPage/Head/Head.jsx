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
              <span>Weclome to PG World !!!</span>
            </span>
          </h2>
          <p className='desc-para1'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima doloremque officiis tenetur ad, et, expedita amet repudiandae ipsa cupiditate dolores in tempor
          </p>
          {/* <span className='read-link1'>
            read more
          </span> */}
        </div>
        <div className="desc-image1">
          {/* <img src={techo} alt="techo image" className='techo-img'/> */}
          <Lottie animationData={HeadAnim} />
        </div>
      </div>
    </div>
  )
}

export default Head;
