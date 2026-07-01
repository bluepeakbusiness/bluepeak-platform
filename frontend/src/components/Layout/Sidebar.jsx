import {
  FiLayout,
  FiBriefcase,
  FiDollarSign,
  FiUsers,
  FiRadio,
  FiShield,
  FiFileText,
  FiBarChart2,
  FiHome,
  FiTarget,
} from 'react-icons/fi';

import { NavLink } from 'react-router-dom';

const menu = [
  {
    icon: FiLayout,
    title: "Dashboard",
    path: "/",
  },
  {
    icon: FiBriefcase,
    title: "AI CEO",
    path: "/ceo",
  },
  {
    icon: FiDollarSign,
    title: "AI CFO",
    path: "/cfo",
  },
  {
    icon: FiUsers,
    title: "HR",
    path: "/hr",
  },
  {
    icon: FiTarget,
    title: "Marketing",
    path: "/marketing",
  },
  {
    icon: FiHome,
    title: "CRM",
    path: "/crm",
  },
  {
    icon: FiFileText,
    title: "Reports",
    path: "/reports",
  },
  {
    icon: FiBarChart2,
    title: "Finance",
    path: "/finance",
  },
  {
    icon: FiShield,
    title: "Settings",
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="logo">🚀 BLUEPEAK AI</h1>

      <nav>
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-active" : "sidebar-link"
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}