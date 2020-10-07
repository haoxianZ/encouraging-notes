import React, { Component, useContext } from 'react'
import context from '../context';
import config from '../config';

export default function EditNote(props){
    const values = useContext(context);
    const note_id=props.match.params.note_id
    //an link to go back to user profile 
    const handleEdit = e => {
        e.preventDefault()
        const updateNote = {
          content: e.target['updateNote'].value,
          user_id: props.match.params.user_id
        }
        console.log(updateNote.user_id)
        fetch(`${config.API_ENDPOINT}/notes/${note_id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(updateNote),
        })
          .then(res => {
            if (!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            console.log(res)
            return res.json()
          })
          .then(note => {
              console.log(note)
            values.updateNote(note)
            props.history.push(`/users/${note.user_id}`)
            })
          .catch(error => {
            console.error({ error })
          })
          
      } 
      console.log(values.notes)
      const currentNote=values.notes.find(note=>note.id== note_id)
    return(
        <form onSubmit={handleEdit}>
        <label htmlFor='updateNote'>Change "{currentNote.content}" to:</label>
        <input type='text' id='updateNote' name='updateNote' required></input>
        <button type='submit'>Update Note</button>
        </form>
    )
}