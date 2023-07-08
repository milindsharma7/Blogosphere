import React from 'react'
import './Login.css'
import Header from './Header'
import { Link } from 'react-router-dom'
import Register from './Register'

function Login() {
  return (
    <div className='loginContent'>
        <Header/>
        <div className="content">        
            <div className='loginArea'>
                <form action="">
                    <p>Enter your credentials</p>
                    Username: <input type="text" name="" id="username" placeholder='Enter username'/>
                    Password: <input type="password" name="" id="password" placeholder='Enter password'/>
                    <button type="submit">Login</button>
                    OR
                    <Link to='/register' className='button'>Register</Link>
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

export default Login