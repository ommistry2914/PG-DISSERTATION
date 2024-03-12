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
        <h2 className='desc-head1'>THE MAHARAJA SAYAJIRAO UNIVERSITY OF BARODA</h2>
        <p className='desc-para1'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima doloremque officiis tenetur ad, et, expedita amet repudiandae ipsa cupiditate dolores in temporibus necessitatibus aspernatur esse laborum est aliquam odit voluptatibus placeat consectetur veritatis illo. Magni cum saepe, explicabo quos repudiandae voluptatem officiis voluptatibus reiciendis nesciunt vero accusamus voluptate assumenda accusantium eos veritatis laudantium maxime optio incidunt minima dolor. Perferendis voluptas quos maxime eum expedita. Aliquid ipsam nisi, quis officiis ducimus harum officia totam consequuntur. Sapiente, qui incidunt. Molestiae accusamus ad at sint, aperiam sunt debitis ut nostrum veniam eos necessitatibus voluptatibus incidunt! Ipsa veniam et voluptatum iusto error a porro.
          </p>
          <span className='read-link1'>
              read more
          </span>
      </div>
      <div className="desc-image1">
        {/* <img src={techo} alt="techo image" className='techo-img'/> */}
        <Lottie animationData={HeadAnim}/>
      </div>
    </div>
    </div>
  )
}

export default Head;
