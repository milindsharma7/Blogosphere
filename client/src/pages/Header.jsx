import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext';
import axios from 'axios'
import { toast } from 'react-toastify';

function Header() {

  const {userInfo,setUserInfo} = useContext(UserContext);
  const [logOut,setLogOut] = useState(false);

  const getRequest = async () => {
    try {
      const response  = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile`,
        {
          withCredentials: true,
        }
      );
      setUserInfo(response.data);
    }catch (error) {
      
    }
  }
  // useEffect(()=>{
    getRequest();
  // },[]);

  const logOutRequest = async () => {
    try {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`,
      {
        withCredentials: true,
      }
      ); 
      toast.success('Logged Out');
      setLogOut(true);
    }catch (error) {
        // console.log(`error: `, error);
    }
       
  }

  if(logOut){
    return <Navigate to='/login'/>
  }
  // console.log(userInfo.username);
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