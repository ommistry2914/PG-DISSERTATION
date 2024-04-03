import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

const SidebarOm = ({ sidebarData }) => {
  const location = useLocation();

  const isActive = (currentPath, pagePath) => {
    if (currentPath === pagePath) return styles.active;
    else return "";
  };

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [subMenuTitle, setSubMenuTitle] = useState("");

  const handleSubMenuOpen = (title) => {
    setIsSubMenuOpen(true);
    setSubMenuTitle(title);
  };

  const handleSubMenuClose = () => {
    setIsSubMenuOpen(false);
    setSubMenuTitle("");
  };

  return (
    <div className={styles.sidebarParent}>
      <div className={styles.sidebar}>
        <nav className={styles.sidebarNav}>
          {sidebarData.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`${styles.sidebarNavItem} ${isActive(
                location.pathname,
                item.path
              )}`}
              onClick={() => handleSubMenuOpen(item.text)}
              onMouseEnter={() => handleSubMenuOpen(item.text)}
            >
              <div className={styles.sidebarMenuDiv}>
                {item.subMenu ? (
                  <>
                    <div className={styles.sidebarSvgIcon}>{item.icon}</div>
                    <div className={styles.sidebarMenuText}>{item.text}</div>
                    {isSubMenuOpen && subMenuTitle === item.text && (
                      <div className={styles.sidebarSubmenu}>
                        {item.subMenu &&
                          item.subMenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              className={`${styles.sidebarSubmenuNavItem} ${isActive(
                                location.pathname,
                                subItem.path
                              )}`}
                            >
                              <div className={styles.sidebarMenuDiv}>
                                <div className={styles.sidebarSubmenuIcon}>{subItem.icon}</div>
                                <div className={styles.sidebarSubmenuText}>{subItem.text}</div>
                              </div>
                            </Link>
                          ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className={styles.sidebarSvgIcon}>{item.icon}</div>
                    <div className={styles.sidebarMenuText}>{item.text}</div>
                  </>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SidebarOm;
