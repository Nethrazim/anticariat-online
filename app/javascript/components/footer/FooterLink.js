import React from 'react';
import {Link} from 'react-router-dom';

class FooterLink extends React.Component
{
    constructor(props)
    {
        super(props);
        this.link_text = props.link_text;
    }

    render()
    {
        return(
            <div className="footer_link">
                <Link to="#">
                    <span>{this.link_text}</span>
                </Link>
            </div>
        );
    }
}

export default FooterLink;