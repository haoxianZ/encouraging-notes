import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import config from '../config';
import context from '../context';
import './homePage.css';
export default class HomePage extends Component{
  static contextType = context

    handleSubmit = e => {
        e.preventDefault()
        const user = {
          username: e.target['username'].value,
          email: e.target['email'].value
        }
        fetch(`${config.API_ENDPOINT}/users?username=${user.username}&email=${user.email}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(user => {
            this.props.history.push(`/users/${user.id}`)
          })
          .catch(error => {
            this.context.toggleError(error.error.message)
            console.error({ error })
          })
      }
    render(){
        return(
            <div className='mainPage'>
                <header>
                    Encouragement Bank
                </header>
                <main>
                  <form onSubmit={this.handleSubmit} className='login'>
                    <div className='userbox'>
                    <input placeholder='Username' type='test' id='username' name='username' required>
                    </input>
                    <input placeholder='Email' type='email' id='email' name='email' required></input>
                    </div>
                    <div className='buttons'>
                      <button type='submit'>
                        Log in
                    </button>
                    <Link to='/add-user' style={{ textDecoration: 'none' }}>
                        <button>
                            Sign up
                        </button>
                    </Link>
                    </div>
                  </form>
                </main>
                <footer>
                  { this.context.error &&
             <h3 className="error"> { this.context.error } </h3> }
                </footer>
                
            </div>
        )
    }
}