import React from 'react';
import {Link} from 'react-router-dom';

import './TopLink.css';

class TopLink extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.link_text = props.link_text;
        this.link = props.link;
    }

    render()
    {
        return(
            <div className="top_link_box">
                <Link to={"/" + this.link}>
                    <span>{this.link_text}</span>
                </Link>
            </div>
        );
    }
}

export default TopLink;