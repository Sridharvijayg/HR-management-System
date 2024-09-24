import React, { useContext, useEffect, useState } from 'react'
import ESideNav from '../components/ESideNav'
import Nav from '../components/Nav'
import Loading from '../components/Loading'
import { MyContext } from '../context/MyContext'
import { useNavigate } from 'react-router-dom'


const ELeave = () => {

    const [refreshKey, setRefreshKey] = useState(0);
    const [leaves, setLeaves] = useState(null);
    const navigate = useNavigate();
    const {isLoading,setIsLoading,employee} = useContext(MyContext);

    const refresh = () => {
      setRefreshKey(refreshKey + 1);
    }

    const handleDelete = async (leaveId) => {
        try {
          const response = await fetch(`http://localhost:5000/api/leaves/${leaveId}`, { 
            method: 'DELETE',
          });
    
          if (response.ok) {
            alert('Leave Request deleted successfully');
            refresh();
          } else {
            alert('Error deleting request');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error deleting request');
        }
      };

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                setIsLoading(true);
              const response = await fetch(`http://localhost:5000/api/leaves/${employee.employeeId}?page=1&limit=10`)
            const data = await response.json();
            setLeaves(data.leaves);
            
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
      <ESideNav/>
      <Nav title="Employee Leave"/>
      <main>
            <div className="add-employee">
                <button className='button' onClick={()=>{navigate('/raise-Leave')}}>Raise Leave</button>
            </div>
      <div className="table-responsive">
                <table className="table table-dark table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>No. of Days</th>
                            <th>Remaining Days</th>
                            <th>Status</th>
                            <th>update</th>
                        </tr>
                    </thead>
                    <tbody>
                      { leaves && leaves.length > 0?
                        leaves.map((leave) => (
                            <tr key={leave._id}>
                            <td>{leave.employeeId}</td>
                            <td>{leave.name}</td>
                            <td>{leave.fromDate.split('T')[0]}</td>
                            <td>{leave.toDate.split('T')[0]}</td>
                            <td>{leave.noOfDays}</td>
                            <td>{leave.remainingDays}</td>
                            <td><p className={leave.status == "Approved" ?"approved":"pending"}>{leave.status}</p></td>
                            <td><button className="button" onClick={()=>{handleDelete(leave.leaveId)}}>Delete</button></td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td colspan={8}>No Data found</td>
                        </tr>
                      }
                    </tbody>
                </table>
            </div>
            
      </main>
    </div>
  )
}

export default ELeave
