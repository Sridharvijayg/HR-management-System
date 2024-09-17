import React, { useContext } from 'react'
import { MyContext } from '../context/MyContext'
import { useNavigate } from 'react-router-dom';

const Nav = ({title}) => {

    const {login,employee} = useContext(MyContext);
    const navigate = useNavigate();

  return (
    <nav>
        <h3>{title}</h3>
        {!login && <div>
            <button className='button' onClick={()=>navigate('/Login')}>Login</button>    
        </div>}
        {login && <h3>Hello {employee.name}</h3>}


    </nav>
  )
}

export default Nav
