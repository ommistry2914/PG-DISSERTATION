// sidebardata.js
import * as FaIcons from 'react-icons/fa'

export const sidebardata = [
  { path: "/studentguide/", text: "Dashboard", icon: <FaIcons.FaFoursquare /> },
  { path: "submissions", text: "Submissions", icon: <FaIcons.FaBook /> },
  {
     text: "Advisors", icon: <FaIcons.FaChalkboardTeacher />, subMenu: [
      {
        text: 'mentors',
        path: '/studentguide/mentors',
        icon: <FaIcons.FaUsers />,
      },
      {
        text: 'guide',
        path: '/studentguide/guide',
        icon: <FaIcons.FaUser />,
      },
    ],
  },
  { path: "progress", text: "Progress", icon: <FaIcons.FaChartBar /> },
  { path: "schedule", text: "Schedule", icon: <FaIcons.FaCalendar /> }
];

