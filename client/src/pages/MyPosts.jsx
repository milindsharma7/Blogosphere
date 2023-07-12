import React, { useState } from 'react'
import { UserContext } from '../UserContext';
import { useContext, useEffect } from 'react'
import axios from 'axios';
import Header from './Header';
import Posts from './Posts';
import { toast } from 'react-toastify';

function MyPosts() {
    const {userInfo,setUserInfo} = useContext(UserContext);
    const [posts,setPosts] = useState('');
    console.log(userInfo);
    const { username } = userInfo;
    console.log(username);

    const getRequest = async () => {
      try {
        const response  = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/my`,
            {
                username
            }
        );
        setPosts(response.data);
        console.log(response);
      }catch (error) {
        
      }
    }
    useEffect(()=>{
      toast.promise(
        getRequest(),
        {
          pending: 'Loading',
          error: "Error",
        },
      );
    },[]);
    return (
      <main>
          <Header/>
          {
          posts.length ?
           posts.map(post => {
              return <Posts {...post}/>
          })
          :
          <div>
            There is nothing to show here.
          </div>
        }
      </main>
    )
}

export default MyPosts