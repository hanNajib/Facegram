import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({children}) {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('facegram-username')
  return token && username ? <Outlet /> : <Navigate to='/login' /> 
}

export default ProtectedRoute