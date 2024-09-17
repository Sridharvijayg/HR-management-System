import React from "react";
import Login from "./pages/Login";
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

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminPanel/>}/>
        <Route path="/Employee" element={<Employee/>}/>
        <Route path="/Department" element={<Department/>}/>
        <Route path="/Department/Add" element={<AddDepartment/>}/>
        <Route path="/Department/:id" element={<UpdateDepartment/>}/>
        <Route path="/Attendance" element={<Attendance/>}/>
        <Route path="/login" element={<Login />}>
          <Route index element={<LoginForm />} />
          <Route path="reset" element={<ForgetPasswordForm />} />
          <Route path="otp" element={<OTP />} />
          <Route path="update-password" element={<UpdatePassword />} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
