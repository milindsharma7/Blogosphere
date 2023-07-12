import React, { useContext, useState } from 'react'
import '../styles/Login.css'
import Header from './Header'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function Login() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);
    const login = async (e) => {
      e.preventDefault();
      try {
        const response  = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,{
            // your expected POST request payload goes here
            username : username,
            password : password,
          },
          {
              withCredentials: true,
          }
        )
        if(response.status === 200){
          setUserInfo(response.data);
          setRedirect(true);
        }
         toast.success('Logged In');
        } catch (error) {
          toast.error('Invalid Credentials');
        }
      }
      if(redirect){ 
        return <Navigate to='/home'/>
      }
    return (
        <div className='loginContent'>
            <Header/>
            <div className="content">        
                <div className='loginArea'>
                    <form onSubmit={login} method=''>
                        <p>ENTER YOUR CREDENTIALS</p>
                        USERNAME: <input type="text" 
                                required id="username" 
                                placeholder='Enter username' onChange={(e) => setUsername(e.target.value)}/>
                        PASSWORD: <input type="password" 
                                required id="password" 
                                placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}/>
                        <button type="submit">LOGIN</button>
                        OR
                        <Link to='/register' className='button'>REGISTER</Link>
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