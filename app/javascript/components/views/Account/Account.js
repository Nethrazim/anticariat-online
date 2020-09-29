import React from 'react';
import { connect } from 'react-redux';
import { createAccount, serverError } from '../../../js/actions/index'
import SimpleReactValidator from 'simple-react-validator';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import './Account.css';

const mapStateToProps = function(state)
{
    return {
        newAccountCreatedErrors: state.account.newAccountCreatedErrors,
        newAccountCreated: state.account.newAccountCreated
    }
}

const mapDispatchToProps = function(dispatch)
{
    return {
        createAccount: (payload) => {
            dispatch(createAccount(payload));
        },

        serverError: (payload) => {
            dispatch(serverError(payload));
        }
    }
}
class CreateAccount extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            confirm_password:'',
            newAccountCreatedErrors: this.props.newAccountCreatedErrors,
            isSnackbarOpened: false
        };
    
    }
    
    validator = new SimpleReactValidator();
    
    
    handleChangeUsername = (event) =>
    {
        this.setState(Object.assign({}, this.state, {username: event.target.value}));
    }

    handleChangeFirstName = (event) => {
        this.setState(Object.assign({}, this.state, {firstName: event.target.value}));
    }
    
    handleChangeLastName = (event) => {
        this.setState(Object.assign({}, this.state, {lastName: event.target.value}));
    }

    handleChangePhone = (event) => {
        this.setState(Object.assign({}, this.state, {phone: event.target.value}));
    }

    handleChangeEmail = (event) =>
    {
        this.setState(Object.assign({}, this.state, {email: event.target.value}));
    }
    
    handleChangePassword = (event) =>
    {
        this.setState(Object.assign({}, this.state, {password: event.target.value}));
    }

    handleChangeCPassword = (event) =>
    {
        this.setState(Object.assign({}, this.state, {confirm_password: event.target.value}));
    }

    handleCreateAccount = (event) =>
    {
        event.preventDefault();
        this.setState(Object.assign({}, this.state, {newAccountCreatedErrors: []}));

        if(!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            this.createAccount(this.state);
        }
    }

    createAccount = (payload) => {
        var _this = this;
        var message = {
            username: payload.username,
            first_name: payload.firstName,
            last_name: payload.lastName,
            phone: payload.phone,
            email: payload.email,
            password: payload.password
        };

        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        var request_options = {
            method: 'POST',
            body: JSON.stringify(message),
            cache: 'no-cache',
            headers: {
                'Content-Type':'application/json',
                'X-CSRF-token': csrf
            }
        };

        fetch("/users", request_options)
        .then(response => response.json())
        .then(json => {
            _this.props.createAccount(json);
            var newState = Object.assign({}, _this.state);
            newState.isSnackbarOpened = true;            
            if(json.errors)
            {
                newState.newAccountCreatedErrors = json.errors;    
            }
            else 
            {
                newState.newAccountCreatedErrors = null;
            }
            _this.setState(newState);
        })
        .catch((error) => {
            _this.props.serverError(error);
            console.error('Error:', error);
        })
    }

    onSnackbarClose = (event) => {
        this.setState(Object.assign({}, this.state, {isSnackbarOpened: false}));
    }
    
    render()
    {
        return(
            <div className="container d-flex justify-content-center">
                <div className="create_account_box">
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="create_account_username">Nume utilizator:</label><br/>
                                        <span>{this.validator.message('username', this.state.username, 'required|min:4', { className: 'text-danger'})}</span>
                                        <input type="text" value={this.state.username} onChange={this.handleChangeUsername.bind(this)} name="create_account_username" placeholder="Enter a Username"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="create_account_first_name">Prenume:</label><br/>
                                        <span>{this.validator.message('first_name', this.state.firstName, 'required|min:4', { className: 'text-danger'})}</span>
                                        <input type="text" value={this.state.firstName} onChange={this.handleChangeFirstName.bind(this)} name="create_account_first_name" placeholder="Enter your Firstname"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="create_account_last_name">Nume:</label><br/>
                                        <span>{this.validator.message('lastName', this.state.lastName, 'required|min:4', { className: 'text-danger'})}</span>
                                        <input type="text" value={this.state.lastName} onChange={this.handleChangeLastName.bind(this)} name="create_account_last_name" placeholder="Enter your Lastname"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="create_account_phone">Phone:</label><br/>
                                        <span>{this.validator.message('phone', this.state.phone, 'required|min:9', { className: 'text-danger'})}</span>
                                        <input type="text" value={this.state.phone} onChange={this.handleChangePhone.bind(this)} name="create_account_phone" placeholder="Enter your Phone"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="create_account_email">Adresa email:</label><br/>
                                        <span>{this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger'})}</span>
                                        <input type="text" value={this.state.email} onChange={this.handleChangeEmail.bind(this)}name="create_account_email" placeholder="Enter your E-mail"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="create_account_password">Parola:</label><br/>
                                        <span>{this.validator.message('password', this.state.password, 'required|min:8', { className: 'text-danger'})}</span>
                                        <input type="password" value={this.state.password} onChange={this.handleChangePassword.bind(this)} name="create_account_password" placeholder="Enter your password"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="create_account_cpassword">Confirma parola:</label><br/>
                                        <span className="validation_message">{this.validator.message('confirm_password', this.state.confirm_password, `required|min:8|in:${this.state.password}`, {messages: {in: 'Passwords need to match!'}}, { className: 'text-danger'})}</span>
                                        <input type="password" value={this.state.confirm_password} onChange={this.handleChangeCPassword.bind(this)} name="create_account_cpassword" placeholder="Confirm password"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button onClick={this.handleCreateAccount.bind(this)}>CREATE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                <Snackbar open={this.state.isSnackbarOpened} onClose={this.onSnackbarClose.bind(this)}>
                    <Alert severity={this.state.newAccountCreatedErrors != null ? 'error' : 'success'}>
                        <ul className="create_account_server_errors">
                        {
                            this.state.newAccountCreatedErrors != null &&    
                                this.state.newAccountCreatedErrors.map((item, i) => <li key={i} className="validation_message">{item}</li>)
                        }
                        {
                            (this.props.newAccountCreated && this.state.newAccountCreatedErrors === null) && <li><span>You account has been created</span></li>
                        }
                        </ul>
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);