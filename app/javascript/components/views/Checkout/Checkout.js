import React from 'react';

import {Breadcrumbs} from '@material-ui/core';
import {Link} from 'react-router-dom';
import history from '../../../js/history/history';


import {connect} from 'react-redux';
import {deleteFromShoppingCart} from '../../../js/actions/index';

import SimpleReactValidator from 'simple-react-validator';
import './Checkout.css'

function mapStateToProps(state)
{
    return {
        items: state.shoppingCart.items
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        deleteFromCart: (payload) => {
            dispatch(deleteFromShoppingCart(payload))
        }
    };
}

class Checkout extends React.Component
{
    state = {
        personInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        },
        deliveryInfo: {
            address:'',
            country:null,
            region:null,
            city:''
        },
        countries_regions:[],
        selected_country:{regions:[]}
    }

    validator = new SimpleReactValidator();
    
    deleteBook = (event) => {
        this.props.deleteFromCart(this.props.items[parseInt(event.currentTarget.attributes.book_index.value)]);
    }
    
    createOrder = (event) => {
        if(!this.validator.allValid() && this.state.deliveryInfo.country !== null && this.state.deliveryInfo.region !== null)
        {
            this.validator.showMessages();
            this.forceUpdate();
        }
        else
        {
            this.sendOrder();
        }
    }

    sendOrder = () => {
        var order_details = [];
        this.props.items.forEach((item, i) => {
            order_details.push(item.id)
        });

        var order = {
            order: {
                contact_person: {
                    first_name: this.state.personInfo.firstName,
                    last_name: this.state.personInfo.lastName, 
                    email: this.state.personInfo.email,
                    phone: this.state.personInfo.phone
                },
                delivery_address: {
                    address: this.state.deliveryInfo.address,
                    city: this.state.deliveryInfo.city,
                    country_id: this.state.deliveryInfo.country,
                    region_id: this.state.deliveryInfo.region
                },
                order_details: order_details
            }
        }
        console.log(JSON.stringify(order));
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        fetch('http://localhost:3000/orders', {
            method: 'POST', 
            body: JSON.stringify(order),
            cache: 'no-cache', 
            headers: {
                'Content-Type':'application/json',
                'X-CSRF-Token': csrf
            }
        })
        .then(response => response.json())
        .then(function(data) {
            alert(data);
        })
        console.log(order);
    }

    fetchCountries = () => {
        var _this = this;
        fetch('http://localhost:3000/book_filters/countries_regions')
            .then(response => response.json())
            .then(function(data) {
                var newState = Object.assign({}, _this.state);
                newState.countries_regions = data
                newState.selected_country = data[0];
                _this.setState(newState);
            })
    }

    handleFirstNameChange = (event) => {
        this.setState(Object.assign({}, this.state, {personInfo: {...this.state.personInfo, firstName: event.target.value }}));
    }

    handleLastNameChange = (event) => {
        this.setState(Object.assign({}, this.state, {personInfo: {...this.state.personInfo, lastName: event.target.value}}));
    }

    handleEmailChange = (event) => {
        this.setState(Object.assign({}, this.state, {personInfo: {...this.state.personInfo, email: event.target.value}}));
    }

    handlePhoneChange = (event) => {
        this.setState(Object.assign({}, this.state, {personInfo: {...this.state.personInfo, phone: event.target.value}}));
    }
    
    handleAddressChange = (event) => {
        this.setState(Object.assign({}, this.state, {deliveryInfo: {...this.state.deliveryInfo, address: event.target.value}}));
    }

    handleCountryChange = (event, value) => {
        var selected_country = null;
        this.state.countries_regions.forEach((item,i) => {
            if(item.id == event.target.value)
            {
                selected_country = item;
            }
        });
        if (selected_country != null)
        {
            var newState = Object.assign({}, this.state);
            newState.selected_country = selected_country;
            newState.deliveryInfo.country = selected_country.id;
            newState.deliveryInfo.region = selected_country.regions[0].id;
            this.setState(newState);
        }
    }


    handleRegionChange = (event) => {
        this.setState(Object.assign({}, this.state, {deliveryInfo: {...this.state.deliveryInfo, region: event.target.value}}));
    }
    
    handleCityChange = (event) => {
        this.setState(Object.assign({}, this.state, {deliveryInfo: {...this.state.deliveryInfo, city: event.target.value}}));
    }

    componentDidMount()
    {
        this.fetchCountries();
    }

    render()
    {
        var isCartEmpty = this.props.items.length === 0 ? true: false;

        var total = 0;
        this.props.items.forEach((item, index) => total += item.price);
        return(
        isCartEmpty === false ? 
        <div className="checkout_page">
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/">Home</Link>
                    <Link to="/checkout">Checkout</Link>
                </Breadcrumbs>
            </div>

            <div className="title_wrapper">
                <span className="title">Cos cumparaturi</span>
            </div>
            
            <div className="summary_wrapper">
                <div className="total"> 
                    <span className="total_span">Total de plata::</span>
                    <span className="total_price">{total}LEI</span>
                </div>
            </div>

            <div className="items_wrapper">
                <table className="items_table">
                    <thead>
                        <tr className="headers">
                            <td className="head_product">
                                <span>PRODUS COMANDAT</span>
                            </td>
                            <td className="head">
                                <span className="col_header">STARE</span>
                            </td>
                            <td className="head">
                                <span className="col_header">PRET</span>
                            </td>
                            <td className="header_delete">
                                <span className="col_header">STERGE</span>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.items.map((item, i) => {
                                return <tr key={i}>
                                    <td>
                                        <Link to={"/books/" + item.id}>
                                        <img width="50" height="70" src={item.base64} alt="book"/>
                                        <ul className="book_details">
                                            <li>
                                                <span className="title_span">{item.title}</span>
                                            </li>
                                            <li><span>ISBN: </span>{item.isbn}</li>
                                        </ul>
                                        </Link>
                                    </td>
                                    <td>
                                        <span className="right">{item.condition}</span>
                                    </td>
                                    <td>
                                        <span className="right">{item.price}</span>
                                    </td>
                                    <td>
                                        <div>
                                            <svg book_index={i} onClick={this.deleteBook} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-x right deleteBtn" fill="red" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                                                <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className="contact_person_wrapper">
                <span className="heading">Persoana de contact</span>
                <ul className="contact_form">
                    <li>
                        <span className="red">*</span>Prenume:<br/>
                        <input type="text" className="personalInfo" value={this.state.personInfo.firstName} onChange={this.handleFirstNameChange}/>
                        <span>{this.validator.message('firstName', this.state.personInfo.firstName, 'required', {className:'text-danger'})}</span>
                    </li>
                    <li>
                        <span className="red">*</span>Nume:<br/>
                        <input type="text" className="personalInfo" value={this.state.personInfo.lastName} onChange={this.handleLastNameChange}/>
                        <span>{this.validator.message('lastName', this.state.personInfo.lastName, 'required', {className:'text-danger'})}</span>
                    </li>
                    <li>
                        <span className="red">*</span>E-mail:<br/>
                        <input type="text" className="personalInfo" value={this.state.personInfo.email} onChange={this.handleEmailChange}/>
                        <span>{this.validator.message('email', this.state.personInfo.email, 'required|email', {className:'text-danger'})}</span>
                    </li>
                    <li>
                        
                        <span className="red">*</span>Telefon:<br/>
                        <input type="text" className="personalInfo" value={this.state.personInfo.phone} onChange={this.handlePhoneChange}/>
                        <span>{this.validator.message('phone', this.state.personInfo.phone, 'required', {className:'text-danger'})}</span>
                    </li>
                </ul>
            </div>

            <div className="date_livrare_wrapper">
                <span className="heading">Detalii Livrare</span>
                <ul className="date_livrare_form">
                    <li>
                        <span className="red">*</span>Adresa:<br/>
                        <input type="text" className="factInput" value={this.state.deliveryInfo.address} onChange={this.handleAddressChange} placeholder="strada, numar, bloc, scara, apartament"/>
                        <span>{this.validator.message('address', this.state.deliveryInfo.address, 'required', {className:'text-danger'})}</span>
                    </li>
                    <li>
                        <span className="red">*</span>Tara:<br/>
                        <select className="factInput" onChange={this.handleCountryChange}>
                            {
                                this.state.countries_regions.map((item, i) => {
                                    return <option key={i} value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </li>
                    <li>
                        <span className="red">*</span>Regiune / Judet:<br/>
                        <select className="factInput" onChange={this.handleRegionChange}>
                            {
                                this.state.selected_country.regions.map((item,i) => {
                                    return <option key={i} value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </li>
                    <li>
                        
                        <span className="red">*</span>Localitate:<br/>
                        <input type="text" className="factInput" value={this.state.deliveryInfo.city} onChange={this.handleCityChange}/>
                        <span>{this.validator.message('city', this.state.deliveryInfo.city, 'required', {className:'text-danger'})}</span>
                    </li>
                </ul>
                <div>
                    <button className="finalizare_btn" onClick={this.createOrder}>Finalizare</button>
                </div>
            </div>
        </div>
        :
        <div className="d-flex justify-content-center">
            <div className="empty_cart_wrapper">
                <h1>Your cart is empty !</h1>
            </div>
        </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);