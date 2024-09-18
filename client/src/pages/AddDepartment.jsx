import React, { useContext, useEffect, useState } from 'react'

import SideNav from '../components/SideNav'
import Nav from '../components/Nav'
import { MyContext } from '../context/MyContext';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const navigate = useNavigate();
    const [department,setDepartment]= useState('');
    const {departments,setDepartments} = useContext(MyContext);

    const handledepartment = async(e) => {
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
            const response = await fetch('http://localhost:5000/api/Department/', PostOption);
            const data = await response.json();
            alert(data.message);
            setDepartment('');
            navigate('/Department');
            if (!response.ok) {
               return;
            }

          } catch (err) {
            console.log(err.message);
            
          }
    }
  
    return (
    <div className='content'>
     <SideNav/>
     <Nav title='Add Department'/>
     <div className="add-Department">
     <form>
        <h2>Add Department</h2>
        <input type="text" 
        value={department} 
        onChange={(e)=>setDepartment(e.target.value)}
        placeholder='Type Department...'
        className='dep-text'
        />
            <button className='button' onClick={(e)=>handledepartment(e)}>Add Department</button>
    </form>
    </div>
    </div>

  )
}

export default AddDepartment
