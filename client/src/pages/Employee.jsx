import React, { useContext, useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../context/MyContext'
import Loading from '../components/Loading'

const Employee = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();
    const [search,setSearch]= useState('');
    const {employees,setEmployees,isLoading,setIsLoading}= useContext(MyContext);

    const refresh = () => {
      setRefreshKey(refreshKey+1);
    }
   
    const handleDelete = async (employeeId) => {
        try {
          const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
          if (!confirmDelete) return;
    
          const response = await fetch(`http://localhost:5000/api/Employee/${employeeId}`, { 
            method: 'DELETE',
          });
    
          if (response.ok) {
            // Remove the deleted employee from the state
            setEmployees(employees.filter((employee) => employee.employeeId !== employeeId));
            alert('Employee deleted successfully');
          } else {
            alert('Error deleting employee');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error deleting employee');
        }
      };

    const handleSearchEmployee = async (e) => {
        try {
          if(search){
            const response = await fetch(`http://localhost:5000/api/Employee/search?query=${search}`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
          }
    
          const data = await response.json();
          setEmployees(data.employees); 
          }else{
            refresh();
          }
        } catch (err) {
          console.error(err);
          console.log('Error fetching departments');
        }
      }
    
    useEffect(()=>{
      const fetchData = async()=>{
          try{
            setIsLoading(true)
            const response = await fetch('http://localhost:5000/api/Employee/page?page=1&limit=10')
          const data = await response.json();
          setEmployees(data.employees);
          }catch(err){
            console.log(err);
          }finally{
          setIsLoading(false);
          }
      }
      fetchData();
  },[refreshKey])

    
    return (
      <div className='Grid-box'>
      {isLoading &&  <Loading/>}
      <SideNav/>
     <Nav title='Employee'/>
    <main>
     <div className="add-employee">
        <input type="text" 
        value={search} 
        onChange={(e)=>{
          setSearch(e.target.value);
        }}
        placeholder='Search Employee'
        className='dep-text'
        />
            <button className='button' onClick={(e)=>handleSearchEmployee(e)}>Search</button>
            <button className='button' onClick={(e)=>navigate(`/Employee/Add`)}>New Employee</button>
        </div>
        <div className="table-responsive">
        <table className="table table-dark table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Employee ID</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email Time</th>
                <th>Position</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>            
        </thead>
        <tbody>
        { employees ?
  employees.map((employee) => (
    <tr key={employee._id}>
      <td>{employee.employeeId}</td>
      <td><img src={employee.profilePictureUrl}/></td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.position}</td>
      <td>
          <button className="button" onClick={(e)=>{
          e.preventDefault();
          navigate(`/Employee/${employee.employeeId}`)
          }} 
          >Edit</button>
      </td>
      <td><button className="button" onClick={(e)=>handleDelete(employee.employeeId)}>Delete</button></td>
    </tr>
  )): <tr><td colSpan={7}> No employees Found </td></tr>
}

        </tbody>
      </table>
    </div>
    </main>
    </div>
  )
}

export default Employee
