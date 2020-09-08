import React from 'react';
import {Link} from 'react-router-dom';

import './Logo.css';
import logo from '../../components/assets/images/carriage-logo.png';

class Logo extends React.Component
{
    render()
    {
        return(
            <div className="logo">
               <img src={logo} alt="caravana cartilor"/><br/>
               <span>Caravana Cartilor</span>
            </div>
        );
    }
}

export default Logo;