import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './AccountBtnBox.css'
import {connect} from 'react-redux';
import history from '../../js/history/history';

const mapStateToProps = function(state)
{
    return {
        isLoggedIn: state.account.isLoggedIn,
        username: state.account.user.username
    }
}

class AccountBtnBox extends React.Component
{
    state = {
        isMenuOpen: false,
        anchorEl: null,
    };

    handleClose = () => { this.setState(Object.assign({}, this.state, {isMenuOpen: false})); }
    
    openMenu = (event) => { 
        this.setState(Object.assign({}, this.state, {isMenuOpen: true, anchorEl: event.currentTarget}));
    };

    handleCreateAccount = () => {
        this.setState(Object.assign({}, this.state, {isMenuOpen: false, anchorEl: null}), () => {
            history.push("/account");    
        }); 
    };
    
    handleEditAccount = () => {
        this.setState(Object.assign({}, this.state, {isMenuOpen: false, anchorEl: null}), () => {
            history.push("/edit_account");    
        }); 
    };

    handleLogin = () => {
        this.setState(Object.assign({}, this.state, {isMenuOpen: false, anchorEl: null}), () => {
            history.push("/login");            
        }); 
    }

    render() {
        return(
        <div className="account_btn_box">
            <ul onClick={this.openMenu.bind(this)} aria-controls="account_menu">
                <li>
                <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
                </li>
                <li>
                    <div>
                        <span className="logged_in_username">Cont</span>
                    </div>
                </li>
            </ul>
            <Menu
                id="account_menu"
                anchorEl={this.state.anchorEl}
                open={this.state.isMenuOpen}
                onClose ={this.handleClose.bind(this)}
            >
                 {
                        this.props.isLoggedIn ? 
                        <div>
                            <MenuItem onClick={this.handleEditAccount.bind(this)}>
                                <div>
                                    <span>Editeaza Cont</span>
                                </div>
                            </MenuItem>
                        </div>
                        :
                        <div>
                            <MenuItem onClick={this.handleCreateAccount.bind(this)}>
                                <div>
                                    <span>Creeaza cont</span>
                                </div>
                            </MenuItem>
                            <MenuItem onClick={this.handleLogin.bind(this)}>
                                <span>Autentifica-te</span>
                            </MenuItem>
                        </div>
                    }
            </Menu>
        </div>
        );
    }
}

export default connect(mapStateToProps, null)(AccountBtnBox);