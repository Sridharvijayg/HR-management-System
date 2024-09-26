import React, { useCallback, useContext, useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../context/MyContext'
import Loading from '../components/Loading'

const Department = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();

    const [search,setSearch]= useState('');
    const {departments,setDepartments,isLoading,setIsLoading}= useContext(MyContext);

    const refresh = () => {
      setRefreshKey(refreshKey+1);
    }
    const handleDeleteDepartment = async (id) => {

      const dep = departments.filter(dep => dep._id === id);
      
      if(window.confirm(`You want to delete the department " ${dep[0].department} " Permanantly`)){
        try{
          const PostOption = {
              method:"DELETE"
          }
          setIsLoading(true)
          const response = await fetch(`http://localhost:5000/api/Department/${id}`,PostOption)
          const data = await response.json();
          if(!response.ok){
            return alert("err")
          }
            alert(data.message);
            const after = departments.filter(dep => dep._id !== id);
            setDepartments(after);
            setIsLoading(false)
      }catch(err){
          alert(err)
      }finally{
        setIsLoading(false);
      }
      }
    }

    useEffect(()=>{
      const fetchData = async()=>{
          try{
            setIsLoading(true)
            const response = await fetch('http://localhost:5000/api/Department')
            const data = await response.json();
            setDepartments(data);
          }catch(err){
            console.log(err);
          }finally{
            setIsLoading(false)
          }
      }
      fetchData();
  },[refreshKey])

    const handleSearchDepartment = useCallback(async (e) => {
      try {
        if(search){
          const response = await fetch(`http://localhost:5000/api/Department/search?name=${search}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        setDepartments(data); 
        }else{
          refresh();
        }
      } catch (err) {
        console.error(err);
        console.log('Error fetching departments');
      }
    },[search]);
  
    return (
      <div className='Grid-box'>
       {isLoading &&  <Loading/>}
      <SideNav/>
     <Nav title='Department'/>
    <main>
     <div className="add-employee">
        <input type="text" 
        value={search} 
        onChange={(e)=>{
          setSearch(e.target.value);
        }}
        placeholder='Search Department'
        className='dep-text'
        />
            <button className='button' onClick={(e)=>handleSearchDepartment(e)}> Search</button>
            <button className='button' onClick={(e)=>navigate(`/Department/Add`)}>Add Department</button>
        </div>
        <div className="table-responsive">
        <table className="table table-dark table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Department</th>
                <th>Created Date</th>
                <th>Created Time</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>            
        </thead>
        <tbody>
        {departments && departments.length>0 ?
  departments.map((dep) => (
    <tr key={dep._id}>
      <td>{dep.department}</td>
      <td>{new Date(dep.createdAt).toLocaleDateString()}</td> 
      <td>{new Date(dep.createdAt).toLocaleTimeString()}</td> 
      <td><button className="button" onClick={() => navigate(`/Department/${dep._id}`)}>Edit</button></td>
      <td><button className="button" onClick={() => handleDeleteDepartment(dep._id)}>Delete</button></td>
    </tr>
  )):<tr><td colSpan={5}>No data Found</td></tr>
}

        </tbody>
      </table>
    </div>
    </main>
    </div>
  )
}

export default Department
