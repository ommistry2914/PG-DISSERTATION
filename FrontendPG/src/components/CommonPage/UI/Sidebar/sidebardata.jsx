// sidebardata.js
import * as FaIcons from 'react-icons/fa'

export const sidebardata = [
  { path: "/studentguide/", text: "Dashboard", icon: <FaIcons.FaFoursquare /> },
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
  { path: "/studentguide/progress", text: "Progress", icon: <FaIcons.FaChartBar /> },
  { path: "/studentguide/schedule", text: "Schedule", icon: <FaIcons.FaCalendar /> }
];

