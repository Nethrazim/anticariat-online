import React from 'react';
import {Link} from 'react-router-dom';

import './CategoryLink.css';

class CategoryLink extends React.Component
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
            <div className="category_link">
                <Link to={"/" + this.link}>
                    <span className="link_color">{this.link_text}</span>
                </Link>
            </div>
        );
    }
}

export default CategoryLink;