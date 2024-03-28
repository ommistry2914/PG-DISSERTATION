import React from 'react'
import './guide.css'
import { FaPhone, FaClipboardCheck, FaTelegramPlane } from 'react-icons/fa'
import Photo1 from '../../images/photo1.png'

const Guide = () => {
    return (
        <div className="common-pg-contents">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Student</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Guide</li>
                </ol>
            </nav>
            <div className="common-pg-guide-container row">
            <div className="common-pg-banner col-sm-12 col-md-6">
                    <h6>"Navigate your uncertainties with expert guidance, come clear your doubts with your guide!</h6>
                    <div className="common-pg-about-guide">
                    <div className="common-pg-guide-pic"><img src={Photo1} alt=""/></div>
                        <div className="common-page-guide-details">
                            <h4>Name</h4>
                            <p>Skill</p>
                            <p>Profession</p>
                        </div>
                    </div>

                </div>
                <div className="common-pg-guide-actions col-sm-12 col-md-6">
                    <div className='common-pg-guide-action row' id="common-pg-guide-chat">
                        <button className='common-pg-guide-btns col-sm-12 col-md-6 col-lg-6'><FaTelegramPlane id='common-pg-guide-chat'/></button>
                        <p className='col-sm-12 col-md-6 col-lg-6'>Connect instantly, chat with your guide, and get answers to your questions!</p>
                    </div>
                    <div className='common-pg-guide-action row' id="common-pg-guide-call">
                        <button className='common-pg-guide-btns col-sm-12 col-md-6 col-lg-6'><FaPhone id='common-pg-guide-call'/></button>
                        <p className='col-sm-12 col-md-6 col-lg-6'>Schedule a call with your guide, clear your doubts, and move forward confidently!</p>
                    </div>
                    <div className='common-pg-guide-action row' id="common-pg-guide-view-feedback">
                        <button className='common-pg-guide-btns col-sm-12 col-md-6 col-lg-6'><FaClipboardCheck id='common-pg-guide-feedback'/></button>
                        <p className='col-sm-12 col-md-6 col-lg-6'>Gain valuable insights, view feedback from your guide, and elevate your progress!</p>
                    </div>
                </div>
               
            </div>
        </div>
    )
}

export default Guide;
