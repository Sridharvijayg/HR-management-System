import React, { useContext } from 'react'
import SideNav from '../components/SideNav';
import Nav from '../components/Nav';
import { MyContext } from '../context/MyContext';

const AdminPanel = () => {

  const {employees,departments}= useContext(MyContext);

  return (
    <div>
      <SideNav/>
      <div className="content">
      <Nav title='Admin panel'/>
      <div className="Admin-info">
        <div className="info-box">
          <h1>Total No of Employee</h1>
          <h2>{employees.length}</h2>
        </div>
        <div className="info-box">
          <h1>Total No of Department</h1>
          <h2>{departments.length}</h2>
        </div>
      </div>
      </div>
    </div>
  )
}

export default AdminPanel
