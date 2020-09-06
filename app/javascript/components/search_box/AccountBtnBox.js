import React from 'react';
import {Link} from 'react-router-dom';


import './AccountBtnBox.css'
import {connect} from 'react-redux';

const mapStateToProps = function(state)
{
    return {
        isLoggedIn: state.account.isLoggedIn,
        username: state.account.username
    }
}

class AccountBtnBox extends React.Component
{
    render() {
        return(
        <div className="account_btn_box">
            <ul>
                <li>
                    <Link to="/account" rel="nofollow">
                        <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-people-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                        </svg> 
                    </Link>    
                </li>
                <li>
                    {
                        this.props.isLoggedIn
                        ? 
                        <div>
                            <span className="logged_in_username">{this.props.username}</span>/
                            <Link to="/edit_account">
                                <span>Edit Account</span>
                            </Link>
                        </div>
                        :
                        <div>
                            <Link to="/account">
                                <span>Creeaza cont</span>
                            </Link>/
                            <Link to="/login">
                                <span>Login</span>
                            </Link>
                        </div>
                    }
                </li>
            </ul>
        </div>
        );
    }
}

export default connect(mapStateToProps, null)(AccountBtnBox);