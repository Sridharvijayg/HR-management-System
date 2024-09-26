import React, { useContext } from 'react'
import { MyContext } from '../context/MyContext'
import { useNavigate } from 'react-router-dom';

const Nav = ({title}) => {

    const {login,employee,setLogin} = useContext(MyContext);
    const navigate = useNavigate();

  return (
    <nav>
        <h3>{title}</h3>
        {!login && <div>
            <button className='button' onClick={()=>navigate('/Login')}>Login</button>    
        </div>}
        {login && <div className='logout'>
          <h5> {employee.name}</h5>
          <button className="button" onClick={()=>setLogin(false)}>Logout</button>
          </div>}


    </nav>
  )
}

export default Nav
