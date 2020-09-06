import React from 'react';
import {Link} from 'react-router-dom';

import './Logo.css';
import logo from '../../components/assets/images/anticariat_logo.jpg';

class Logo extends React.Component
{
    render()
    {
        return(
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="anticariat"/>
                </Link>
            </div>
        );
    }
}

export default Logo;