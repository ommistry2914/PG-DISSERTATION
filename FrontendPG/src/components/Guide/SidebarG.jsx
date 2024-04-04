import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SidebarG = () => {
    const [gMenuVisible, setgMenuVisible] = useState(false);
    const togglegMenu = () => {
        setgMenuVisible(!gMenuVisible);
    }
  
  return (
    <div className='sidebar_guide'>
                <a onClick={togglegMenu}>&#9776;</a>
                    {gMenuVisible && <ul className="guide_nav">
                        <li><Link to='/mentorprofile'>  <svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" >
                            <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 10 21 L 10 14 L 14 14 L 14 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z" />
                        </svg> Dashboard</Link></li>
                        <li><Link to='pastStudents'>
                            <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/graduation-cap--v1.png" alt="graduation-cap--v1" />
                            Student Mentored</Link></li>
                        <li><Link to='request'>
                            <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/add-user-male.png" alt="add-user" />
                            New student request</Link></li>
                        <li><Link to='ongoing'>
                            <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/tasks.png" alt="tasks" />
                            Ongoing Dissertations</Link></li>
                        <li><Link to='edit' >
                            <img width="20" height="20" src="https://img.icons8.com/sf-black-filled/64/create-new.png" alt="create-new" />
                            Edit profile</Link></li>
                            </ul>}
                    {!gMenuVisible && <ul className='guide_nav'>
                                <li><Link to='/mentorprofile'>  <svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" >
                                    <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 10 21 L 10 14 L 14 14 L 14 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z" />
                                </svg> </Link></li>
                                <li><Link to='pastStudents'><img width="20" height="20" title='Student Mentored' src="https://img.icons8.com/ios-glyphs/30/graduation-cap--v1.png" alt="graduation-cap--v1" />
                                </Link></li>
                                <li><Link to='request'>
                                    <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/add-user-male.png" alt="add-user" title='New Request' />
                                </Link></li>
                                <li><Link to='ongoing'>
                                    <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/tasks.png" alt="tasks" title='Ongoing dissertation' />
                                </Link></li>
                                <li><Link to='edit' >
                                    <img width="20" height="20" src="https://img.icons8.com/sf-black-filled/64/create-new.png" alt="create-new" title='Edit' />
                                </Link></li>
                                </ul>}
                    </div>
  );
}

export default SidebarG;
