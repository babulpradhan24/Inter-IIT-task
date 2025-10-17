import React, {useState} from 'react'
import UpvoteButton from './UpvoteButton'
import CommentBox from './CommentBox'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

export default function Comment({ data, onReply, level=0 }){
  const [open, setOpen] = useState(true)
  const [replying, setReplying] = useState(false)

  const handleUpvote = async ()=>{
    await axios.post(`http://localhost:4000/api/comments/${data._id}/upvote`)
    window.location.reload()
  }

  return (
    <div className={"pl-"+Math.min(level*4,24)+" border-l "+(level>0? 'ml-3':'')}>
      <div className="flex items-start space-x-3">
        <img src={data.user?.avatar} alt="avatar" className="w-9 h-9 rounded" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{data.user?.name}</div>
              <div className="text-xs text-gray-500">{new Date(data.created_at).toLocaleString()}</div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={()=>setOpen(o=>!o)} className="text-sm text-gray-500">{open? 'Collapse':'Open'}</button>
              <button onClick={()=>setReplying(r=>!r)} className="text-sm text-gray-500">Reply</button>
              <UpvoteButton count={data.upvotes} onClick={handleUpvote} />
            </div>
          </div>
          <div className="mt-2">{data.text}</div>
          <AnimatePresence>
            {replying && (
              <motion.div initial={{opacity:0, y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}}>
                <CommentBox onSubmit={(text)=>{ onReply(text, data._id); setReplying(false)}} small />
              </motion.div>
            )}
          </AnimatePresence>

          {open && data.children?.length>0 && (
            <div className="mt-3 space-y-3">
              {data.children.map(child=> <Comment key={child._id} data={child} onReply={onReply} level={level+1} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
