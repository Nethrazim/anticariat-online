import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {connect} from 'react-redux';
import {login} from '../../../js/actions/index';

import './LoginBox.css';

const mapStateToProps = function(state)
{
    return {
        isLoggedIn: state.account.isLoggedIn,
        loginErrors: state.account.loginErrors
    }
}

class LoginBox extends React.Component
{
    constructor(props)
    {
        super();
        this.state = {
            username: "",
            password: ""
        };
        this.validator = new SimpleReactValidator();   
    }
    
    componentDidUpdate()
    {
        if(this.props.isLoggedIn)
        {  
            this.props.history.push("/literatura");
        }
    }

    setNewState = (newState) =>
    {
        this.setState(newState);
    }

    handleChangeUsername = (event) =>
    {
        var newState = Object.assign({}, this.state)
        newState.username = event.target.value;
        this.setNewState(newState);
    }

    handleChangePassword = (event) =>
    {
        var newState = Object.assign({}, this.state);
        newState.password = event.target.value;
        this.setNewState(newState);
    }

    handleLogin = (event) =>
    {
        event.preventDefault();
        
        if(!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            this.props.login(this.state);
        }        
    }

    render()
    {
        return(
            <div className="container d-flex justify-content-center">
                <div className="login_box">
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="login_username">Nume utilizator:</label><br/>
                                        <span>{this.validator.message('username', this.state.username, 'required|min:4', { className: 'text-danger'})}</span>
                                        <input type="text" value={this.state.username} onChange={this.handleChangeUsername.bind(this)} name="login_username" placeholder="Enter a Username"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="login_password">Parola:</label><br/>
                                        <span>{this.validator.message('password', this.state.password, 'required|min:4', { className: 'text-danger'})}</span>
                                        <input type="password" value={this.state.password} onChange={this.handleChangePassword.bind(this)} name="login_password" placeholder="Enter your Password"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <button onClick={this.handleLogin.bind(this)}>LOGIN</button>
                                        </div>
                                        <br/>
                                        <ul className="login_server_errors">
                                        {
                                            this.props.loginErrors != null &&    
                                                this.props.loginErrors.map((item, i) => <li key={i} className="validation_message">{item}</li>)
                                        }
                                        </ul>
                                        <div>
                                            <span>{this.props.isLoggedIn ? 'You are logged in!': ''}</span>
                                        </div>
                                        <br/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps, {login})(LoginBox);