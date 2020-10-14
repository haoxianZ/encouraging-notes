import React, { useContext, useRef, useState } from 'react'
import context from '../context';
import { FcLike, FcDisapprove } from "react-icons/fc";
import config from '../config';
import emailjs from 'emailjs-com';
import './getNote.css'
import { Link } from 'react-router-dom';
export default function GetNote (props){
    const [disable, setDisable] = useState(false);
    const [disable1, setDisable1] = useState(false);
    
    const values = useContext(context);
    
    const notes = values.notes.filter(note=>note.user_id !== props.user_id)
    console.log(props.user_id, values.notes)
    
    //trying to have the note not change or refresh when user click report or like btn
   
    const selectNote = notes[Math.floor(Math.random() * notes.length)];
    
    const likesCount = selectNote.liked +1;
    let btnReport = useRef();
    let formRef= useRef();
    function handleLikes (e){
        e.preventDefault()
        setDisable(true)
        
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
    function handleReport(e) {
        e.preventDefault();
        setDisable1(true)
       
        const templateParams={
            from_name: "Note" + selectNote.id
        }
          emailjs.send("service_8mq29g9", "template_87qp57h", e.target , "user_Qof97B4UQhYhPaiNqMWOx")
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
        
      }
      
        return(
            //fliter note from context for user-id, randomly select one 
            <div className='note'>
              <div className='content'>
                  <nav>Note {selectNote.id}</nav>
                                  <p>
                                  {selectNote.content}
                                  
                                  </p>
              </div>
                
                <button disabled={disable} onClick={handleLikes} ><FcLike/></button>
                
                <Link to='/contact' ><button>Got issue about the Note? Report it with its id</button></Link>

                  
            </div>
            
        )
    
}