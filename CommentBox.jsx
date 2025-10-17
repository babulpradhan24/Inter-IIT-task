import React, {useState} from 'react'

export default function CommentBox({ onSubmit, small }){
  const [text, setText] = useState('')
  return (
    <div className={`${small? 'mt-2':'mt-0'}`}>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={small?2:4} className="w-full p-2 border rounded" placeholder="Write a comment..."></textarea>
      <div className="flex justify-end mt-2">
        <button className="px-3 py-1 bg-gray-200 rounded mr-2" onClick={()=>{ setText('') }}>Cancel</button>
        <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={()=>{ if(text.trim()){ onSubmit(text.trim()); setText('') }}}>Post</button>
      </div>
    </div>
  )
}
