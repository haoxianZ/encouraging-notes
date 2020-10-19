import React, { useContext } from 'react'
import context from '../context';
import config from '../config';
import { Link } from 'react-router-dom';

export default function EditNote(props){
    const values = useContext(context)
    const{notes=[]}= values
    const note_id=parseFloat(props.match.params.note_id) 
    //an link to go back to user profile 
    const handleEdit = e => {
        e.preventDefault()
        const note = notes.find(note=>note.id === note_id)
        const updateNote = {
          content: e.target['updateNote'].value,
          user_id: note.user_id
        }
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
            return res.json()
          })
          .then(note => {
            values.updateNote(note)
            props.history.push(`/users/${props.match.params.user_id}`)
            })
          .catch(error => {
            console.error({ error })
          })
          alert("Updated")
          
      }
      const currentNote=values.notes.find(note=>note.id=== note_id)
      const url = `/users/${props.match.params.user_id}`
    return(
        <form onSubmit={handleEdit}>
        <label htmlFor='updateNote'>Change "{currentNote.content}" to:</label>
        <input type='text' id='updateNote' name='updateNote' required></input>
        <button type='submit'>Update Note</button>
        <Link to={url} style={{ textDecoration: 'none' }}><button>Cancel</button></Link>
        </form>
    )
}