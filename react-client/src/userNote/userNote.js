import React from 'react'
import { Link } from 'react-router-dom'
import context from '../context'
import config from '../config'
import { FcLike } from "react-icons/fc";
import './userNote.css';
export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = context;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote()
      })
      .catch(error => {
        console.error({ error })
      })
      
  }
  
//to do: add an confirm alert when they are about to delete
  render() {
    const { content, id, user_id, numLike } = this.props
    return (
      <div className='Note'>
        <p className='content'>
            {content}
            <br />
           
        </p> 
        <p>This Note is <FcLike /> {numLike} times!</p>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          Remove
        </button>
      
         <button className='Note_edit'
       ><Link to={`/users/${user_id}/notes/${id}/edit`}
         style={{ textDecoration: 'none' }} className='button'> Edit</Link></button>
       
      </div>
    )
  }
}
