import React from 'react';

import './BookItem.css';
import history from '../../../js/history/history';
import {Link} from 'react-router-dom';

class BookItem extends React.Component
{
    /*handleClick = (event) =>
    {
        history.push("/books/" + this.props.id);
    }*/

    render()
    {
        return(
            <Link to={"/books/" + this.props.id}>
                <div className="book_item">
                    <ul>
                        <li>
                            <img src={this.props.base64} alt=""/>
                        </li>
                        <li>
                            <div className="container-fluid d-flex justfiy-content-center">
                                <span className="title">{this.props.title}</span>
                            </div>
                        </li>
                        <li>
                            <div className="container-fluid d-flex justfiy-content-center">
                                <span className="author">{this.props.author}</span>
                            </div>
                        </li>
                        <li>
                            <div className="container-fluid d-flex justfiy-content-center">
                                <span className="author">{this.props.year}</span>
                            </div>
                        </li>
                        <li>
                            <div className="container-fluid d-flex justfiy-content-center">
                                <span className="price">{this.props.price}</span>
                                <span className="currency">LEI</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </Link>
        );
    }
}


export default BookItem;