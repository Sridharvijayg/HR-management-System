import React, { useContext } from 'react'
import ESideNav from '../components/ESideNav'
import Nav from '../components/Nav'
import Loading from '../components/Loading'
import { MyContext } from '../context/MyContext'
const EmployeePanel = () => {

    const {isLoading,employee} = useContext(MyContext);
    
  return (
    <div className='Grid-box'>
      {isLoading &&  <Loading/>}
      <ESideNav/>
      <Nav title="Employee Panel"/>
      <main>
        <div className="employee-detail">
            <img src={employee.profilePictureUrl} alt="Profile"  width="250px" height="250px" />
            <p>Employee ID   :{employee.employeeId}</p>
            <p>Employee Name : {employee.name}</p>
            <p>Email         : {employee.email}</p>
            <p>Position      : {employee.position}</p>
            <p>Department    : {employee.department}</p>
        </div>
      </main>
    </div>
  )
}

export default EmployeePanel
