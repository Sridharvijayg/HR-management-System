import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

const SideNav = () => {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Set the active link based on the current path
    if (location.pathname === '/emp') {
      setActiveLink('emp');
    } else if (location.pathname === '/EAttendance') {
      setActiveLink('EAttendance');
    } else if (location.pathname === '/ELeave') {
      setActiveLink('ELeave');
    }
  }, [location.pathname]); // Runs on path change

  return (
    <div className='side-nav'>
      <div className="title">
        <h3 className="logo">ST Solutions</h3>
      </div>
      <div className="nav-links">
        <Link 
          to='/emp' 
          className={`nav-link ${activeLink === 'emp' ? "active" : ""}`}
        >
          <FaHome /> Home
        </Link>

        <Link 
          to='/ELeave' 
          className={`nav-link ${activeLink === 'ELeave' ? "active" : ""}`} 
        >
          <FaPeopleGroup /> Leave
        </Link>
      </div>
    </div>
  );
}

export default SideNav;
