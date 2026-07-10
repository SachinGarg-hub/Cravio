import React from 'react'

import './App.css'
import './styles/theme.css'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'

function App() {


  return (
    <>
      <Toaster position="top-center" />
      <AppRoutes />
    </>
  )
}

export default App
