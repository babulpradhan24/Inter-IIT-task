import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const nav = useNavigate()
  const login = async ()=>{
    try{
      const res = await axios.post('http://localhost:4000/api/auth/login',{ name, email })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      nav('/post')
    }catch(err){
      alert(err.response?.data?.error || 'login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign in</h2>
        <input className="w-full p-2 border rounded mb-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full p-2 border rounded mb-4" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="w-full py-2 bg-blue-600 text-white rounded" onClick={login}>Login</button>
      </div>
    </div>
  )
}
