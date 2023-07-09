import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import axios from 'axios';

function Register() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const register = async (e) => {
    e.preventDefault();
    try {
      const response  = await axios.post('http://localhost:4000/register',{
          // your expected POST request payload goes here
          username : username,
          password : password,
        },
      )
      console.log(`data: `, response.data);
   
    } catch (error) {
      console.log(`error: `, error);
    }
  }

  return (
    <div className='loginContent'>
        <Header/>
        <div className="content">        
            <div className='loginArea'>
                <form onSubmit={register} method='POST'>
                    <p>Enter Details</p>
                    Username: <input type="text" 
                              id="username" 
                              placeholder='Enter username'
                              required
                              onChange={(e) => setUsername(e.target.value)}/>

                    Password: <input type="password" 
                              id="password" 
                              placeholder='Enter password'
                              required
                              onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit">Register</button>
                    Already Registered? Login here
                    <Link to='/login' className='button'>Login</Link>
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