import React, { createContext, useEffect, useState } from 'react'

export const MyContext = createContext(); 

const MyContextProvider = ({children}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [otp,setOtp] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [isVisible,setIsVisible] = useState(false);
    const [msg,setMsg] = useState('');
    const [token,setToken] = useState('');
    const [login,setLogin] = useState(false);
    const [employee,setEmployee] = useState(null);
    const [employees,setEmployees] = useState([]);
    const [isPassVisible,setIsPassVisible] = useState(false);
    const [departments,setDepartments]= useState([]);
    const [isAdmin,setIsAdmin] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [attendance,setAttendance] = useState();
    const [user,setUser] = useState();

    useEffect(()=>{
      const fetchData = async()=>{
          try{
            setIsLoading(true)
            const response = await fetch('http://localhost:5000/api/Employee/page?page=1&limit=10')
            const data = await response.json();
            setEmployees(data.employees);
            const response1 = await fetch('http://localhost:5000/api/Department')
            const data1 = await response1.json();
            setDepartments(data1);
            const response2 = await fetch('http://localhost:5000/api/Attendance/attendance-report')
            const data2 = await response2.json(); 
            if(data2.attendanceRecords.length){
              setAttendance(((Number(data2.attendanceRecords.length) / Number(data.employees.length)) * 100).toFixed(2));
            }else{
              setAttendance(0)
            }

          }catch(err){
            console.log(err);
          }finally{
            setIsLoading(false)
          }
      }
      fetchData();
  },[])
    

  return (
    <MyContext.Provider value={{email,setEmail,password,setPassword,otp,setOtp,newPassword,setNewPassword,confirmPassword,setConfirmPassword,msg,setMsg,isVisible,setIsVisible,token,setToken,login,setLogin,employee,setEmployee,isPassVisible,setIsPassVisible,departments,setDepartments,employees,setEmployees,isAdmin,setIsAdmin,isLoading,setIsLoading,attendance,setAttendance,user,setUser
    }}>
        {children}
    </MyContext.Provider>
  )
}

export default MyContextProvider
