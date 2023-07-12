import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import '../styles/Create.css';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { toast } from 'react-toastify';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

const convertToBase64 = (file) => {
  return new Promise((resolve,reject)=>{
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    resolve(fileReader.result);
  };
  fileReader.onerror = (error) => {
    reject(error);
  }
  })
}

function EditPost() {
  const {id} = useParams();
  const {userInfo} = useContext(UserContext);
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [file,setFile] = useState({});
  const [redirect,setRedirect] = useState(false);

  const editPost = async (e) => {
    e.preventDefault();
    const base64 = await convertToBase64(file[0]);
    try {
      const response  = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/${id}`,{
          // your expected POST request payload goes here
          title: title,
          summary: summary,
          cover: base64,
          content: content,
          name: userInfo.username,
        },
        {
          withCredentials: true,
        }
      )
      setRedirect(true);
      toast.success('Edited Successfully');
    } catch (error) {
      console.log(`error: `, error.message);
      toast.error('Error Occured');
      setRedirect(true);
    }
  }
    if(redirect === true){
      return(
        <Navigate to='/home'/>
      )
    }
    return (
      <div id='createDiv'>
        <Header/>
        <div id='headCreate'>Edit your Blog</div>
        <form onSubmit={editPost} id='createForm'>
          <input type="text" value={title} required placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
          <input type="text" required value={summary} placeholder='Summary in 100 words' onChange={(e) => setSummary(e.target.value)}/>
          <input type="file" required accept='.jpeg,.png,.jpg' onChange={(e) => setFile(e.target.files)}/>
          <ReactQuill value={content} modules={modules} formats={formats} id='quill' onChange={(newValue) => setContent(newValue)}/>
          <button type='submit' id='submitCreate'>Edit</button>
        </form>
      </div>
    )
}

export default EditPost