import React from 'react'

export default function UpvoteButton({ count, onClick }){
  return (
    <button className="text-sm text-gray-600 flex items-center space-x-1" onClick={onClick}>
      <span>▲</span>
      <span>{count||0}</span>
    </button>
  )
}
