import React, { useEffect, useState } from 'react';
import Header from './Header';
import Posts from './Posts';
import axios from 'axios';
import { toast } from 'react-toastify';

function RootLayout() {
  const [posts,setPosts] = useState('');
  const getRequest = async () => {
    try {
      const response  = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get`,
        {
          withCredentials: true,
        }
      );
      setPosts(response.data);
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
        {posts.length > 0 && posts.map(post => {
            return <Posts {...post}/>
        })}
    </main>
  )
}

export default RootLayout