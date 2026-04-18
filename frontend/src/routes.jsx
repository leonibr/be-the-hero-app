import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Logon from './pages/Logon'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'

function RegisterWrapper() {
  const navigate = useNavigate()
  return <Register navigate={navigate} />
}

function LogonWrapper() {
  const navigate = useNavigate()
  return <Logon navigate={navigate} />
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogonWrapper />} />
        <Route path="/register" element={<RegisterWrapper />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/incidents/new" element={<NewIncident />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}