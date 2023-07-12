import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from './UserContext';
import axios from 'axios'

function Header() {

  const {userInfo,setUserInfo} = useContext(UserContext);
  const [logOut,setLogOut] = useState(false);

  const getRequest = async () => {
    try {
      const response  = await axios.get('http://localhost:4000/profile',
        {
          withCredentials: true,
        }
      );
      setUserInfo(response.data);
    }catch (error) {
      
    }
  }
  useEffect(()=>{
    getRequest();
  },[]);


  const logOutRequest = async () => {
    try {
      axios.get('http://localhost:4000/logout',
        {
          withCredentials: true,
        }
      ); 
      setLogOut(true);
    }catch (error) {
        // console.log(`error: `, error);
    }
       
  }

  if(logOut){
    return <Navigate to='/login'/>
  }
  return (
      <header>
        <a href="/home" className="logo">Blogosphere</a>
        <nav>
        {
          userInfo.username ? 
          <div>
            <div id='Name'> {userInfo.username} </div>
            <Link to="/home" className='headerHome'>Home</Link>
            <Link to="/my" className='headerMy'>MyPosts</Link>
            <Link to="/create" className='headerCreate'>Create</Link>
            <a onClick={logOutRequest} className='headerLogout'>Logout</a>
          </div>
          :
          <div>
            <Link to="/home" className='headerHome'>Home</Link>
            <Link to="/login" className='headerLogin'>Login</Link>
            <Link to="/register" className='headerRegister'>Register</Link>
          </div>
        }
        </nav>
      </header>
  )
}

export default Header