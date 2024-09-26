import React, { useContext } from 'react'
import { MyContext } from '../context/MyContext';
import Msg from './Msg';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {

    const {newPassword,setNewPassword,confirmPassword,setConfirmPassword,msg,setMsg,otp,setIsPassVisible,isPassVisible} = useContext(MyContext);
    const navigate = useNavigate();

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
      
        try {

        if(newPassword === confirmPassword){

        const PostOption = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: newPassword
            })
            };

          const response = await fetch(`http://localhost:5000/api/Login/reset_password/${otp}`, PostOption);
          const data = await response.json();
          
          if (!response.ok) {
             return setMsg(data.message);
          }
          
          setMsg(data.message);
          navigate('/')
          
        }else{
        setMsg('Passwords does not match');
        }
        
        } catch (err) {
          console.log("An error occurred while logging in.");
        }
      };
      

  return (
    <div  className='login-box'>
    <form>
        <h2 className='login'>New Passsowrd</h2>
        {msg && <Msg />}
        <div className="input-box">
        <label htmlFor="password">Password</label>
        <input 
        type={isPassVisible?"text":"password"} 
        required 
        id='password'
        placeholder='password'
        value={newPassword}
        onChange={(e)=>setNewPassword(e.target.value)}
        />
        </div>
        <div className="input-box">
        <label htmlFor="c-password">Confirm Password</label>
        <input 
        type={isPassVisible?"text":"password"} 
        required 
        id='c-password'
        placeholder='password'
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        />
        </div>

        <div className="checkbox">
        <input type="checkbox" name="show-password" id="show-password" checked={isPassVisible} onChange={(e)=>setIsPassVisible(!isPassVisible)}/>
        <label htmlFor="show-password">Show Password</label>
        </div>

        <button type='submit' onClick={(e)=>handleUpdatePassword(e)}>Submit</button>
      </form>
      </div>
  )
}

export default UpdatePassword
