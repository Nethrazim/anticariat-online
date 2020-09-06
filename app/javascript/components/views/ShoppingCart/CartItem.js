import React from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {closeCart, deleteFromShoppingCart} from '../../../js/actions/index';
import './CartItem.css';

function mapDispatchToProps(dispatch)
{
    return {
        closeCart: () => {
            dispatch(closeCart());
        },
        deleteFromCart: (payload) => {
            dispatch(deleteFromShoppingCart(payload))
        }
    }
};


class CartItem extends React.Component
{
    closeCart = (event) => {
        this.props.closeCart();
    }

    deleteItem = (event) => 
    {
        this.props.deleteFromCart(this.props.book.id);
    }
    
    render()
    {
        return(
            <div className="cart_item">
                <hr/>
                <img width="50" src={this.props.book.base64} alt="cart item"/>
                <Link to={"/books/"+this.props.book.id} onClick={this.closeCart}>
                    <span className="item">{this.props.book.title}</span>
                </Link>
                <span className="item">x1</span>
                <span className="item price">{this.props.book.price}LEI</span>
                <span className="item" onClick={this.deleteItem}>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                    </svg>
                </span>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(CartItem);