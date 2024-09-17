import React, { useContext } from 'react'
import Msg from './Msg'
import { MyContext } from '../context/MyContext';
import { useNavigate } from 'react-router-dom';

const OTP = () => {

    const {otp,setOtp,msg,setMsg} = useContext(MyContext);
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();

          try {
            const response = await fetch(`http://localhost:5000/api/Login/reset_password/${otp}`);
            const data = await response.json();
            
            if (!response.ok) {
               return setMsg(data.message);
            }
            
            setMsg(data.message);
            navigate('/login/update-password')

        
          } catch (err) {
            console.log("An error occurred while generate Otp");
          }
    }

  return (
    <form>
        <h2 className='login'>Enter OTP</h2>
        {msg && <Msg />}
        <div className="input-box">
        <label htmlFor="otp">Please Verify OTP</label>
        <input 
        type="text" 
        required 
        id='otp'
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
        placeholder='OTP'
        />
        </div>
        <button type='submit' onClick={(e)=>handleVerify(e)}>Verify</button>
      </form>
  )
}

export default OTP
