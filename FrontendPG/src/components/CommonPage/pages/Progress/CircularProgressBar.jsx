import React from 'react';
import './progress.css';

const CircularProgressBar = ({ percentage }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="common-pg-circular-progress-bar">
      <svg viewBox="0 0 100 100" className='common-pg-svg-progress'>
        <circle cx="50" cy="50" r={radius} />
        <circle
          className="common-pg-progress"
          cx="50"
          cy="50"
          r={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset
          }}
        />
      </svg>
      <div className="common-pg-percentage">{percentage}%</div>
    </div>
  );
};

export default CircularProgressBar;
