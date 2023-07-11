import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './RootLayout';
import Login from './Login';
import Register from './Register';
import Create from './Create';

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
        </Route>    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
