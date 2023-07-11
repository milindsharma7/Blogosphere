import React, { useState } from 'react';
import Header from './Header';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './Create.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

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

function Create() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [file,setFile] = useState('');
  const [redirect,setRedirect] = useState(false);

  const createNewPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file',file[0]);
    const response = await fetch('http://localhost:4000/create', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
    console.log(response);
  }
  if(redirect === true){
    return(
      <Navigate to='/home'/>
    )
  }
  return (
    <div id='createDiv'>
      <Header/>
      <div id='headCreate'>Create a new Blog</div>
      <form onSubmit={createNewPost} id='createForm'>
        <input type="text" value={title} required placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" required value={summary} placeholder='Summary' onChange={(e) => setSummary(e.target.value)}/>
        <input type="file" required onChange={(e) => setFile(e.target.files)}/>
        <ReactQuill value={content} modules={modules} formats={formats} id='quill' onChange={(newValue) => setContent(newValue)}/>
        <button type='submit' id='submitCreate'>Create</button>
      </form>
    </div>
  )
}

export default Create