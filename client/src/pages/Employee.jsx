import React from 'react'
import SideNav from '../components/SideNav'
import Nav from '../components/Nav'



const Employee = () => {
  return (
    <div className='content'>
        <SideNav/>
        <Nav title='Employee'/>
        <div className="add-employee">
            <button className='button'>Add Employee</button>
        </div>

    <div className="table-responsive">
        <table className="table table-dark table-striped table-bordered">
            <thead className="thead-dark">
            <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>2407</td>
                <td>Sureshkumar</td>
                <td>Sureshkumar142282gmail.com</td>
                <td>Developer</td>
            </tr>
            </tbody>
        </table>
</div>

    </div>
  )
}

export default Employee
