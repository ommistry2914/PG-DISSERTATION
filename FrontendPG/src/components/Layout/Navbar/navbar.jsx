import React, { useState, useEffect } from 'react';
import './navbar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';

const Navbar = () => {
    const { authenticated, userRole, login, logout,useremail,token } = useAuth();

    const [menuVisible, setMenuVisible] = useState(false);
    const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
    const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notification, setNotification] = useState(null);
    const [read, setRead] = useState();


    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/auth/notification/receiverId/${useremail}`);
            console.log(response)
            setNotification(response.data);
            console.log(useremail + notification);
            const unreadNotifications = response.data.filter(notification => !notification.read);
            setUnreadCount(unreadNotifications.length);

        }
        catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };
    useEffect(() => {
        if(useremail && !notification){
        fetchNotifications();
    }; 
    const intervalId = setInterval(() => {
        fetchNotifications();
        console.log('refresh');
      }, 2 * 60 * 1000); // Refresh every 2 minutes
  
      // Clean up interval when component unmounts
      return () => clearInterval(intervalId);
    }, [useremail, notification]);
    const markAsRead =async (id,notification) => {
        // Update the notifications array to mark the notification as read
        await axios.put(`http://localhost:8080/api/auth/notification/${id}`, notification)

            .then(response => {
                // Handle successful update
                console.log('Notification marked as read:', response.data);
                // You may update the UI or perform other actions as needed
            })
            .catch(error => {
                // Handle error
                console.error('Error marking notification as read:', error);
            });

    };
    const toggleMenu = () => {
        setSearchDropdownVisible(false);
        setAccountDropdownVisible(false);
        setMenuVisible(!menuVisible);
    };

    const toggleDropdown = (dropdown, setDropdown) => {
        setMenuVisible(false);
        setSearchDropdownVisible(false);
        setAccountDropdownVisible(false);
        setDropdown(!dropdown);
    };

    const handleProfileHover = () => {
        setAccountDropdownVisible(true);
    };

    const handleProfileMouseLeave = () => {
        // Adding a brief delay before hiding the dropdown
        setTimeout(() => {
            setAccountDropdownVisible(false);
        }, 1000); // Adjust the delay time as needed
    };




    const handleLogout = async () => {
        try {
            // Call logout API here using Axios
            const response = await axios.post(
                'http://localhost:8080/api/auth/logout',

            );

            if (response.status === 200) {
                // Log()out successful
                logout();
            } else {
                // Handle logout error
                console.error('Logout failed:', response.statusText);
                // Optionally, you can display an error message to the user
            }
        } catch (error) {
            console.error('Logout failed:', error.message);
            // Optionally, you can display an error message to the user
        }
    };

    return (
        <header className="header_main">
            <nav className="navbar_main">
                <div className="navbar_data">
                    <div id="navbar_toggle" onClick={toggleMenu}>
                        <span className="material-symbols-rounded navbar_toggle_menu"> menu </span>
                        <i className="material-symbols-rounded navbar_toggle_close"> close </i>
                    </div>
                    <a href="/" className="navbar_logo">
                        <span className="material-symbols-rounded"> eco </span> PGWORLD
                    </a>
                </div>

                <div className={`navbar_menu ${menuVisible ? 'show-menu' : ''}`}>
                    <ul className="navbar_list">
                        <li class="dropdown__item">
                        <Link 
                                to="/trending"> <span class="nav__link dropdown__button">
                              Trending Topic 
                            </span></Link>


                        </li>
                        <li class="dropdown__item">
                        <Link to="/pastpage">  <span class="nav__link dropdown__button">
                                Pastwork 

                            </span></Link>

                        </li>
                        <li class="dropdown__item">
                        <Link to="/">   <span class="nav__link dropdown__button">
                                View Expert 
                            </span></Link>

                        </li>
                        <li class="dropdown__item">
                        <Link to="/templates">    <span class="nav__link dropdown__button">
                               Templates 
                                {/* <span class="material-symbols-rounded dropdown__arrow"> expand_more </span> */}
                            </span> </Link>

                            {/* <div class="dropdown__container">
                                <div class="dropdown__content">
                                    <div class="dropdown__group">
                                        <span class="dropdown__title">About us</span>
    
                                        <ul class="dropdown__list">
                                            <li>
                                                <a href="#" class="dropdown__link">About us</a>
                                            </li>
                                            <li>
                                                <a href="#" class="dropdown__link">Support</a>
                                            </li>
                                            <li>
                                                <a href="#" class="dropdown__link">Contact us</a>
                                            </li>
                                        </ul>
                                    </div>
    
                                    <div class="dropdown__group">
                                        <span class="dropdown__title">Safety and quality</span>
    
                                        <ul class="dropdown__list">
                                            <li>
                                                <a href="#" class="dropdown__link">Cookie settings</a>
                                            </li>
                                            <li>
                                                <a href="#" class="dropdown__link">Privacy Policy</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                        </li>
                    </ul>
                </div>

                <section id="navbar_profile">
                    {useremail && notification && <div id='navbar_notification' >
                        <div id='navbar_notification_icon' className='navbar_profile_child_title' onClick={() => toggleDropdown(notificationDropdown, setNotificationDropdown)}>
                            <span className='fas fa-bell fa-xl'></span>
                            <span class="badge rounded-pill badge-notification bg-danger">{unreadCount}</span>
                        </div>
                        <div id='navbar_notification_dropdown' className={`${notificationDropdown ? 'visible_dropdown' : 'hide_dropdown'}`}>
                            {notification.map(notification => (
                                <> {!(notification.read) && <Link to={`${notification.link}`} id="navbar_account_dropdown_login" class="dropList"><div>
                                    <p>From: {notification.senderId}</p>
                                    <p>Type: {notification.type}</p>
                                    <button onClick={() => markAsRead(notification.id, notification)}>Mark Read</button>
                                </div></Link>}</>

                            ))}


                        </div>
                    </div>}
                    <div id="navbar_profile_account" className="navbar_profile_child">
                        <div id="navbar_account_icon" className="navbar_profile_child_title"  onMouseEnter={handleProfileHover} onMouseLeave={handleProfileMouseLeave} >
                            <span className="material-symbols-rounded navbar_profile_icons"> person </span>
                            <span className="navbar_profile_name">Profile</span>
                        </div>
                        <div id="navbar_account_dropdown" className={`${accountDropdownVisible ? 'visible_dropdown' : 'hide_dropdown'}`}>
                            <Link to="/login" id="navbar_account_dropdown_login" class="dropList">LOGIN-</Link>
                            <Link to="/signup" id="navbar_account_dropdown_login" class="dropList">SIGNUP</Link>
                            <Link to="/mentorprofile" id="navbar_account_dropdown_login" class="dropList">Dashboard</Link>
                            <span onClick={handleLogout} id="navbar_account_dropdown_login" class="dropList">Logout</span>
                        </div>
                    </div>
                </section>
            </nav>
        </header>
    );
};

export default Navbar;

