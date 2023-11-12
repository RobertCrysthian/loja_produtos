import { useState } from 'react';
import './App.css';

import {Route, Routes, BrowserRouter} from 'react-router-dom'
import InitialPage from './pages/initialPage';
import Header from './components/header';
import Login from './pages/Login';
import MenuNav from './components/menuNav';
import EditItens from './pages/editItens';
import HeaderAdm from './components/header_adm';
import EditUsers from './pages/editUsers';


function App() {


  return (
  <BrowserRouter>
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='/' element={<Header/>}>
        <Route path='/' element={<InitialPage/>}/>
      </Route>
      <Route path='/' element={<HeaderAdm/>}>
        <Route path='/editItens' element={<EditItens/>}/>
        <Route path='/editUsers' element={<EditUsers/>}/>
      </Route>

    </Routes>
  </BrowserRouter>
  );
}

export default App;
