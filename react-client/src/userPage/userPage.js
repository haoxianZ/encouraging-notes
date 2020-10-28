import React, { Component } from 'react'
import context from '../context';
import config from '../config';
import GetNote from '../getNote/getNote';
import Note from '../userNote/userNote';
import { Link } from 'react-router-dom';
import './userPage.css';
const Filter = require('bad-words'),
filter = new Filter();
filter.removeWords('hells', 'hell', 'God','gods');

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
          content: filter.clean(e.target['newNote'].value),
          user_id: user.serialid,
          liked: 0
        }
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
          document.getElementById('newNote').value='';
           const showState = this.context.show
        this.context.handleToggle(showState)
      }
      
      
    render(){
        const { notes=[], users=[] } = this.context
        const  user_id  = this.props.match.params.user_id
        const user = users.find(user=>user.id === user_id)
        const userNotes = notes.filter(note=>note.user_id === user.serialid)
        let renderContent;
        if(this.context.Login === user_id){
          const content = userNotes.map((note,i)=><Note key={i} content={note.content}
        id={note.id} user_id={user_id} numLike={note.liked} onDeleteNote={this.handleDeleteNote}/>)
          renderContent = <div>
          <nav>
            <h3>Notes that I wrote</h3>
            {content}
        </nav>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor='newNote'>Deposit an Encouragement:  </label>
            <textarea type='textarea' id='newNote' name='newNote' required></textarea>
            
            <button type='submit' className='submitBtn'>Exchange a Note</button>
        </form>
        {this.context.show ? <GetNote user_id={user.serialid} />: null}
        </div>
      }
        else{
          renderContent = <h3>You are not Log in yet</h3>
        }

        return(
            <section className='userPage'>
                
                  <Link to='/' style={{ textDecoration: 'none' }}><h2>Encouragement Bank</h2></Link>
                
                  {renderContent}
            </section>
        )
    }
}