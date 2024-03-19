import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './mentors.css'
import Photo1 from './photo1.png'
import { FaVideo, FaWhatsapp, FaPhone, FaPlane, FaTelegramPlane } from "react-icons/fa";

const members = [
    { profilePhoto: './photo1.png', name: 'XYZ', speciality: 'MSc in CS' },
    { profilePhoto: './photo2.png', name: 'Abc', speciality: 'Phd in Biology' },
    { profilePhoto: './photo1.png', name: 'XYZ', speciality: 'MSc in CS' },
    { profilePhoto: './photo2.png', name: 'Abc', speciality: 'Phd in Biology' },
    { profilePhoto: './photo1.png', name: 'XYZ', speciality: 'MSc in CS' },
    { profilePhoto: './photo2.png', name: 'Abc', speciality: 'Phd in Biology' },
    { profilePhoto: './photo1.png', name: 'XYZ', speciality: 'MSc in CS' },
    { profilePhoto: './photo2.png', name: 'Abc', speciality: 'Phd in Biology' },
]

const MentorsCard = () => {
    return (
        <div className="common-pg-contents">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Student</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Mentors</li>
                </ol>
            </nav>
            <div className="common-pg-mentors-cards container row">
                {members.map((member, index) => (
                    <div key={index} className="common-pg-card col-sm-6 col-lg-3 col-md-3">
                        <div className="common-pg-profile-pic-div"><img src={Photo1} alt={member.name} className="common-pg-profile-photo" /></div>
                        <div className="common-pg-mentor-detail"> 
                            <h5>{member.name}</h5>
                            <p>{member.speciality}</p>
                        </div>
                        <div className="common-pg-actions">
                            <button className="common-pg-action-btn chat-btn"><FaTelegramPlane className=" common-pg-mentor-chat"/></button>
                            <button className="common-pg-action-btn call-btn"><FaPhone className="common-pg-mentor-call" /></button>
                            <button className="common-pg-action-btn vdo-btn"><FaVideo className=" common-pg-mentor-video-call"/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MentorsCard