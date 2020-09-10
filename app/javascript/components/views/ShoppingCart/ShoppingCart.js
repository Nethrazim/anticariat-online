import React from 'react';
import CartItem from './CartItem';

import './ShoppingCart.css';
import {connect} from 'react-redux';
import {closeCart} from '../../../js/actions/index';
import history from '../../../js/history/history';

function mapStateToProps(state) {
    return {
        cart_items: state.shoppingCart.items
    };
}
function mapDispatchToProps(dispatch)
{
    return {
        closeCart: () => {
            dispatch(closeCart());
        }
    };
}

class ShoppingCart extends React.Component
{

    closeCart = () => {
        this.props.closeCart();
        history.push("/checkout");
    }
    render()
    {   
        return(
            <div className="shopping_cart_box">
                <button className="viewDetails" onClick={this.closeCart.bind(this)}>
                    <span>Vezi detalii cos</span>
                </button>
                <ul className="cart_items">
                    {
                        this.props.cart_items.map((item, i)=>{
                        return <li key={i}><CartItem book={item}/></li>
                        })
                    }
                </ul>
            </div>
        )
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);