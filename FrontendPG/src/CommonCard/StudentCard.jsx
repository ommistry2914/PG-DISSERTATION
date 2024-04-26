import React from 'react'
import './studentcard.css'
import { Link } from 'react-router-dom'
const StudentCard = ({profile, name, desc, link1, link2, img}) => {
  return (
<div className='main_class'>
<main className="container_p">
    <div className="wrapper_p">
      <div className="card-img">
        <img src={profile} alt="NFT Equilibrium card image"/>
      </div>
      <div className="text-container">
        <h1><a href="#">{name}</a></h1>
        <p>{desc}</p>
        <div className="flex">
          <div className="eth">
            <Link to='/'>
            <button className='trview_more p_button'>Profile</button>
            </Link>
          </div>
          <div className="days">
          {/* <Link to='/'>
            <button>Open</button>
            </Link> */}
          </div>
        </div>
        
        <div className="creator">
          <img src={img} alt="Avatar of Jules Wyvern"/>
          <p>Creation of <a href="#">Jules Wyvern</a></p>
        </div>
      </div>
    </div>
  </main>
</div>
  )
}

export default StudentCard
