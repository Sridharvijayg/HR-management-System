import React, { useContext } from "react";
import {Routes,Route} from 'react-router-dom'
import LoginForm from "./components/LoginForm";
import ForgetPasswordForm from "./components/ForgetPasswordForm";
import OTP from "./components/OTP";
import UpdatePassword from "./components/UpdatePassword";
import AdminPanel from "./pages/AdminPanel";
import Employee from "./pages/Employee";
import Department from "./pages/Department";
import Attendance from "./pages/Attendance";
import AddDepartment from "./pages/AddDepartment";
import UpdateDepartment from "./pages/UpdateDepartment";
import AddEmployee from "./pages/AddEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";
import Leave from "./pages/Leave";
import EmployeePanel from "./pages/EmployeePanel";
import { MyContext } from "./context/MyContext";
import ELeave from "./pages/ELeave";
import RaiseLeave from "./pages/RaiseLeae";
import LeaveStatus from "./pages/LeaveStatus";

function App() {

  const {login,isAdmin} = useContext(MyContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login/reset" element={<ForgetPasswordForm />} />
        <Route path="/login/otp" element={<OTP />} />
        <Route path="/login/update-password" element={<UpdatePassword />} />
        <Route path="/admin" element={isAdmin?<AdminPanel/>:<LoginForm/>}/>
        <Route path="/Employee" element={isAdmin?<Employee/>:<LoginForm/>}/>
        <Route path="/Employee/Add" element={<AddEmployee/>}/>
        <Route path="/Employee/:employeeId" element={<UpdateEmployee/>}/>
        <Route path="/Department" element={isAdmin?<Department/>:<LoginForm/>}/>
        <Route path="/Department/Add" element={<AddDepartment/>}/>
        <Route path="/Department/:id" element={<UpdateDepartment/>}/>
        <Route path="/Leave" element={<Leave/>}/>
        <Route path="/Leave/:leaveId" element={<LeaveStatus/>}/>
        <Route path="/Attendance" element={<Attendance/>}/>
        <Route path="/emp" element={login?<EmployeePanel/>:<LoginForm/>}/>
        <Route path="/ELeave" element={login?<ELeave/>:<LoginForm/>}/>
        <Route path="/raise-Leave" element={login?<RaiseLeave/>:<LoginForm/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
