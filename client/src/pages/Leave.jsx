import React, {  useEffect, useState, useContext } from 'react'
import SideNav from '../components/SideNav'
import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/MyContext'
import Loading from '../components/Loading'

const Leave = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [leaves, setLeaves] = useState(null);
    const navigate = useNavigate();

    const {isLoading,setIsLoading} = useContext(MyContext);

    const refresh = () => {
      setRefreshKey(refreshKey + 1);
    }

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                setIsLoading(true);
              const response = await fetch('http://localhost:5000/api/leaves?page=1&limit=10')
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
        <SideNav />
            <Nav title='Leave Requests' />
        <main>
            <div className="add-employee">
                <input
                    type="text"
                    placeholder='Search Leave Request'
                    className='dep-text'
                />
                <button className='button' >Search</button>
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
                      { leaves ?
                        leaves.map((leave) => (
                            <tr key={leave._id}>
                            <td>{leave.employeeId}</td>
                            <td>{leave.name}</td>
                            <td>{leave.fromDate.split('T')[0]}</td>
                            <td>{leave.toDate.split('T')[0]}</td>
                            <td>{leave.noOfDays}</td>
                            <td>{leave.remainingDays}</td>
                            <td><p className={leave.status == "Approved" ?"approved":"pending"}>{leave.status}</p></td>
                            <td><button className="button" onClick={()=>navigate(`/leave/${leave.leaveId}`)}>update</button></td>
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
    );
}

export default Leave;
