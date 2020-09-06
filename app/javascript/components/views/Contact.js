import React from 'react';
import {Breadcrumbs} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {Map, GoogleApiWrapper} from 'google-maps-react';

import './Contact.css';

const mapStyles = {
    width: '30%',
    height: '30%'
};

  
class Contact extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {

        };
    }

    render()
    {
        return(<div className="container contact_page">
            <div className="row">
                <div className="col-xs-4">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">Home</Link>
                        <Link to={this.props.match.path}>Contact</Link>
                    </Breadcrumbs>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-4">
                    <div className="title_wrapper">
                        <p className="title">Contact Anticariat Online</p>
                    </div>

                    <div className="info_comenzi_wrapper">
                        <p className="info_comenzi">INFO COMENZI</p>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <span className="info_comenzi_header">Program:</span>
                                    </td>
                                    <td>
                                        <span className="info_comenzi_span">Luni-Vineri: 09:00 - 17:00</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="info_comenzi_header">Telefon:</span>
                                    </td>
                                    <td>
                                        <span className="info_comenzi_span">021 308 1 76</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="info_comenzi_header">Email:</span>
                                    </td>
                                    <td>
                                        <span className="info_comenzi_span">contact@anticariatonline.ro</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="ridicari_din_magazin_wrapper">
                        <div className="ridicari_din_magazin_title_wrapper">
                            <p>RIDICARI DIN MAGAZIN</p>
                            <Map
                                google={this.props.google}
                                zoom={14}
                                style={mapStyles}
                                initialCenter={{
                                    lat: -1.2884,
                                    lng: 36.8233
                                }}/>
                        </div>
                    </div>
                </div>            
                <div className="col-xs-4">

                </div>
            </div>
        </div>);
    }
}


export default GoogleApiWrapper({apiKey: 'YOUR GOOGLE_API_KEY_GOES_HERE'})(Contact);
