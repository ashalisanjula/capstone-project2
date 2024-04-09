import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../Pages/Home';
import About from '../Pages/About';
import Support from '../Pages/Support';
import Contact from '../Pages/Contact';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Recent_Workplaces from '../Pages/Recent_Workplaces';
import Request from '../Pages/Request-Page';
import Response from '../Pages/Response-Page';
import My_Work from '../Pages/My-Work';

const Routers = () => {
  return (
    
    <Routes >
        <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/support' element={<Support/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/recent_workplaces' element={<Recent_Workplaces/>} />
        <Route path='/my_work' element={<My_Work/>} />
        <Route path='/collection_overview' element={<My_Work/>} />
        <Route path='/request' element={<Request/>} />
        <Route path='/response' element={<Response/>} />
        <Route path='/workspace' element={<Recent_Workplaces/>} />
        <Route path='/pluse' element={<My_Work/>} />
    </Routes>
  )
}

export default Routers;