import React from 'react'
import {Outlet} from 'react-router-dom'


const Login = () => {
  return (
    <div  className='login-box'>
      <Outlet/>
    </div>
  )
}

export default Login
