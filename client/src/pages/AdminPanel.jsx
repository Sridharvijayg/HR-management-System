import React, { useContext } from 'react'
import SideNav from '../components/SideNav';
import Nav from '../components/Nav';
import { MyContext } from '../context/MyContext';
import Loading from '../components/Loading';
import EmployeeDepartmentChart from '../components/EmployeeDepartmentChart';

const AdminPanel = () => {

  const {employees,departments,isLoading,attendance}= useContext(MyContext);

  return (
    <div className='Grid-box'>
      {isLoading &&  <Loading/>}
      <SideNav/>
      <Nav title='Admin panel'/>
      <main>
      <div className="Admin-info">
        <div className="info-box">
          <h1>No of Employee</h1>
          <h2>{employees.length}</h2>
        </div>
        <div className="info-box">
          <h1>No of Department</h1>
          <h2>{departments.length}</h2>
        </div>
        <div className="info-box">
          <h1>Attendance Percentage</h1>
          <h2>{attendance>0 ? attendance : 0 }%</h2>
        </div>
      </div>
      <div className="charts">
        <div className="chart-box">
        <EmployeeDepartmentChart employeeData={employees}/>
        </div>
      </div>
      </main>
    </div>
  )
}

export default AdminPanel
