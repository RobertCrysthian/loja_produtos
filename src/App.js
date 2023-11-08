import { useState } from 'react';
import './App.css';

import {Route, Routes, BrowserRouter} from 'react-router-dom'
import InitialPage from './pages/initialPage';
import Header from './components/header';
import Login from './pages/Login';
import MenuNav from './components/menuNav';
import EditItens from './pages/editItens';


function App() {


  return (
  <BrowserRouter>
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='/' element={<Header/>}>
        <Route path='/' element={<InitialPage/>}/>
      </Route>
      <Route path='/editItens' element={<EditItens/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
