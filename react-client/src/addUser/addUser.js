import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import context from '../context'
import config from '../config';
import './addUser.css'
export default function AddUser (props){
    // sign up or login with email and username
    const values = useContext(context);
    const handleAdd = e => {
        e.preventDefault()
        const { users=[] } = values
        const newUser = {
          username: e.target['username'].value,
         email: e.target['email'].value
        }
        fetch(`${config.API_ENDPOINT}/users`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newUser),
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(user => {
             values.addUser(user)
             console.log(props)
            props.history.push(`/users/${user.id}`)
            })
          .catch(error => {
            console.error({ error })
          })
          
      }
    return(
      <div>
       
      <Link to='/' style={{ textDecoration: 'none' }}><h2>Encouragement Bank</h2></Link>
      
      <form onSubmit={handleAdd} className='login'>
      <label htmlFor='username'>Username:</label>
      <input type='text' id='username' name='username' required></input>
      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' name='email' required></input>
      <button type='submit'>Sign up</button>
      </form>
      </div>
     
    )
}