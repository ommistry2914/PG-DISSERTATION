import { useState } from 'react'
import React from 'react'
import './GuideDashboard.css'
import NewGuideRequest from '../NewGuideRequest/NewGuideRequest'
import OngoingGuideDissertation from '../OngoingGuideDissertation/OngoingGuideDissertation'
import StudentMentored from '../StudentMentored/StudentMentored'

const GuideDashboard = () => {
    const [gDashboardVisible, setgDashboardVisible] = useState(true);
    const [gRequestVisible, setgRequestVisible] = useState(false);
    const [gOngoingVisible, setgOngoingVisible] = useState(false);
    const [gMentoredVisible, setgMentoredVisible] = useState(false);
    const [gEdit, setgEdit] = useState(false);
    const [gMenuVisible, setgMenuVisible] = useState(false);

    const togglegMenu = () => {
        setgMenuVisible(!gMenuVisible);
    }
    const togglegDashboardVisibility = () => {
        setgDashboardVisible(true);
        setgOngoingVisible(false);
        setgRequestVisible(false);
        setgMentoredVisible(false);
        setgEdit(false);
    };
    const togglegMentoredVisibility = () => {
        setgMentoredVisible(true);
        setgDashboardVisible(false);
        setgOngoingVisible(false);
        setgRequestVisible(false);
        setgEdit(false);
    };
    const togglegRequestVisibility = () => {
        setgRequestVisible(true);
        setgDashboardVisible(false);
        setgOngoingVisible(false);
        setgMentoredVisible(false);
        setgEdit(false);
    };
    const togglegOngoingVisibility = () => {
        setgOngoingVisible(true);
        setgDashboardVisible(false);
        setgRequestVisible(false);
        setgMentoredVisible(false);
        setgEdit(false);
    };
    const fgEdit = () => {
        setgEdit(true);
        setgDashboardVisible(true);
        setgMentoredVisible(false);
        setgOngoingVisible(false);
        setgRequestVisible(false);
    }
    return (
        <>
            <div className='guide_dashboard'>
                <div className='sidebar_guide'>
                <a onClick={togglegMenu}>&#9776;</a>
                    {gMenuVisible && <ul className="guide_nav">
                        <li><a onClick={togglegDashboardVisibility}>  <svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" >
                            <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 10 21 L 10 14 L 14 14 L 14 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z" />
                        </svg> Dashboard</a></li>
                        <li><a onClick={togglegMentoredVisibility}><img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/graduation-cap--v1.png" alt="graduation-cap--v1" />
                            Student Mentored</a></li>
                        <li><a onClick={togglegRequestVisibility}>
                            <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/add-user-male.png" alt="add-user" />
                            New student request</a></li>
                        <li><a onClick={togglegOngoingVisibility}>
                            <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/tasks.png" alt="tasks" />
                            Ongoing Dissertations</a></li>
                        <li><a onClick={fgEdit}>
                            <img width="20" height="20" src="https://img.icons8.com/sf-black-filled/64/create-new.png" alt="create-new" />
                            Edit profile</a></li>
                            </ul>}
                    {!gMenuVisible && <ul className='guide_nav'>
                                <li><a onClick={togglegDashboardVisibility}>  <svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" >
                                    <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 10 21 L 10 14 L 14 14 L 14 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z" />
                                </svg> </a></li>
                                <li><a onClick={togglegMentoredVisibility}><img width="20" height="20" title='Student Mentored' src="https://img.icons8.com/ios-glyphs/30/graduation-cap--v1.png" alt="graduation-cap--v1" />
                                </a></li>
                                <li><a onClick={togglegRequestVisibility}>
                                    <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/add-user-male.png" alt="add-user" title='New Request' />
                                </a></li>
                                <li><a onClick={togglegOngoingVisibility}>
                                    <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/tasks.png" alt="tasks" title='Ongoing dissertation' />
                                </a></li>
                                <li><a onClick={fgEdit}>
                                    <img width="20" height="20" src="https://img.icons8.com/sf-black-filled/64/create-new.png" alt="create-new" title='Edit' />
                                </a></li>
                                </ul>}
                    </div>
                <div className='guide_main'>
                    <div className='guide_head'>
                    </div>
                    {gDashboardVisible && (<div className='guide_content'>
                        <div className="guide_profile">
                            <div className="guide_img">
                                <img src="https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=105&w=145&h=97" alt="" />
                            </div>
                            <div className="ghead">
                                <h2>Abc Xyz</h2>
                                <p>Phd in Phycology </p>
                            </div>
                            <div className="guide_contact">
                                <p>Guide Id: <input type="text" name="" id="" value={'GI001'} /></p>
                                <p>Email: <input type="text" name="" id="" value={'abc@gmail.com'} /></p>
                                <p>Phone: <input type="text" name="" id="" value={1213213213} /></p>
                                <p>Availability: <input type="text" name="" id="" value={'Between 10am to 5pm '} /></p>
                            </div>
                            {gEdit && <button>Edit</button>}
                        </div>

                        <div className="guide_details">
                            <div id="gdashboard">
                                <h3>About</h3>
                                <div className="guide_about">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio maxime inventore soluta, maiores totam tempore! Veniam voluptatem quae possimus suscipit neque! Quibusdam dolorem iusto, dignissimos repudiandae ut ullam voluptates molestiae.</p>
                                </div>
                                <h3>Details</h3>
                                <p>Academic Qualifications: <input type="text" name="" id="" value={'Ph.D. in Psychology'} readOnly /></p>
                                <p>Years of Experience: <input type="text" name="" id="" value={'5 years'} readOnly /></p>
                                <p>Area of Specialization: <input type="text" name="" id="" value={'Health Psychology'} readOnly /></p>
                                <p>Publications: <input type="text" name="" id="" value={'Impact of Climate Change on Human health'} readOnly /></p>
                                <p>Students Mentored: <input type="text" name="" id="" value={'Around 70'} readOnly /></p>
                            </div>

                        </div>
                    </div>)}
                    {gMentoredVisible && <StudentMentored />}
                    {gRequestVisible && <NewGuideRequest />}
                    {gOngoingVisible && <OngoingGuideDissertation />}
                </div>
            </div>
        </>
    )
}

export default GuideDashboard
