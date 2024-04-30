// sidebardata.js
import * as FaIcons from 'react-icons/fa'
import { SiGoogleforms } from "react-icons/si";
import { FaLaptopFile } from "react-icons/fa6";

export const sidebardata = [
  { path: "", text: "Dashboard", icon: <FaIcons.FaFoursquare /> },
  { path: "submissions", text: "Submissions", icon: <FaIcons.FaBook /> },
  {
    path: '/chatroom', text: "Chat", icon: <FaIcons.FaUser />
  },
  { path: "progress", text: "Progress", icon: <FaIcons.FaChartBar /> },
  { path: "schedule", text: "Schedule", icon: <FaIcons.FaCalendar /> }
];


export const guidebardata = [
  { path: "/mentorprofile/", text: "Dashboard", icon: <FaIcons.FaFoursquare /> },
  // {
  //   text: "student list", icon: <FaIcons.FaChalkboardTeacher />, subMenu: [
  //     {
  //       text: 'student mentored',
  //       path: '/mentorprofile/pastStudents',
  //       icon: <FaIcons.FaUsers />,
  //     },
  //     {
  //       text: 'new request',
  //       path: '/mentorprofile/request',
  //       icon: <FaIcons.FaUser />,
  //     },
  //   ],
  // },
  { path: "/mentorprofile/pastStudents", text: "Student Mentored", icon: <FaIcons.FaUsers /> },
  { path: "/mentorprofile/request", text: "New Request", icon: <FaIcons.FaUser /> },
  { path: "/mentorprofile/ongoing", text: "Ongoing ", icon: <FaIcons.FaChartBar /> },
  { path: "/studentguide/edit", text: "edit", icon: <FaIcons.FaCalendar /> }

];

export const studentbardata = [
  // { path: "/requestguidepage", text: "Request Guides", icon: <FaIcons.FaChalkboardTeacher /> },
  // { path: "/requestform/:sid", text: "Request Dissertation Form", icon: <SiGoogleforms /> },
  // { path: "/mentorprofile/", text: "Dashboard", icon: <FaIcons.FaFoursquare /> },
  // {
  //   text: "student list", icon: <FaIcons.FaChalkboardTeacher />, subMenu: [
  //     {
  //       text: 'student mentored',
  //       path: '/mentorprofile/pastStudents',
  //       icon: <FaIcons.FaUsers />,
  //     },
  //     {
  //       text: 'new request',
  //       path: '/mentorprofile/request',
  //       icon: <FaIcons.FaUser />,
  //     },
  //   ],
  // },
  // { path: "/mentorprofile/ongoing", text: "Ongoing ", icon: <FaIcons.FaChartBar /> },
  // { path: "/studentguide/edit", text: "edit", icon: <FaIcons.FaCalendar /> },


  { path: "/requestguidepage", text: "Request Guides", icon: <FaIcons.FaChalkboardTeacher /> },
  { path: "/requestform/:sid", text: "Request Dissertation Form", icon: <SiGoogleforms /> },
  { path: "/editprofilepage", text: "Edit Student Profile", icon: <FaIcons.FaUserEdit /> },
  { path: "/:studentid/studentguide", text: "My Dissertation", icon: <FaLaptopFile /> }

];


