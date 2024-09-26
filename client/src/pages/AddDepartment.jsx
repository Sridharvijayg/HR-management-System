import React, { useContext, useState } from 'react'
import SideNav from '../components/SideNav'
import Nav from '../components/Nav'
import { MyContext } from '../context/MyContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const AddDepartment = () => {
    const navigate = useNavigate();
    const [department,setDepartment]= useState('');
    const {departments,setDepartments,setIsLoading,isLoading} = useContext(MyContext);

    const handleAddDepartment = async(e) => {
        e.preventDefault();
        const PostOption = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              department: department,
            })
          };
        
          try {
            setIsLoading(true)
            const response = await fetch('http://localhost:5000/api/Department/', PostOption);
            if (!response.ok) {
               return;
            }
            const data = await response.json();
            setIsLoading(false)
            alert(data.message);
            setDepartment('');
            navigate('/Department');
          } catch (err) {
            console.log(err.message);
          }finally{
            setIsLoading(false)
          }
    }
  
    return (
      <div className='Grid-box'>
      {isLoading && <Loading/>}
      <SideNav/>
      <Nav title='Add Department'/>
        <main>
          <div className="add-Department">
            <form onSubmit={(e)=>handleAddDepartment(e)}>
                <h2>Add Department</h2>
                <input type="text" 
                value={department} 
                autoFocus
                onChange={(e)=>setDepartment(e.target.value)}
                placeholder='Type Department...'
                className='dep-text'
                />
                <button className='button' type='submit'>Add Department</button>
            </form>
          </div>
        </main>
     </div>

  )
}

export default AddDepartment
