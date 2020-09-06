import React from 'react';
import {Link} from 'react-router-dom';
import './CartBtnBox.css';
import Modal from '@material-ui/core/Modal';
import ShoppingCart from '../views/ShoppingCart/ShoppingCart';

import {connect}  from 'react-redux';
import {openCart, closeCart} from '../../js/actions/index';

function mapStateToProps(state)
{
    return {
        isCartOpen: state.shoppingCart.isOpen
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        closeCart: () => dispatch(closeCart()),
        openCart: () => dispatch(openCart())
    }
}

class CartBtnBox extends React.Component
{
    openShoppingCart = (event) => 
    {
        event.preventDefault();
        this.props.openCart();
    }

    handleCloseShoppingCart = (event) => 
    {
       this.props.closeCart();
    }

    render()
    {
        return(
            <div className="cart_btn_box">
                <ul>
                    <li>
                        <Link to="/#" onClick={this.openShoppingCart}>
                        <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-cart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                        </svg>   
                        </Link>    
                    </li>
                    <li>
                        <Link to="/#" onClick={this.openShoppingCart}>                            
                            <span>Cart</span>
                        </Link>
                    </li>
                </ul>
                <Modal
                    open={this.props.isCartOpen}
                    onClose={this.handleCloseShoppingCart}
                    aria-labelledby="shopping-cart"
                    aria-describedby="shopping-cart"
                    >
                        <div className="shop_cart_wrapper">
                            <ShoppingCart />
                        </div>
                </Modal>
            </div>
        );
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(CartBtnBox);