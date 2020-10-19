import React, { useContext } from 'react'
import context from '../context';
import { FcLike } from "react-icons/fc";
import config from '../config';
import './getNote.css'
import { Link } from 'react-router-dom';
import Tooltip from "@material-ui/core/Tooltip";

export default function GetNote (props){
    const values = useContext(context);
    const notes = values.notes.filter(note=>note.user_id !== props.user_id)
    
    //trying to have the note not change or refresh when user click report or like btn
    const selectNote = notes[Math.floor(Math.random() * notes.length)];
    const likesCount = selectNote.liked +1;
    function handleLikes (e){
        e.preventDefault()
        alert("You have liked this Note!")
        const updateNote = {
            content: selectNote.content,
            user_id: selectNote.user_id,
            liked: likesCount
          }
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
          })
    }
        return(
            <div className='note'>
              <div >
                  <nav className='noteId'>Note {selectNote.id}: </nav>
                  <p className='content'> 
                    {selectNote.content}
                  </p>
              </div>
              <Tooltip title='You can Only Like once per Note!' placement="top">
                <button onClick={handleLikes}>
                  <FcLike className='heart'/>
                </button>
    
              </Tooltip>
              
              <Link to='/contact' ><button>Got issue about the Note? Report it with the Note Number</button></Link>

                  
            </div>
            
        )
    
}