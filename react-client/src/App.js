import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import HomePage from './homePage';
import UserPage from './userPage';
import Context from './context';
import config from './config';
import EditNote from './editNote';
import update from 'react-addons-update';
import AddUser from './addUser';
class App extends Component{
  state = {
    notes:[],
    users:[],
    show: false,
    error:false
  }
  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/users`)
    ])
      .then(([notesRes, usersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!usersRes.ok)
          return usersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          usersRes.json(),
        ])
      })
      .then(([notes, users]) => {
        this.setState({ notes, users })
      })
      .catch(error => {
        console.error({ error })
      })
  }
  handleAddUser = user => {
    this.setState({
      users: [
        ...this.state.users,
        user
      ]
    })
  }
  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }
handleToggle = (showState)=>{
  this.setState({
    show: !showState
  })
}
toggleError = (message)=>{
  this.setState({
    error: message
  })
}
handleUpdateNote = (updateNote)=>{
  const notes= this.state.notes
  const noteIndex = notes.findIndex(note=>note.id ===updateNote.id)
  
  this.setState(update(this.state,{
    notes:{[noteIndex]:{$set: updateNote}}
  }))
}
  render(){
    const contextValue = {
      notes: this.state.notes,
      users: this.state.users,
      show:this.state.show,
      error:this.state.error,
      addUser:this.handleAddUser,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
      handleToggle:this.handleToggle,
      toggleError: this.toggleError,
      updateNote:this.handleUpdateNote
    }
    
  return(
    <Context.Provider value={contextValue}>
    <div className="App">
      <Switch>
      <Route
        path='/add-user'
        component={AddUser}
      />
        <Route
        path='/users/:user_id'
        component={UserPage}
      />
    <Route
        path='/'
        component={HomePage}
      />
      </Switch>
    <Route path='/users/:user_id/notes/:note_id/edit'
    component={EditNote}/>
    </div>
  </Context.Provider>
  )

  }
}

export default App;
