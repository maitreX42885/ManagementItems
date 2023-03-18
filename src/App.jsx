import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { DashProvider } from './components/DashboardComponent/ValDashboard'


import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'


function App() {
  
  // hi lab
  return (
    <div className="App">
      <DashProvider>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          {/* <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/> */}
          {/* <Route path='/dashboard' element={<DashBoard />}/> */}
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </DashProvider>
      
    </div>
  )
}

export default App
