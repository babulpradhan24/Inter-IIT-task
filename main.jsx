import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import PostPage from './pages/PostPage'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/post" element={<PostPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
