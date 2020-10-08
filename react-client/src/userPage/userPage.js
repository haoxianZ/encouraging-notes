import React, { Component } from 'react'
import context from '../context';
import config from '../config';
import GetNote from '../getNote';
import Note from '../userNote/userNote';
import { Link } from 'react-router-dom';
export default class UserPage extends Component{
    static defaultProps = {
        match: {
          params: {}
        }
      }
    static contextType = context
    handleDeleteNote = () => {
        this.props.history.push(`/users/${this.props.match.params.user_id}`)
      }
    handleSubmit = e => {
        e.preventDefault()
        const { users=[] } = this.context
        const  user_id  = this.props.match.params.user_id
        const user = users.find(user=>user.id === user_id)
        const newNote = {
          content: e.target['newNote'].value,
          user_id: user.serialid
        }
        console.log(newNote.user_id)
        fetch(`${config.API_ENDPOINT}/notes`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newNote),
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(note => {
            this.context.addNote(note)
            this.props.history.push(`/users/${user_id}`)
            })
          .catch(error => {
            console.error({ error })
          })
          
      }
      showNewNote = ()=>{
        const showState = this.context.show
        console.log(showState)
        this.context.handleToggle(showState)
        console.log(this.context.show)
      }
    render(){
        const { notes=[], users=[] } = this.context
        console.log(notes, users)
        const  user_id  = this.props.match.params.user_id
        const user = users.find(user=>user.id === user_id)
        console.log(user,user_id)
        const userNotes = notes.filter(note=>note.user_id === user.serialid)
        console.log(userNotes)
        const renderContent = userNotes.map((note,i)=><Note key={i} content={note.content}
        id={note.id} user_id={user_id} onDeleteNote={this.handleDeleteNote}/> )
        return(
            <section className='userPage'>
                <h2>
                    
                  <Link to='/'>Encouragement Bank</Link>
                </h2>
                <nav>
                    <h3>Notes that I owned</h3>
                    {renderContent}
                </nav>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='newNote'>Deposit an Encouragement</label>
                    <input type='text' id='newNote' name='newNote' required></input>
                    <button type='submit' onClick={this.showNewNote}>Exchange a Note</button>
                </form>
                {this.context.show ? <GetNote user_id={user_id}/>: null}
                
            </section>
        )
    }
}