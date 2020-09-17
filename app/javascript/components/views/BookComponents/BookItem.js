import React from 'react';

import './BookItem.css';
import history from '../../../js/history/history';
import {Link} from 'react-router-dom';

class BookItem extends React.Component
{
    render()
    {
        return(
            <Link to={"/books/" + this.props.book.id}>
                <div className="book_item">
                    {this.props.book.price_reduction && <div className="reduction_box"><span>-{this.props.book.price_reduction.percent_reduction}%</span></div>}
                    <ul className="book_item_details_list">
                        <li>
                            <img src={this.props.book.base64} alt=""/>
                        </li>
                        <li>
                            <div className="container-fluid d-flex justfiy-content-center">
                                <span className="title">{this.props.book.title}</span>
                            </div>
                        </li>
                        <li>
                            <div className="container-fluid d-flex justfiy-content-center">
                                <span className="author">{this.props.book.author}</span>
                            </div>
                        </li>
                        <li>
                            <div className="container-fluid d-flex justfiy-content-center">
                                <span className="author">{this.props.book.year}</span>
                            </div>
                        </li>
                        <li>
                            <div className="container-fluid d-flex justfiy-content-center">
                                {
                                    this.props.book.price_reduction && 
                                    <div>
                                        <span className="old_price">Pret Vechi:</span><span className="old_price">{this.props.book.price}</span><span className="old_currency">LEI</span><br/>
                                        <span className="price">Pret Nou:</span><span className="price">{(this.props.book.price - ((this.props.book.price_reduction.percent_reduction * this.props.book.price) / 100)).toFixed(2)}</span><span className="currency">LEI</span>
                                    </div> 
                                }
                                {
                                    !this.props.book.price_reduction && 
                                    <div>
                                        <span className="price">Pret:</span><span className="price">{this.props.book.price}</span><span className="currency">LEI</span>
                                    </div>
                                }
                                
                            </div>
                        </li>
                    </ul>
                </div>
            </Link>
        );
    }
}


export default BookItem;