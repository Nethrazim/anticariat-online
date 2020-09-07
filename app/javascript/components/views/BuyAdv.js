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
                <div className="row">
                    <div className="col-lg">
                        <div className="d-flex justify-content-center">
                            <span className="title">Anticariat Online </span> <span className="emph_title">cumpara carti</span><br/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="d-flex justify-content-center">
                            <span>
                                <img src={phone} alt="anticariat"/>
                            </span>
                            <span className="call_us">Suna-ne acum:</span><span className="call_us_phone">033 303 13 13</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md">
                        <span>
                        Trimite-ne email la adresa contact@targulcartii.ro sau completeaza formularul alaturat cu lista titlurilor de cărți pe care vrei să le vinzi și TargulCartii.ro le va cumpăra.
                        Singurul principiu pe care se bazează funcționarea unui anticariat este vânzarea de carte veche, de la deținătorul original către cei care își doresc respectiva carte care nu se mai găsește în librării. Pe acest lucru se bazează și anticariatul Târgul Cărții, a cărui activitate principală este cea de achiziție de carte veche, pe care apoi să o punem spre vânzare în anticariatul nostru online.
                        Biblioteca ta este plină și îți este greu să faci loc cărților noi? Te-ai gândit că o soluție poate fi să vinzi o parte din cărțile pe care deja le-ai citit?
                        </span>
                    </div>
                    <div className="col-md">
                        <form className="contact_form">
                            <div>
                                <input type="text" name="name" placeholder="Nume*" value={this.state.contact.name} onChange={this.handleNameChange}/>
                                <span>{this.validator.message('name', this.state.contact.name, 'required', { className: 'text-danger'})}</span>
                            </div>
                            <div>
                                <input type="text" name="phone" placeholder="Telefon*" value={this.state.contact.phone} onChange={this.handlePhoneChange}/>
                                <span>{this.validator.message('phone', this.state.contact.phone, 'required', { className: 'text-danger'})}</span>
                            </div>
                            <div>
                                <textarea name="message" placeholder="Mesaj" value={this.state.contact.message} onChange={this.handleMessageChange}></textarea>
                                <span>{this.validator.message('message', this.state.contact.message, 'required', { className: 'text-danger'})}</span>
                            </div>
                            <div className="terms_and_conditions">
                                <input type="checkbox"/>
                                <span className="have_read">Am citit si sunt de acord cu Termenii si conditiile / Prelucrarea datelor cu caracter personal (GDPR)</span>
                                <span className="star">*</span>
                            </div>
                            <div className="button_wrapper">
                                <button onClick={this.handleSubmitMessage}>Trimite</button>
                                <ClipLoader className="clip_loader" size={25} loading={this.state.isLoading}/>
                            </div>
                            <div>
                                <span className="server_status ">{this.state.contact.status}</span>
                            </div>
                          </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <div className="inline_wrapper">
                            <div className="d-flex justify-content-center">
                                <p>Dacă ți-ai pus problema</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <p>"cine cumpără cărți vechi",</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <p>Anticariatul Târgul Cărții te poate ajuta,</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <p>una din activitățile noastre principale fiind</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <p>achiziția de cărți vechi.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg">
                        <div className="inline_wrapper">
                           <img src={carti1} alt="anticarita"/>
                        </div>
                        <div className="inline_wrapper">
                            <img src={carti2} alt="anticarita"/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl">
                        <hr/>
                            <p className="p_title">Cine cumpără cărți second hand</p>
                            <p>
                                Cumpărăm carte second hand pentru anticariatul Târgul Cărții evaluând, de fiecare dată, colecțiile de carte veche sau edițiile de carte rară la prețul lor corect.  
                                Târgul Cărții cumpără cărți second hand în cazul în care clienții noștri doresc lichidarea bibliotecii și a colecțiilor de carte veche pe care le dețin.
                                Avem o experiență foarte vastă în ceea ce privește evaluarea cărților de anticariat și lichidarea stocurilor de cărți vechi, iar faptul că clienții ne devin fideli atunci când vine vorba de vânzare de carte veche este cartea noastră de vizită.
                            </p>
                        <hr/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl">
                            <p className="p_title">Vânzare cărți</p>
                            <p>
                                De ce să nu creezi un "circuit" al cărților în biblioteca ta? Banii pe care îi poți obține din vânzarea de cărți îi poți investi mai departe în cărți noi. Astfel, plăcerea cititului poate să nu mai fie și un efort financiar.
                                Odată ce ai terminat de citit o carte, îi vei găsi un loc în biblioteca ta și cel mai probabil nu o vei mai deschide. Dar prin vânzarea de cărți vechi, poți face loc în bibliotecă noilor cărți achiziționate,
                                iar alți iubitori de lectură ca și tine vor profita de cărțile tale vechi în anticariatul Târgul Cărții.
                                Acest lucru ți se poate întâmpla cu multe din colecțiile pe care le acumulezi, cine nu ar avea de vânzare manuale școlare pe care le-a folosit pe parcursul școlii și care acum nu îi mai sunt utile? 
                                De cărțile vechi din biblioteca ta se poate bucura un copil chiar în prima lui zi de școală.
                            </p>
                        <hr/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl">
                            <p className="p_title">Cumpărăm cărți vechi de la domiciului clientului</p>
                            <p>
                                În funcție de numărul volumelor pe care dorești să le vinzi, noi ne deplasăm la domiciliul tău gratis pentru evaluarea și cumpărarea cărților vechi.
                                Apelând la Târgul Cărții pentru vânzare de cărți vechi poți fi sigur de promptitudinea și seriozitatea noastră, iar plata o efectuăm întotdeauna pe loc.
                                Cea mai bună metodă este să ai o viziune de ansamblu asupra cărților din bibliotecă pe care dorești să le vinzi, să ne-o transmiți, iar discuția va decurge în mod natural de aici. Noi te putem ajuta cu sfaturi legate de vânzarea de cărți second hand oricând ai nevoie.
                            </p>
                            <div>
                                <img src={magazin_1} alt="anticariat" className="shop_img"/>
                                <img src={magazin_2} alt="anticariat" className="shop_img"/>
                                <img src={magazin_3} alt="anticariat" className="shop_img"/>
                                <div className="magazin_p_wrapper">
                                    <p className="par">
                                        Pentru un număr mic de cărți<br/>
                                        te invităm la sediul nostru din<br/>
                                        <span className="red">&nbsp;&nbsp;&nbsp;Str. Doamnei, nr. 27-29,</span><br/>
                                        <span>&nbsp;&nbsp;&nbsp;Sector 3, București.</span>
                                    </p>
                                </div>
                            </div>
                        <hr/>
                    </div>
                </div>
        </div>);
    }
}


export default BuyAdv;