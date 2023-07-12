import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Header from './Header'
import axios from 'axios';
import { toast } from 'react-toastify';

function Register() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    try {
      const response  = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`,{
          // your expected POST request payload goes here
          username : username,
          password : password,
        },
      )
      setRedirect(true);
      toast.success('Registered Successfully');
    } catch (error) {
      toast.error('Choose a unique username and try again');
      console.log(`error: `, error);
    }
  }
  if(redirect === true){
    return(
      <Navigate to='/login'/>
    )
  }
  return (
    <div className='loginContent'>
        <Header/>
        <div className="content">
            <div className='loginArea'>
                <form onSubmit={register} method='POST'>
                    <p>ENTER DETAILS</p>
                    USERNAME: <input type="text" 
                              id="username" 
                              placeholder='Enter username'
                              required
                              onChange={(e) => setUsername(e.target.value)}/>

                    PASSWORD: <input type="password" 
                              id="password" 
                              placeholder='Enter password'
                              required
                              onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit">REGISTER</button>
                    Already Registered? Login here
                    <Link to='/login' className='button'>LOGIN</Link>
                </form>
            </div>
            <div className='banner'>
                <div className='bannerText'>                
                    Welome to <span id='name'> Blogosphere! </span> <br/> Unleashing the Power of Words: Your Journey Begins Here!
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register