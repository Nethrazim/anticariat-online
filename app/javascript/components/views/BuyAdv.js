import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import ClipLoader from 'react-spinners/ClipLoader';
import {Breadcrumbs} from '@material-ui/core';
import {Link} from 'react-router-dom';


import phone from '../../components/assets/images/phone.jpg';
import carti1 from '../../components/assets/images/carti_1.jpg';
import carti2 from '../../components/assets/images/carti_2.jpg';
import magazin_1 from '../../components/assets/images/magazin_1.jpg';
import magazin_2 from '../../components/assets/images/magazin_3.jpg';
import magazin_3 from '../../components/assets/images/magazin_4.jpg';



import './BuyAdv.css';
class BuyAdv extends React.Component
{
    state = {
        isLoading: false,
        contact: {
            name: '',
            phone: '',
            message: '',
            status: ''
        }
    };

    validator = new SimpleReactValidator();

    handleNameChange = (event) =>
    {
        var newState = Object.assign({}, this.state);
        newState.contact.name = event.target.value;
        this.setState(newState);
    }

    handlePhoneChange = (event) =>
    {
        var newState = Object.assign({}, this.state);
        newState.contact.phone = event.target.value;
        this.setState(newState);
    }

    handleMessageChange = (event) =>
    {
        var newState = Object.assign({}, this.state);
        newState.contact.message = event.target.value;
        this.setState(newState);
    }

    handleSubmitMessage = (event) =>
    {
        event.preventDefault();
        if(!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            this.sendMessage();
        }
    }

    sendMessage = () =>
    {
        var message = {
            name: this.state.contact.name,
            phone: this.state.contact.phone,
            message: this.state.contact.message
        };
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

        var _this = this;
        this.setState(Object.assign({}, this.state, {isLoading: true}));
        fetch('/messages',{
            method: 'POST',
            body: JSON.stringify(message),
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf
            }
        })
        .then(response => response.json())
        .then(function(data){
            let newState = Object.assign({}, _this.state);
            newState.isLoading = false;
            newState.contact.status = 'Your message has reached us. We will contact you soon.';
            _this.setState(newState);
        })
        .catch(error=> {
            let newState = Object.assign({}, _this.state);
            newState.isLoading = false;
            newState.contact.status = 'Message delivery failed. Please try to contact us by phone.';
            _this.setState(newState);
        });
    }

    render()
    {
        return(
            <div className="container buy_adv_wrapper">
                 <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/">Home</Link>
                    <Link to={this.props.match.path}>Cumparam</Link>
                </Breadcrumbs>
            </div>);
    }
}


export default BuyAdv;