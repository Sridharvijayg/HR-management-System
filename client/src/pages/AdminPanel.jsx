import React from 'react'
import SideNav from '../components/SideNav';
import Nav from '../components/Nav';

const AdminPanel = () => {


  return (
    <div>
      <SideNav/>
      <div className="content">
      <Nav title='Admin panel'/>
      <div className="Admin-info">
        <div className="info-box">
          <h1>Total No of Employee</h1>
          <h2>18</h2>
        </div>
        <div className="info-box">
          <h1>Total No of Employee</h1>
          <h2>18</h2>
        </div>
      </div>
      </div>
    </div>
  )
}

export default AdminPanel
