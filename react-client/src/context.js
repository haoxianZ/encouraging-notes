import React from 'react'

export default React.createContext({
  notes: [],
  user: [],
  error: null,
  show:false,
  Login:null,
  addUser: () => {},
  addNote: () => {},
  deleteNote: () => {},
  updateNote:()=>{},
  updateUser:()=>{},
  validateUser:()=>{},
  handleToggle:()=>{},
  toggleError:()=>{},
  handleLogin:()=>{}
})
