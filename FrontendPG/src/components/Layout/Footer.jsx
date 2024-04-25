import React, { useContext } from "react";
// import { Link } from 'react-router-dom';
// import Heading from "../Headings/Heading";

import "./footer.css";

function Footer() {
  return (
    <>
      <section className="container-fluid" id="footer">
        <footer className="row container-fluid Parent_Footer">
          {/* <!-- NewsLetter : column 1 --> */}
          
          <div className="footer_Item col-sm-6 col-lg-4" id="footer_div_image">
            <div className="footer_msu_logo">
              <a href="https://www.msubaroda.ac.in/" target="_blank">
                <img
                  id="img_msulogo"
                  src="https://res.cloudinary.com/dnsvjhy0a/image/upload/v1664035485/Sponsors%2722/ChangedNew/msu_logo_iimsu6.png"
                  alt="Faculty of Technology & Engineering"
                />
              </a>
            </div>

            <div className="footer_social_media">
              <ul className="media_icons">

                <li>
                  <a
                    href=""
                    target="_blank"
                  >
                    <i className="fa-brands fa-youtube social"></i>
                  </a>
                </li>

                <li>
                  <a
                    href=""
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin-in social"></i>
                  </a>
                </li>

                <li>
                  <a href="" target="_blank">
                    <i className="fa-brands fa-twitter social"></i>
                  </a>
                </li>
               
              </ul>
            </div>
          </div>
          {/* <!-- Msu Logo and Social Media Icon : column 2 --> */}
          <div
            className="footer_Item col-sm-12 col-lg-4"
            id="footer_div_contact">

            <header className="header_ft">
              <h2 className="footer_header" id="head_CI">
                USEFUL LINKS
              </h2>
            </header>                                       
            <div className="Parent_Footer_Col3">
              <div className="footer_InDetail location">
                <div>
                  <a
                    className="footer_P_hover"
                    target="_blank"
                    id="address"
                    href="/experts">
                      Experts
                  </a>
                </div>
              </div>

              <div className="footer_InDetail email">
                <div>
                    <a
                      id="mail-link-1"
                      className="footer_P_hover"
                      href="/trending"
                    >
                      Trending Topic
                    </a>
                </div>
              </div>

              <div className="footer_InDetail Phone_div phoneno">
                <div>
                    <a className="footer_P_hover" href="">
                      Top Students
                    </a>
                </div>
              </div>

              <div className="footer_InDetail">
                <div>
                    <a className="footer_P_hover" href="/templates">
                      Templates
                    </a>
                </div>
              </div>
              <div className="footer_InDetail">
                <div>
                    <a className="footer_P_hover" href="">
                      Templates
                    </a>
                </div>
              </div>
              


            </div>
          </div>
				
          {/* <!-- Contact , WebTeam : column 3 --> */}

         	
         
          <div
            className="footer_Item col-sm-6 col-lg-4"
            id="footer_div_newsLetter">
            <header className="header_ft">
              <h2 className="footer_header" id="head_NL">
                NEWS LETTER
              </h2>
            </header>
            <div className="Parent_Footer">
              <p id="newsletter_info">
                By subscribing to our mailing list you will always be updated
                with the latest news from us.
              </p>
            </div>

            <div>
              <div id="footer_form" className="Parent_Footer">
                <div id="div_mail">
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    name="email"
                    id="email-textbox"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    id="send"
                    className="footer_btn"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div id="div_teambtn" className="webteam_btn">
                <a href="/webteam" target="_blank">
                  <button className="footer_btn" id="webTeamBtn">
                    WebTeam
                  </button>
                </a>
          </div>
          </div>


						
        </footer>
        <div className="copy-right">
          <h6>
          @2024 Website name. All rights reserved.  
          </h6>
          
        </div>
      </section>
    </>
  );
}

export default Footer;
