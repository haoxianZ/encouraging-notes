import React from 'react';
import {Link} from 'react-router-dom'
import emailjs from 'emailjs-com';
import './contact.css'
export default function Contact(){
    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_8mq29g9', 'template_u2qcn7p', e.target, 'user_Qof97B4UQhYhPaiNqMWOx')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      }
    return(
        <div>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <header>Encouragement Bank</header>
            </Link>
            <form className='contactForm' onSubmit={sendEmail}>
            <label htmlFor='subject' >Subject: </label>
            <br/>
            <input name='subject'/>
            <br/>
            <label htmlFor='message' >Message: </label>
            <br/>
            <textarea name='message' rows="10" cols="70" required>

            </textarea>
            <br/>
            <label htmlFor='from_name' >Your Email: </label>
            <br/>
            <input type='email' name='from_name'/>
            <input type="submit" value="Send" />

        </form>
        </div>
        
    )
}