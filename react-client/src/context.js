import React from 'react'

export default React.createContext({
  notes: [],
  user: [],
  error: null,
  show:false,
  addUser: () => {},
  addNote: () => {},
  deleteNote: () => {},
  updateNote:()=>{},
  updateUser:()=>{},
  validateUser:()=>{},
  handleToggle:()=>{},
  toggleError:()=>{}
})
