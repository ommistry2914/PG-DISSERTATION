// sidebardata.js
import * as FaIcons from 'react-icons/fa'

export const sidebardata = [
  { path: "", text: "Dashboard", icon: <FaIcons.FaFoursquare /> },
  { path: "submissions", text: "Submissions", icon: <FaIcons.FaBook /> },
  {
     text: "Advisors", icon: <FaIcons.FaChalkboardTeacher />, subMenu: [
      {
        text: 'mentors',
        path: 'mentors',
        icon: <FaIcons.FaUsers />,
      },
      {
        text: 'guide',
        path: 'guide',
        icon: <FaIcons.FaUser />,
      },
    ],
  },
  { path: "progress", text: "Progress", icon: <FaIcons.FaChartBar /> },
  { path: "schedule", text: "Schedule", icon: <FaIcons.FaCalendar /> }
];


export const guidebardata = [
  { path: "/mentorprofile/", text: "Dashboard", icon: <FaIcons.FaFoursquare /> },
  {
     text: "student list", icon: <FaIcons.FaChalkboardTeacher />, subMenu: [
      {
        text: 'student mentored',
        path: '/mentorprofile/pastStudents',
        icon: <FaIcons.FaUsers />,
      },
      {
        text: 'new request',
        path: '/mentorprofile/request',
        icon: <FaIcons.FaUser />,
      },
    ],
  },
  { path: "/mentorprofile/ongoing", text: "Ongoing ", icon: <FaIcons.FaChartBar /> },
  { path: "/studentguide/edit", text: "edit", icon: <FaIcons.FaCalendar /> }

];

export const studentbardata = [
  { path: "/mentorprofile/", text: "Dashboard", icon: <FaIcons.FaFoursquare /> },
  {
     text: "student list", icon: <FaIcons.FaChalkboardTeacher />, subMenu: [
      {
        text: 'student mentored',
        path: '/mentorprofile/pastStudents',
        icon: <FaIcons.FaUsers />,
      },
      {
        text: 'new request',
        path: '/mentorprofile/request',
        icon: <FaIcons.FaUser />,
      },
    ],
  },
  { path: "/mentorprofile/ongoing", text: "Ongoing ", icon: <FaIcons.FaChartBar /> },
  { path: "/studentguide/edit", text: "edit", icon: <FaIcons.FaCalendar /> }

];


