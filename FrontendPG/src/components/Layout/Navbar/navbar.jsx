import React, { useState } from 'react';
import './navbar.css'; 

const Navbar = () => {
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
                        <a href="/Profile/profile.html" id="navbar_account_dropdown_login" class="dropList">LOGIN-</a>
                        <a href="/Profile/profile.html" id="navbar_account_dropdown_login" class="dropList">SIGNUP</a>
                            <a href="/Profile/signup.html" class="dropList">Dashboard</a>
                            {/* <a href="#" class="dropList">Coupons</a> */}
                           
                        </div>
                    </div>
                </section>
            </nav>
        </header>
    );
};

export default Navbar;

