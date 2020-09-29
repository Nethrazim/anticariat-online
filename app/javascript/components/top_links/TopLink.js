import React from 'react';
import {Link} from 'react-router-dom';

import './TopLink.css';

class TopLink extends React.Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            link_text: this.props.link_text,
            link: this.props.link
        };
    }

    render()
    {
        return(
            <div className="top_link_box">
                <Link to={"/" + this.state.link}>
                    <span className="link_color">{this.state.link_text}</span>
                </Link>
            </div>
        );
    }
}

export default TopLink;