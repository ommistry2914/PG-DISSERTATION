import React from 'react'
import techo from '../../../assests/techo-home.png';
import './head.css';

const Head = () => {
  return (
    <div className='container-head1'>
      <div className="container-head">
        <div className="head-image">
          <img src={techo} alt="techo image" className='techo-img' />
        </div>
        <div className="head-data">
          <h2 className='Head-head'>THE MAHARAJA SAYAJIRAO UNIVERSITY OF BARODA</h2>
          <p className='head-para'>
            The Faculty of Technology and Engineering as its stands today was formed along with the establishment of The Maharaja Sayajirao University in 1949. It  is an outgrowth of what was popularly known as the Kala Bhavan Technical Institute (KBTI) established in June 1890 by late His Highness The Maharaja Sayajirao Gaekwad III of Baroda State. Initially the idea was to teach drawing, bleaching, dyeing, calico printing and carpentry, thus starting the School of Weaving in the year 1897 which subsequently expanded to  a course on dyeing. Prof. T. K. Gajjar was the first Principle of KBTI who built it with passion.
          </p>
          <span className='read-link'>
            read more
          </span>
        </div>
      </div>
    </div>
  )
}

export default Head;
