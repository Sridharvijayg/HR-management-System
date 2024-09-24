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
    if (location.pathname === '/admin') {
      setActiveLink('Home');
    } else if (location.pathname === '/Employee') {
      setActiveLink('Employee');
    } else if (location.pathname === '/Attendance') {
      setActiveLink('Attendance');
    } else if (location.pathname === '/Department') {
      setActiveLink('Department');
    } else if (location.pathname === '/Leave') {
      setActiveLink('Leave');
    }
  }, [location.pathname]); // Runs on path change

  return (
    <div className='side-nav'>
      <div className="title">
        <h3 className="logo">ST Solutions</h3>
      </div>
      <div className="nav-links">
        <Link 
          to='/admin' 
          className={`nav-link ${activeLink === 'Home' ? "active" : ""}`}
        >
          <FaHome /> Home
        </Link>

        <Link 
          to='/Employee' 
          className={`nav-link ${activeLink === 'Employee' ? "active" : ""}`} 
        >
          <FaUserFriends /> Employee
        </Link>

        <Link 
          to='/Attendance' 
          className={`nav-link ${activeLink === 'Attendance' ? "active" : ""}`} 
        >
          <FaCalendarAlt /> Attendance
        </Link>

        <Link 
          to='/Department' 
          className={`nav-link ${activeLink === 'Department' ? "active" : ""}`} 
        >
          <FaPeopleGroup /> Department
        </Link>

        <Link 
          to='/Leave' 
          className={`nav-link ${activeLink === 'Leave' ? "active" : ""}`} 
        >
          <FaPeopleGroup /> Leave
        </Link>
      </div>
    </div>
  );
}

export default SideNav;
