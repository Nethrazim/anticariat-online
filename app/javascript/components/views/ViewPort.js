import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import './ViewPort.css';

import Account from './Account/Account';
import LoginBox from './Account/LoginBox';
import DisplayBooks from './BooksView/DisplayBooks';
import Home from './Home';
import BuyAdv from './BuyAdv';
import Book from './BookComponents/Book';
import Author from './BookComponents/Author';
import Contact from './Contact';
import Checkout from './Checkout/Checkout';
import EditAccount from './Account/EditAccount';
import SearchResults from './SearchBooks/SearchResults';
import BookReductions from './BooksView/BooksWithPriceReductions';
class ViewPort extends Component
{
    render()
    {
        return(
            <div className="container-flex d-flex justify-content-center">
                <div className="view_port">
                        <Switch>
                            <Route path="/reduceri" component={BookReductions}/>
                            <Route path="/search_results" component={SearchResults}/>
                            <Route path="/view_books/:id" component={(routeProps) => <Book {...routeProps}/>}/>
                            <Route path="/contact" render={(routeProps) => <Contact {...routeProps}/>} />
                            <Route path="/cumparam" render={(routeProps) => <BuyAdv {...routeProps}/>} />
                            <Route path="/literatura" component={(routeProps) => <DisplayBooks {...routeProps} category="literatura"/>} />
                            <Route path="/bibliofilie" component={(routeProps) => <DisplayBooks {...routeProps} category="bibliofilie"/>} />
                            <Route path="/copii" component={(routeProps) => <DisplayBooks {...routeProps} category="copii"/>} />
                            <Route path="/arta" component={(routeProps) => <DisplayBooks {...routeProps} category="arta"/>} />
                            <Route path="/cultura_educatie" component={(routeProps) => <DisplayBooks {...routeProps} category="cultura educatie"/>} />
                            <Route path="/istorie_etnografie" component={(routeProps) => <DisplayBooks {...routeProps} category="istorie etnografie"/>} />
                            <Route path="/stiinta_tehnica" component={(routeProps) => <DisplayBooks {...routeProps} category="stiinta tehnica"/>} />
                            <Route path="/spiritualitate" component={(routeProps) => <DisplayBooks {...routeProps} category="spiritualitate"/>} />
                            <Route path="/hobby_ghiduri" component={(routeProps) => <DisplayBooks {...routeProps} category="hobby ghiduri"/>} />
                            <Route path="/limba_straina" component={(routeProps) => <DisplayBooks  {...routeProps} category="limba straina"/>} />
                            <Route path="/altele" component={(routeProps) => <DisplayBooks {...routeProps} category="altele"/>} />
                            <Route path="/account" render={(routeProps) => <Account {...routeProps}/>}/>
                            <Route path="/edit_account" render={(routeProps) => <EditAccount {...routeProps} />}/>
                            <Route path="/authors/:author_name" render={(routeProps) => <Author {...routeProps} /> }/>
                            <Route path="/login" render={(routeProps) => <LoginBox {...routeProps}/>}/>
                            <Route path="/checkout" render={(routeProps) => <Checkout {...routeProps}/>}/>
                            <Route path="/" render={(routeProps) => <Home {...routeProps}/>} />
                        </Switch>
                </div>
            </div>
        );
    }
}

export default ViewPort;