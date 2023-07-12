import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './RootLayout';
import Login from './Login';
import Register from './Register';
import Create from './Create';
import SinglePost from './SinglePost';
import MyPosts from './MyPosts';
import EditPost from './EditPost';
import Footer from './Footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<RootLayout/>}/>
          <Route path='/home' element={<RootLayout/>}/>
          <Route path='/posts' element={<RootLayout/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/post/:id' element={<SinglePost/>}/>
          <Route path='/my' element={<MyPosts/>}/>
          <Route path='/edit/:id' element={<EditPost/>}/>
          <Route path='delete/:id' element={<RootLayout/>}/>
        </Route>    
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
