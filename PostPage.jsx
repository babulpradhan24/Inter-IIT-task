import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Comment from '../components/Comment'
import CommentBox from '../components/CommentBox'

export default function PostPage(){
  const [comments, setComments] = useState([])
  const [flat, setFlat] = useState([])
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  useEffect(()=>{ fetchComments() }, [])

  async function fetchComments(){
    const res = await axios.get('http://localhost:4000/api/comments')
    setFlat(res.data)
    setComments(buildTree(res.data))
  }

  function buildTree(list){
    const map = {};
    list.forEach(c=> map[c._id]= {...c, children: []})
    const roots = [];
    list.forEach(c=>{
      if(c.parent) map[c.parent]?.children.push(map[c._id])
      else roots.push(map[c._id])
    })
    return roots
  }

  const addComment = async (text, parent=null)=>{
    const res = await axios.post('http://localhost:4000/api/comments',{ text, parent, userId: user._id })
    fetchComments()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">Sample Post Title</h1>
        <p className="mb-4 text-gray-600">This is a placeholder post used to demo nested comments.</p>

        <div className="mt-6">
          <CommentBox onSubmit={addComment} />
          <div className="mt-4 space-y-3">
            {comments.map(c=> <Comment key={c._id} data={c} onReply={addComment} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
