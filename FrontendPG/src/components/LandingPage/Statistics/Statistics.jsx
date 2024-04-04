import React, { useState } from 'react';
import './Statistics.css';
import CountUp from 'react-countup';
import Confetti from 'react-confetti';

const Statistics = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleAnimationEnd = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setResetKey(prevKey => prevKey + 1); 
    }, 4000);
  };

  return (
    <>
      <h1 className='heading-expert'>Our Statistics</h1>

      <div className='stat-bg'>
      {showConfetti && <Confetti />} 

        <div className='stat-card'>
          <CountUp
            key={resetKey + 'reset-1'}
            className='statfont'
            start={0}
            end={400}
            duration={1}
            onEnd={handleAnimationEnd}
          />
          <span className='statfont'>+</span>
          <p>Disserations Approved</p>
        </div>

        <div className='stat-card'>
          <CountUp
            key={resetKey + 'reset-2'}
            className='statfont'
            start={0}
            end={40}
            duration={1}
            onEnd={handleAnimationEnd}
          />
          <span className='statfont'>+</span>
          <p>Experts and Mentors</p>
        </div>

        <div className='stat-card'>
          <CountUp
            key={resetKey + 'reset-3'}
            className='statfont'
            start={0}
            end={800}
            duration={1}
            onEnd={handleAnimationEnd}
          />
          <span className='statfont'>+</span>
          <p>Students</p>
        </div>
      </div>
    </>
  );
};

export default Statistics;
