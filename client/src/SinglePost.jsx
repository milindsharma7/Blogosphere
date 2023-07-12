import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from 'axios';
import Header from './Header';
import './SinglePost.css'

function SinglePost() { 
  const {userInfo,setUserInfo} = useContext(UserContext);
  const [posts,setPosts] = useState({});
  const [canEdit,setCanEdit] = useState(false);
  const { id } = useParams();

  const getRequest = async () => {
    try {
      const response  = await axios.get(`http://localhost:4000/post/${id}`,
        {
          withCredentials: true,
        }
      );
      setPosts(response.data);
      // console.log(response);
      
      if(response.data.author == userInfo.id){
        setCanEdit(true);
      }
      // console.log(response);
    }catch (error) {
        
    }
  }
  useEffect(()=>{
    getRequest();
  },[]);
  const date = new Date(posts.createdAt);
  date.setHours(date.getHours() + 5)
  date.setMinutes(date.getMinutes() + 30)
  return (
      <div>
        <Header/>
        <div id='singlePostDiv'>
          <div id='sgTitle'>
            {posts.title}
          </div>
          <div id='sgAuthor'>
            <div id='sgAuthorName'>{posts.name}</div>
            <div id='sgAuthorDate'>{date.toUTCString().substring(0,22)}</div>
          </div>
          <img src={`${posts.cover}`} alt="error" id='singlePostImage'/>
          {
            canEdit ?
            <div id='sgButton'>
              <Link id='sgEdit' to={`/edit/${id}`}>EDIT</Link>
              <Link id='sgDelete' to={`/delete/${id}`}>DELETE</Link>
            </div>
            :
            <div>

            </div>
          }
          <div dangerouslySetInnerHTML={{__html:posts.content}} id='sgContent'>
          </div>
        </div>
      </div>
  )
}

export default SinglePost