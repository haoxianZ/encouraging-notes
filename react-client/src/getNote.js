import React, { Component, useContext } from 'react'
import context from './context'
export default function GetNote (props){
 
    const values = useContext(context);
 
    const notes = values.notes.filter(note=>note.user_id !== props.user_id)
    const selectNote = notes[Math.floor(Math.random() * notes.length)];

        return(
            //fliter note from context for user-id, randomly select one 
            <p>
                {selectNote.content}
            </p>
            
        )
    
}