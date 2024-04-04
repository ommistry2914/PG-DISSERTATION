// WebTeamMain.jsx
import React from 'react';
import "./Webteam.css";
import img1 from "../../assests/techo-home.png";
import { FaLinkedin } from "react-icons/fa";

const WebTeamMain = () => {
    const members = [
        {
          name: "Sakshi Jethwa",
          image: "",
          profile: "",
          sname:"Sakshi",
        },
        {
          name: "Om Mistry",
          image: "",
          profile: "",
          sname:"Om",
        },
        {
          name: "Shruti Patel",
          image: "",
          profile: "",
          sname:"Shruti",
        },
        {
          name: "Bobby Upreti",
          image: "",
          profile: "",
          sname:"Bobby",
        },
        {
          name: "Vidhi Patel",
          image: "",
          profile: "",
          sname:"Vidhi",
        },
      ];
  return (
    <div className='web-main-bg'>
        {members.map((person, index) => (
          <div className="card" key={index}>
            <img src={img1} alt={person.name} />
            <div className="content">
              <p className="title">{person.name}<br /></p>
              <hr></hr>
              <ul className="sci">
                <li>
                  <a href="www.linkedin.com/sakshijethwa/">
                  <FaLinkedin />&nbsp;Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WebTeamMain;
