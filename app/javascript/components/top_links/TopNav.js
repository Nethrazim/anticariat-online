import React from 'react';

import './TopNav.css';

import TopLink from './TopLink';

class TopNav extends React.Component
{
    render() {
        return(
            <div className="row d-flex justify-content-center top_nav_box">
                <ul>
                    <li><TopLink link_text="Cumparam" link="cumparam"/></li>
                    <li><TopLink link_text="Noutati" link="noutati"/></li>
                    <li><TopLink link_text="Reduceri" link="reduceri"/></li>
                </ul>
            </div>
        )
    }
}

export default TopNav;