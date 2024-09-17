import React, { useContext } from 'react'
import Msg from './Msg'
import { MyContext } from '../context/MyContext';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordForm = () => {
    
    const {email,setEmail,msg,setMsg} = useContext(MyContext);
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();

        const PostOption = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email
            })
          };
        
          try {
            const response = await fetch('http://localhost:5000/api/Login/reset_password', PostOption);
            const data = await response.json();
            
            if (!response.ok) {
               return setMsg(data.message);
            }
            
            setMsg(data.message);
            navigate('/login/otp')

        
          } catch (err) {
            console.log("An error occurred while generate Otp");
          }
    }

  return (
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
        <button type='submit' onClick={(e)=> handleReset(e)}>Send OTP</button>
      </form>
  )
}

export default ForgetPasswordForm