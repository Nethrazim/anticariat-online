import React from 'react';
import {Link} from 'react-router-dom';

import './ContactBtnBox.css'

class ContactBtBox extends React.Component
{
    render() {
        return(
        <div className="contact_btn_box">
            <ul>
                <li>
                    <Link to="/contact" rel="nofollow">
                    <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-telephone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z"/>
                    </svg>
                    </Link>    
                </li>
                <li>
                    <Link to="/contact">
                        <span>Contact</span>
                    </Link>
                </li>
            </ul>
        </div>
        );
    }
}

export default ContactBtBox;