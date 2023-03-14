import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'


function App() {
  
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Dashboard />} />
        {/* <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/> */}
        {/* <Route path='/dashboard' element={<DashBoard />}/> */}
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </div>
  )
}

export default App
