import React, { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './calender.css'
import Calender from './Calender';
import TaskCards from './TaskCards';
import { FaPlus } from 'react-icons/fa';

export default function Schedule() {

  return (
    <div className='common-pg-contents'>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Student</a></li>
          <li className="breadcrumb-item active" aria-current="page">Schedule</li>
        </ol>
      </nav>
      <div className="container common-pg-calender-container row">
        <Calender />
        <div className="col-sm-6 col-md-6 col-lg-6">
          <div className='common-pg-day-selection'> <button>Today</button>
            <button>Weekly</button>
            <button>Monthly</button>
          </div>
          <TaskCards />

        </div>
      </div>
      <button className='common-pg-add-note'><FaPlus /> &nbsp; Add Note</button>
    </div>
  );
};
