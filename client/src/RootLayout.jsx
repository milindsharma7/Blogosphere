import React, { useEffect, useState } from 'react';
import Header from './Header';
import Posts from './Posts';
import axios from 'axios';

function RootLayout() {
  const [posts,setPosts] = useState('');
  const getRequest = async () => {
    try {
      const response  = await axios.get('http://localhost:4000/get',
        {
          withCredentials: true,
        }
      );
      setPosts(response.data);
      // console.log(response);
    }catch (error) {
      
    }
  }
  useEffect(()=>{
    getRequest();
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