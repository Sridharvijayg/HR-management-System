import React, { createContext, useState } from 'react'

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
    const [isPassVisible,setIsPassVisible] = useState(false);
    const [departments,setDepartments]= useState([]);

  return (
    <MyContext.Provider value={{email,setEmail,password,setPassword,otp,setOtp,newPassword,setNewPassword,confirmPassword,setConfirmPassword,msg,setMsg,isVisible,setIsVisible,token,setToken,login,setLogin,employee,setEmployee,isPassVisible,setIsPassVisible,departments,setDepartments
    }}>
        {children}
    </MyContext.Provider>
  )
}

export default MyContextProvider
