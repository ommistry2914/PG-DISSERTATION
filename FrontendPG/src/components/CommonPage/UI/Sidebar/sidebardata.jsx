// sidebardata.js
import * as FaIcons from 'react-icons/fa'

export const sidebardata = [
  { path: "/", text: "Dashboard", icon: <FaIcons.FaFoursquare /> },
  {
     text: "Advisors", icon: <FaIcons.FaChalkboardTeacher />, subMenu: [
      {
        text: 'mentors',
        path: '/mentors',
        icon: <FaIcons.FaUsers />,
      },
      {
        text: 'guide',
        path: '/guide',
        icon: <FaIcons.FaUser />,
      },
    ],
  },
  { path: "/progress", text: "Progress", icon: <FaIcons.FaChartBar /> },
  { path: "/schedule", text: "Schedule", icon: <FaIcons.FaCalendar /> }
];

