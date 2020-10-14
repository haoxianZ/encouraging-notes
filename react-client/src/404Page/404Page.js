import React from 'react';
import { Link } from 'react-router-dom';
import './404Page.css'
export default function NotFound(){
    return(
        <div>
            <Link to='/' style={{ textDecoration: 'none' }}><h2>Encouragement Bank</h2></Link>
            <h2>Nothing is here</h2>
            <p>if you are having issues, <Link to='/contact' style={{ color: 'aliceblue' }}>contact</Link> me in the contact tab on home page</p>
            
        </div>
        
    )
}