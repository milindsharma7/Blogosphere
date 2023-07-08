import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

function Register() {
  return (
    <div className='loginContent'>
        <Header/>
        <div className="content">        
            <div className='loginArea'>
                <form action="">
                    <p>Enter Details</p>
                    Username: <input type="text" name="" id="username" placeholder='Enter username'/>
                    Password: <input type="password" name="" id="password" placeholder='Enter password'/>
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