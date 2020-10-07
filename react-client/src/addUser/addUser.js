import React, { useContext } from 'react'
import context from '../context'
import config from '../config'
export default function AddUser (props){
    // sign up or login with email and username
    const values = useContext(context);
    const handleAdd = e => {
        e.preventDefault()
        const { users=[] } = values
        const newUser = {
          username: e.target['username'].value,
         email: e.target['username'].value
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
            this.props.history.push(`/users/${user.id}`)
            })
          .catch(error => {
            console.error({ error })
          })
          
      }
    return(
      <div>
         <h2>
                    
                  <Link to='/'>Encouragement Bank</Link>
      </h2>
      <form onSubmit={handleAdd}>
      <label htmlFor='username'>Username:</label>
      <input type='text' id='username' name='username' required></input>
      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' name='email' required></input>
      <button type='submit'>Sign up</button>
      </form>
      </div>
     
    )
}