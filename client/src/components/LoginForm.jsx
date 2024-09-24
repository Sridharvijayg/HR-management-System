import React, { useContext } from 'react'
import Msg from './Msg'
import { MyContext } from '../context/MyContext'
import {Link, useNavigate} from 'react-router-dom'

const LoginForm = () => {

    const {msg,email,setEmail,password,setPassword,isVisible,setIsVisible,setMsg,setEmployee,setLogin,setToken,user,setUser,isAdmin,setIsAdmin} = useContext(MyContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
      
        const PostOption = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        };
      
        try {
          const response = await fetch('http://localhost:5000/api/Login', PostOption);
          const data = await response.json();
          
          if (!response.ok) {
             return setMsg(data.message);
          }
          
          if(data.login){
            await setToken(data.token);
            await localStorage.setItem('token',data.token)
            await setMsg(data.message);
            await setEmployee(data.employee);
            await setLogin(data.login);
            if(data.employee.role == 'admin'){
            setIsAdmin(true);
            navigate('/admin');
            }else{
              navigate('/emp')
            }
            console.log(data);
          }
          
      
        } catch (err) {
          console.log(err.message);
          
        }
      };
      

  return (
    <div  className='login-box'>
    <form>
    <h2 className='login'>Login</h2>
    {msg && <Msg />}
    <div className="input-box">
    <label htmlFor="email">Email</label>
    <input 
    type="email" 
    required 
    id='email'
    placeholder='Email'
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    />
    </div>

    <div className="input-box">
    <label htmlFor="password">Password</label>
    <input 
    type={isVisible?"text":"password" }
    required 
    id='password' 
    placeholder='Password'
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    />
    </div>

    <div className="checkbox">
    <input 
    type="checkbox" 
    name="show-password" 
    id="show-password"
    checked={isVisible}
    onChange={()=>setIsVisible(!isVisible)}
    />
    <label htmlFor="show-password">Show Password</label>
    </div>

    <button type='submit' onClick={(e)=>handleLogin(e)}>Submit</button>
    <Link to='/login/reset' className='links'>forget Password ?</Link>
  </form>
  </div>
  )
}

export default LoginForm
