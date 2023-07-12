import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from 'axios';
import Header from './Header';
import './SinglePost.css'

function SinglePost() { 
  const {userInfo,setUserInfo} = useContext(UserContext);
  const [posts,setPosts] = useState({});
  const [canEdit,setCanEdit] = useState(false);
  const [canDelete,setCanDelete] = useState(false);
  const { id } = useParams();

  const getRequest = async () => {
    try {
      const response  = await axios.get(`http://localhost:4000/post/${id}`,
        {
          withCredentials: true,
        }
      );
      setPosts(response.data);
      
      if(response.data.author == userInfo.id){
        setCanEdit(true);
      }
    }catch (error) {
        
    }
  }
  useEffect(()=>{
    getRequest();
  },[]);

  const deleteRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:4000/post/${id}`
      );
      setCanDelete(true);
    }catch (error) {

    }
  }
  if(canDelete === true){
    return (
      <Navigate to='/home'/>
    )
  }
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
              <Link id='sgDelete' onClick={deleteRequest}>DELETE</Link>
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