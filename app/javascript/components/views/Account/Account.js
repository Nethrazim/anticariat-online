import React from 'react';
import { connect } from 'react-redux';
import { createAccount } from '../../../js/actions/index'
/* validator */
import SimpleReactValidator from 'simple-react-validator';

/*css*/
import './Account.css';

const mapStateToProps = function(state)
{
    return {
        newAccountCreatedErrors: state.account.newAccountCreatedErrors,
        newAccountCreated: state.account.newAccountCreated
    }
}
class CreateAccount extends React.Component
{
    state = {
        username: '',
        email: '',
        password: '',
        confirm_password:''
    };

    validator = new SimpleReactValidator();
    
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
    
    handleChangeEmail = (event) =>
    {
        var newState = Object.assign({}, this.state)
        newState.email = event.target.value;
        this.setNewState(newState);
    }
    
    handleChangePassword = (event) =>
    {
        var newState = Object.assign({}, this.state)
        newState.password = event.target.value;
        this.setNewState(newState);
    }

    handleChangeCPassword = (event) =>
    {
        var newState = Object.assign({}, this.state)
        newState.confirm_password = event.target.value;
        this.setNewState(newState);
    }

    handleCreateAccount = (event) =>
    {
        event.preventDefault();
        if(!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            this.props.createAccount(this.state);
        }
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
                                        <br/>
                                        <ul className="create_account_server_errors">
                                        {
                                            this.props.newAccountCreatedErrors != null &&    
                                                this.props.newAccountCreatedErrors.map((item, i) => <li key={i} className="validation_message">{item}</li>)
                                        }
                                        </ul>
                                        <div>
                                            <span>{this.props.newAccountCreated ? 'You account has been created': ''}</span>
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


export default connect(mapStateToProps, { createAccount })(CreateAccount);