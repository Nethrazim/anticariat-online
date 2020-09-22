import React from 'react';
import {Link} from 'react-router-dom';

import head_img from '../../components/assets/images/cumparam-carti.jpg';

import BookItem from './BookComponents/BookItem';

import './Home.css';
class Home extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            newBooks: []
        }

        this.fetchNewBooks.bind(this);
    }

    fetchNewBooks()
    {
        var message = {
            latest: 6
        };

        var _this = this;
        fetch('/search/new_books?' + new URLSearchParams(message))
            .then(response => response.json())
            .then(function(data) {
                var newState = Object.assign({}, _this.state);
                newState.newBooks = data.books;
                _this.setState(newState);
            });
    }

    componentDidMount()
    {
        this.fetchNewBooks();
    }
    
    render()
    {
        return(
            <div className="home_wrapper">
                <div className="container-fluid d-flex justify-content-center head_img">
                    <Link to="/cumparam">
                        <img src={head_img} alt=""/>
                    </Link>
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    <div className="new_books_wrapper">
                        <span className="noutati_title">
                            NOUTATI
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z"/>
                            </svg>
                        </span>
                        <ul className="new_books">
                            {
                                this.state.newBooks.map((item, i) => {
                                return <li key={i}>
                                            <div>
                                                <BookItem book={item}/>
                                            </div>
                                        </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;