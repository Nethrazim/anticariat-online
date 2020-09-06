import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Popper from '@material-ui/core/Popper';
import {host_url} from '../../js/constants/api-urls';

import './NewsLetterBar.css';

class NewsLetterBar extends React.Component
{
    state = {
        terms: false,
        email: '',
        anchorEl:null,
        popperOpen: false,
        subscriptionPopperOpen: false,
        subscriptionMessage: ''
    }
    
    validator = new SimpleReactValidator();

    submitSubscription = (event) =>
    {
        let newState = this.state;
        newState.anchorEl = event.target;

        if(!this.validator.allValid())
        {
            newState.popperOpen = true;
            this.setState(newState);
            this.validator.showMessages();
        } else {
            if(this.state.terms === true)
            {
                this.createSubscription();
            }
            newState.popperOpen = false;
            this.setState(newState);
        }

        this.forceUpdate();
    }
    
    createSubscription = () =>
    {
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        var request_options = {
            method: 'POST', 
            body: JSON.stringify({email:this.state.email}),
            cache: 'no-cache',
            headers: {
                'Content-Type':'application/json',
                'X-CSRF-Token': csrf
            }
        }

        var _this = this;
        fetch(host_url + "subscription/new", request_options)
            .then(response => response.json())
            .then(function(data){
                var newState = _this.state;
                newState.subscriptionPopperOpen = true;
                if(data.errors)
                {
                    newState.subscriptionMessage = data.errors[0];
                }
                else 
                {
                    newState.subscriptionMessage = 'Email subscribed.'
                }
                
                _this.setState(newState);
            });
    }

    handleEmailChange = (event) =>
    {
        var newState = this.state;
        newState.email = event.target.value;
        this.setState(newState);
    }

    handleTermsChange = (event) =>
    {
        var newState = this.state;
        newState.terms = event.target.checked;
        this.setState(newState);
    }

    render()
    {
        return(
            <div className="container">
            <div className="row news_letter_box">
                <div className="col-md-4">
                    <div className="subscribe_box">
                        <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-envelope" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                        </svg>
                        <span>ABONEAZA-TE LA NEWSLETTER</span>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="terms_and_conditions_box">
                        <input type="checkbox" className="cb_terms_and_conditions" name="terms_and_conditions" checked={this.state.terms} onChange={this.handleTermsChange}/>
                        <label htmlFor="terms_and_conditions">
                            Am citit si sunt de acord cu Termenii si conditiile /  Prelucrarea datelor cu caracter personal (GDPR)
                        </label>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="news_letter_email_box">
                        <input type="text" name="news_letter_email" placeholder="Introduceti adresa de E-mail" value={this.state.email} onChange={this.handleEmailChange}/>
                        <svg onClick={this.submitSubscription}width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-arrow-right-short" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z"/>
                            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z"/>
                        </svg>
                        <Popper open={this.state.popperOpen} anchorEl={this.state.anchorEl} placement={"top"}>
                            <div className="popper">{this.validator.message('email', this.state.email, 'required|email', {className:'text-danger'})}</div>
                            <div className="popper">{this.validator.message('terms', this.state.terms, 'required|accepted', {className:'text-danger'})}</div>
                        </Popper>
                        <Popper open={this.state.subscriptionPopperOpen} anchorEl={this.state.anchorEl} placement={"top"}>
                            <div className="popper">
                                <p>{this.state.subscriptionMessage}</p>
                            </div>
                        </Popper>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default NewsLetterBar;