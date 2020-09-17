import React from 'react';
import {host_url} from '../../../js/constants/api-urls';

import BookItem from './BookItem';

import {Breadcrumbs} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from "@material-ui/core/LinearProgress";


import {connect} from 'react-redux';
import {addToShoppingCart} from '../../../js/actions/index';

import './Book.css';


function mapDispatchToProps(dispatch) {
    return {
        addToCart: item => dispatch(addToShoppingCart(item))
    }
}

class Book extends React.Component
{
    state = 
    {
        isLoading: false,
        book: {
        },
        recommended_books: [],
        isAddedToCart: false
    };

    addToCart = (event) => 
    {
        this.props.addToCart(this.state.book);
        this.setState(Object.assign({}, this.state, {isAddedToCart: true}));
    }

    handleGoBack = (event) =>
    {
        event.preventDefault();
        this.props.history.goBack();
    }

    fetchBookData = () =>
    {
        var _this = this;
        var id = this.props.match.params.id;
        fetch("/books/"+id)
            .then(response => response.json())
            .then(function(data){
               var newState = Object.assign({}, _this.state);
               newState.book = data;
               _this.setState(newState, () => {
                _this.fetchRecommendedBooks(); 
               });
            })
            .catch((error) => {
               console.log(error);
            });
    }

    fetchRecommendedBooks = () =>
    {
        var _this = this;
        
        var message = {
            book_id: this.props.match.params.id,
        	book_category_id: this.state.book.book_category_id,
	        author: this.state.book.author,
	        limit:6
        };

        fetch("/search/recommendations?" + new URLSearchParams(message))
            .then(response => response.json())
            .then(function(data){
                _this.setState(Object.assign({}, _this.state, {isLoading: false, recommended_books: data}));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidMount()
    {
        this.setState(Object.assign({}, this.state, {isLoading: true}))
        this.fetchBookData();  
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id !== prevProps.match.params.id)
        {
            this.setState(Object.assign({}, this.state, {isLoading: true, isAddedToCart: false}))
            this.fetchBookData();   
        }
    }

    render()
    {
        return(
            <div className="container-fluid book_data_box">
            <div className="row">
                <div className="col-md-12">
                    {
                        this.state.isLoading === true && <LinearProgress/>
                    }
                </div>
            </div>
            <div className="row">
                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">Home</Link>
                        <Link to="/#" onClick={this.handleGoBack.bind(this)}>Books</Link>
                        <Link to={"/books/" + this.state.book.id}>{this.state.book.title}</Link>
                    </Breadcrumbs>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="img_holder">
                        {this.state.book.price_reduction && <div className="reduction_box"><span>-{this.state.book.price_reduction.percent_reduction}%</span></div>}
                        <img src={this.state.book.base64} className="book_img" alt={this.state.book.title}/>
                    </div>
                </div>
                <div className="col-md-4">
                    <ul className="book_details">
                        <li>
                            <div>
                                <span className="block title">{this.state.book.title}</span>
                                <span className="block author">{this.state.book.author}</span>
                                <hr/>
                            </div>
                        </li>
                        <li>
                            <span>Editura: </span><span>{this.state.book.publisher}</span>
                        </li>
                        <li>
                            <span>Colectia: </span><span>{this.state.book.collection}</span>
                        </li>
                        <li>
                            <span>Data aparitie: </span><span>{this.state.book.release_year}</span>
                        </li>
                        <li>
                            <span>Coperta: </span><span>{this.state.book.cover}</span>
                        </li>
                        <li>
                            <span>Numar pagini: </span><span>{this.state.book.nr_of_pages}</span>
                        </li>
                        <li>
                            <span>ISBN/Cod: </span><span>{this.state.book.isbn}</span>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <div className="container left_book_details">
                        {this.state.book.price_reduction && <div className="d-flex justify-content-center">
                            <p>Pret vechi: <span className="old_price">{this.state.book.price}LEI</span></p>
                        </div>}
                        <div className="d-flex justify-content-center">
                            {this.state.book.price_reduction && <p><span className="price">Pret redus:  {(this.state.book.price - ((this.state.book.price_reduction.percent_reduction * this.state.book.price) / 100)).toFixed(2)}LEI</span></p>}
                            {!this.state.book.price_reduction && <p><span className="price">{this.state.book.price}LEI</span></p>}
                        </div>
                        <div className="d-flex justify-content-center">
                            <p><span>{this.state.book.condition}</span></p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p><span className="stock">{this.state.book.quantity > 5 ? 'Stock suficient' : 'Quantity: ' + this.state.book.quantity}</span></p>
                        </div>
                        <div className="container d-flex justify-content-center">
                            <ul className="adauga_in_cos_item_list">
                                <li>
                                    {
                                        this.state.isAddedToCart === true ? <div>
                                                <Alert>
                                                    <span className="alert">Adaugat in cos.</span>
                                                </Alert>
                                            </div> : <div className="d-flex justify-content-center">
                                                        <button className="adauga_in_cos" onClick={this.addToCart.bind(this)}>Adauga in cos</button>   
                                                    </div>
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex justify-content-center adauga_la_favorite_box">
                            <button className="adauga_la_favorite">Adauga la favorite</button>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="deliver_time">
                                <span>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-truck" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5v7h-1v-7a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5v1A1.5 1.5 0 0 1 0 10.5v-7zM4.5 11h6v1h-6v-1z"/>
                                        <path fillRule="evenodd" d="M11 5h2.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5h-1v-1h1a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4.5h-1V5zm-8 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                                        <path fillRule="evenodd" d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                                    </svg>
                                </span>&nbsp;
                                <span>
                                    3-4 Zile
                                </span>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="recomandari_title_wrapper">
                    <p>RECOMANDARI</p>
                </div>          
                <div className="recomandari_books">
                    <ul className="recomandari_books_list">
                        {
                            this.state.recommended_books.map((item,i) =>
                            {
                                return <li className="recomandari_books_list_item" key={i}><BookItem book={item}/></li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>);
    }
}


export default connect(null, mapDispatchToProps)(Book);
