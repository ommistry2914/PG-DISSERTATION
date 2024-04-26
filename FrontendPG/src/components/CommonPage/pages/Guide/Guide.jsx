import React from 'react'
import './guide.css'
import { FaPhone, FaClipboardCheck, FaTelegramPlane } from 'react-icons/fa'
import Photo1 from '../../images/photo1.png'
import { Link, useParams } from 'react-router-dom';

const Guide = () => {
    const { studentid } = useParams();
    return (
        <div className="common-pg-contents">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={`/${studentid}/studentguide`}>Dissertation</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Guide</li>
                </ol>
            </nav>
            <div className="common-pg-guide-container row">
            <div className="common-pg-banner col-sm-12 col-md-6">
                    <h6>"Navigate your uncertainties with expert guidance, come clear your doubts with your guide!</h6>
                    <div className="common-pg-about-guide">
                    <div className="common-pg-guide-pic"><img src="https://msu-new-2023-ec2-ubuntu-unzip.s3.ap-south-1.amazonaws.com/asset/storage/staff_pic/701mcp.jpg" alt=""/></div>
                        <div className="common-page-guide-details">
                            <h4 className='g-name'>Dr. Mamta C. Padole</h4>
                            <h5 className='g-name'>Associate Professor</h5>
                        </div>
                    </div>

                </div>
                <div className="common-pg-guide-actions col-sm-12 col-md-6">
                    <div className='common-pg-guide-action row' id="common-pg-guide-chat">
                        <button className='common-pg-guide-btns col-sm-12 col-md-6 col-lg-6'><FaTelegramPlane id='common-pg-guide-chat'/></button>
                        <p className='col-sm-12 col-md-6 col-lg-6'>Connect instantly, chat with your guide, and get answers to your questions!</p>
                    </div>
                    
                </div>
               
            </div>
        </div>
    )
}

export default Guide;
