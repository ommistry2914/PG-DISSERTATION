import React, { useState } from 'react';
import './navbar.css'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
const Navbar = () => {
    const { authenticated, userRole, login, logout } = useAuth();

    const [menuVisible, setMenuVisible] = useState(false);
    const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
    const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);

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
                    <a href="#" className="navbar_logo">
                        <span className="material-symbols-rounded"> eco </span> Earz
                    </a>
                </div>

                <div className={`navbar_menu ${menuVisible ? 'show-menu' : ''}`}>
                    <ul className="navbar_list">
                    <li class="dropdown__item">                      
                            <div class="nav__link dropdown__button">
                                Discover 
                            </div>

                       
                        </li>
                        <li class="dropdown__item">
                            <div class="nav__link dropdown__button">
                                Gaming 
                            </div>

                        </li>
                        <li class="dropdown__item">
                            <div class="nav__link dropdown__button">
                                Accessories 
                            </div>

                        </li>
                        <li class="dropdown__item">                        
                            <div class="nav__link dropdown__button">
                                Company <span class="material-symbols-rounded dropdown__arrow"> expand_more </span>
                            </div>

                            <div class="dropdown__container">
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
                            </div>
                        </li>
                    </ul>
                </div>

                <section id="navbar_profile">
                    <div id="navbar_profile_account" className="navbar_profile_child">
                        <div id="navbar_account_icon" className="navbar_profile_child_title" onClick={() => toggleDropdown(accountDropdownVisible, setAccountDropdownVisible)}>
                            <span className="material-symbols-rounded navbar_profile_icons"> person </span>
                            <span className="navbar_profile_name">Profile</span>
                        </div>
                        <div id="navbar_account_dropdown" className={`${accountDropdownVisible ? 'visible_dropdown' : 'hide_dropdown'}`}>
                        <Link to="/login" id="navbar_account_dropdown_login" class="dropList">LOGIN-</Link>
                        <Link to="/signup" id="navbar_account_dropdown_login" class="dropList">SIGNUP</Link>
                            <Link to="/mentorprofile" id="navbar_account_dropdown_login"  class="dropList">Dashboard</Link>
                            <span onClick={handleLogout} id="navbar_account_dropdown_login" class="dropList">Logout</span>
                        </div>
                    </div>
                </section>
            </nav>
        </header>
    );
};

export default Navbar;

