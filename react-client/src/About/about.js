import React from 'react';
import {Link} from 'react-router-dom';
import './about.css';
export default function About(){
    return(
        <div>
            <Link to='/' style={{ textDecoration: 'none' }}><header>Encouragement Bank</header></Link>
            <h3>What is this?</h3>
            <p>This is a place for you to write an encouraging note for somebody else, and in exhcnage receive one</p>
            <h3>How do I use this?</h3>
            <p>Sign up or Log in with a username and email</p>
            <p>Then you can write a note and click the exchange button to exchange one</p>
        </div>
    )
}