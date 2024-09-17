import React from 'react'
import {Link} from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";


const SideNav = () => {
  return (
    <div className='side-nav'>
        <h3 className="logo">Hash Enchanted</h3>
      <div className="nav-links">
        <Link to='/' className='nav-link'><FaHome /> Home</Link>
        <Link to='/Employee' className='nav-link'><FaUserFriends /> Employee</Link>
        <Link to='/Attendance' className='nav-link'><FaCalendarAlt /> Attendance</Link>
        <Link to='/Department' className='nav-link'><FaPeopleGroup /> Department</Link>
      </div>
    </div>
  )
}

export default SideNav
