import React from 'react'
import SideNav from '../components/SideNav'
import Nav from '../components/Nav'

const Attendance = () => {
  return (
    <div className='content'>
     <SideNav/>
     <Nav title='Attendance'/>
     <div className="add-employee">
            <button className='button'>Export CSV</button>
        </div>
        <div className="table-responsive">
        <table className="table table-dark table-striped table-bordered">
            <thead className="thead-dark">
            <th>S.no</th>
            <th>Department</th>
            <th>Date</th>
            <th>No.employees</th>
         
        </thead>
        <tbody>
            <tr>
                <td>01</td>
                <td>Developer</td>
                <td>12/02/2024.com</td>
                <td>12</td>
            </tr>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Attendance
