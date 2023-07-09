import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Header() {

  const [username,setUsername] = useState(null);
  const getRequest = async () => {
    try {
      const response  = await axios.get('http://localhost:4000/profile',
        {
          withCredentials: true,
        }
      );
      setUsername(response.data.username);
      console.log(username);
    }catch (error) {
        console.log(`error: `, error);
    }
  }
  useEffect(()=>{
    getRequest();
  },[]);

  // const logout=()=>{
      const logOutRequest = async () => {
        try {
          const response  = await axios.post('http://localhost:4000/logout',
            {
              withCredentials: true,
              credentials: "include"
            }
          ); 
          // console.log(response);console.log(username);
        }catch (error) {
            console.log(`error: `, error);
        }
       
    }
  // }
  
  return (
      <header>
        <a href="/home" className="logo">Blogosphere</a>
        <nav>
        {
          username ? 
          <div>
            <Link to="/profile">Profile</Link>
            <a onClick={logOutRequest}>Logout</a>
          </div>
          :
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        }
        </nav>
      </header>
  )
}

export default Header