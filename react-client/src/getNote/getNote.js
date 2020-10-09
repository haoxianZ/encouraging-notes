import React, { useContext, useRef } from 'react'
import context from '../context';
import { FcLike, FcDisapprove } from "react-icons/fc";
import config from '../config';

export default function GetNote (props){
 
    const values = useContext(context);
 
    const notes = values.notes.filter(note=>note.user_id !== props.user_id)
    const selectNote = notes[Math.floor(Math.random() * notes.length)];
    const likesCount = selectNote.liked +1;
    let btn = useRef();
    const handleLikes = e=>{
        e.preventDefault()
        if(btn.current){
            btn.current.setAttribute("disabled", "disabled")
        }
        const updateNote = {
            content: selectNote.content,
            user_id: selectNote.user_id,
            liked: likesCount
          }
          console.log(updateNote,selectNote.id)
          fetch(`${config.API_ENDPOINT}/notes/${selectNote.id}`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(updateNote),
          }).then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          }).then(res=>{console.log(res)})

    }
    const handleReport=e=>{

    }
        return(
            //fliter note from context for user-id, randomly select one 
            <div>
                <p>
                {selectNote.content}
                </p>
                <button ref={btn} onClick={handleLikes}><FcLike/></button>
            </div>
            
        )
    
}