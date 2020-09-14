import React from 'react';

import './EditAccount.css';
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import {connect} from 'react-redux';
import {updateUserInfo} from '../../../js/actions/index';

function mapStateToProps(state)
{
    return {
        token: state.accessToken,
        user: state.account.user, 
        delivery_address: state.account.delivery_address
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        updateUserInfo: (userInfo) => {
            dispatch(updateUserInfo(userInfo))
        }
    };
}

class EditAccount extends React.Component
{
    state = {
        isLoading: false,
        isSnackbarOpened: false,
        countries_regions: [],
        selected_country: {regions:[]},
        user : {
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
            phone: this.props.user.phone,
            email: this.props.user.email,
            address: this.props.delivery_address.address,
            city: this.props.delivery_address.city,
            country_id: this.props.delivery_address.country_id,
            region_id: this.props.delivery_address.region_id
        }
    }

    updateUserInfo = (event) => {
        var _this = this;
        
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const token = this.props.token;

        this.setState(Object.assign({}, this.state, {isLoading: true, isSnackbarOpened: true}));
        
        var message = {
            username: this.props.user.username,
            first_name: this.state.user.first_name,
            last_name: this.state.user.last_name,
            phone: this.state.user.phone,
            email: this.state.user.email
        };

        var request_options = {
            method: 'PUT',
            body: JSON.stringify(message),
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf,
                'Authorization': 'Bearer ' + token
            }
        };
        fetch("/users/" + this.props.user.id, request_options)
            .then(response => response.json())
            .then(function(data) {
                _this.setState(Object.assign({}, _this.state, {isLoading: false}), () => {
                    _this.props.updateUserInfo(message);
                });
            })
            .catch((error) => {
                _this.setState(Object.assign({}, _this.state, {isLoading: false}));
            })
    }

    updateDeliveryAddressInfo = (event) => {
        var _this = this;
        
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const token = this.props.token;

        this.setState(Object.assign({}, this.state, {isLoading: true, isSnackbarOpened: true}));
        
        var message = {
            address: this.state.user.address,
            city: this.state.user.city,
            country_id: this.state.user.country_id,
            region_id: this.state.user.region_id
        };

        var request_options = {
            method: 'POST',
            body: JSON.stringify(message),
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf,
                'Authorization': 'Bearer ' + token
            }
        };
        fetch("/users/" + this.props.user.id + "/delivery_address_upsert", request_options)
            .then(response => response.json())
            .then(function(data) {
                _this.setState(Object.assign({}, _this.state, {isLoading: false}), () => {
                });
            })
            .catch((error) => {
                _this.setState(Object.assign({}, _this.state, {isLoading: false}));
            })
    }



    onChangeFirstName = (event) => {
        this.setState(Object.assign({}, this.state, {user: {...this.state.user, first_name:event.target.value}}));
    }

    onChangeLastName = (event) => {
        this.setState(Object.assign({}, this.state, {user: {...this.state.user, last_name:event.target.value}}));
    }
    
    onChangePhone = (event) => {
        this.setState(Object.assign({}, this.state, {user: {...this.state.user, phone:event.target.value}}));
    }

    onChangeEmail = (event) => {
        this.setState(Object.assign({}, this.state, {user: {...this.state.user, email:event.target.value}}));
    }

    onChangeAddress = (event) => {
        this.setState(Object.assign({}, this.state, {user: {...this.state.user, address:event.target.value}}));
    }

    onChangeCity = (event) => {
        this.setState(Object.assign({}, this.state, {user: {...this.state.user, city:event.target.value}}));
    }

    handleCountryChange = (event, value) =>
    {
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
            newState.user.country_id = selected_country.id;
            if(selected_country.regions.length > 0)
            {
                newState.user.region_id = selected_country.regions[0].id;
            }
            else {
                newState.user.region_id = -1;
            }
            
            this.setState(newState);
        }
    }

    handleRegionChange = (event) => {
        this.setState(Object.assign({}, this.state, {user: {...this.state.user, region_id: event.target.value}}));
    }
    

    fetchCountries = () => {
        var _this = this;
        this.setState(Object.assign({}, this.state, {isLoading: true}));
        fetch('/book_filters/countries_regions')
            .then(response => response.json())
            .then(function(data) {
                let newState = Object.assign({}, _this.state);
                newState.countries_regions = data;
                newState.selected_country = data[_this.state.user.country_id - 1];
                newState.isLoading = false;
                _this.setState(newState);
            })
    }   

    onSnackbarClose = (event) => {
        this.setState(Object.assign({}, this.state, {isSnackbarOpened: false}));
    }
    componentDidMount()
    {
        this.fetchCountries();
    }

    render()
    {
        return(<div className="container edit_account_page">
            <div className="row">
                <div className="col-md-12">
                    {
                        this.state.isLoading === true && <LinearProgress/>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <ul className="user_list">
                        <li>
                            <label htmlFor="first_name">Prenume:</label><br/>
                            <input className="input_field" type="text" name="first_name" onChange={this.onChangeFirstName.bind(this)} value={this.state.user.first_name}/>
                        </li>
                        <li>
                            <label htmlFor="last_name">Nume:</label><br/>
                            <input className="input_field" type="text" name="last_name" onChange={this.onChangeLastName.bind(this)} value={this.state.user.last_name}/>
                        </li>
                        <li>
                            <label htmlFor="phone">Telefon:</label><br/>
                            <input className="input_field" type="text" name="phone" onChange={this.onChangePhone.bind(this)} value={this.state.user.phone}/>
                        </li>
                        <li>
                            <label htmlFor="email">Email:</label><br/>
                            <input className="input_field" type="text" name="email" onChange={this.onChangeEmail.bind(this)} value={this.state.user.email}/>
                        </li>
                        
                        <li>
                            <button className="btn_save_user" onClick={this.updateUserInfo.bind(this)}>Salveaza Date Utilizator</button>
                        </li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <ul className="address_list">
                        <li>
                            <label htmlFor="address">Adresa:</label><br/>
                            <input className="input_field" type="text" name="address" onChange={this.onChangeAddress.bind(this)} value={this.state.user.address}/>
                        </li>
                        <li>
                            <label htmlFor="city">City:</label><br/>
                            <input className="input_field" type="text" name="city" onChange={this.onChangeCity.bind(this)} value={this.state.user.city}/>
                        </li>
                        <li>
                            <label htmlFor="country">Tara:</label><br/>
                            <select name="country" className="input_field" onChange={this.handleCountryChange.bind(this)} value={this.state.user.country_id}>
                            {
                                this.state.countries_regions.map((item, i) => {
                                    return <option key={item.id} value={item.id}>{item.name}</option>    
                                })
                            }
                            </select>
                        </li>
                        <li>
                            <label htmlFor="email">Regiune\Judet:</label><br/>
                            <select className="input_field" onChange={this.handleRegionChange.bind(this)} value={this.state.user.region_id}>
                            {
                                this.state.selected_country.regions.map((item,i) => {
                                    return <option key={item.id} value={item.id}>{item.name}</option>    
                                })
                            }
                            </select>
                        </li>
                        
                        <li>
                            <button className="btn_save_address" onClick={this.updateDeliveryAddressInfo.bind(this)}>Salveaza Adresa De Livrare</button>
                        </li>
                    </ul>
                </div>
            </div>
            <Snackbar open={this.state.isSnackbarOpened} onClose={this.onSnackbarClose.bind(this)}>
                <Alert severity="success">
                    Information has been saved!
                </Alert>
            </Snackbar>
        </div>);
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);