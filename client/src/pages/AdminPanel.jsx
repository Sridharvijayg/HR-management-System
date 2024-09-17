import React from 'react'
import SideNav from '../components/SideNav';
import Nav from '../components/Nav';

const AdminPanel = () => {


  return (
    <div>
      <SideNav/>
      <div className="content">
      <Nav title='Admin panel'/>
      </div>
    </div>
  )
}

export default AdminPanel
