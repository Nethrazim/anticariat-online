import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import {Breadcrumbs} from '@material-ui/core';
import {Link } from 'react-router-dom'

import './DisplayBooks.css';

import BookItem from '../BookComponents/BookItem';
import Filters from './Filters';

class DisplayBooks extends React.Component
{
    state = {
        searched_books:{
            books: [],
            total: 0
        },
        page: 1,
        per_page_options: [10, 20, 40],
        per_page: 20,
        filter: {
            name: '',
            price_from: '1',
            price_to: '',
            year_from: '',
            year_to: '',
        }
    }
    
    setFilterName = (value) =>
    {
        var newState = Object.assign({}, this.state);
        newState.filter.name = value;
        this.setState(newState);
    }

    setFilterPriceFrom = (value) =>
    {
        var newState = Object.assign({}, this.state);
        newState.filter.price_from = value;
        this.setState(newState);
    }

    setFilterPriceTo = (value) =>
    {
        var newState = Object.assign({}, this.state);
        newState.filter.price_to = value;
        this.setState(newState);
    }

    setFilterYearFrom = (value) =>
    {
        var newState = Object.assign({}, this.state);
        newState.filter.year_from = value;
        this.setState(newState);
    }

    setFilterYearTo = (value) =>
    {
        var newState = Object.assign({}, this.state);
        newState.filter.year_to = value;
        this.setState(newState);
    }

    fetchBooks = () =>
    {
        var message = {
            category: this.props.category,
            per_page: this.state.per_page,
            page: this.state.page,
            name: this.state.filter.name,
            price_from: this.state.filter.price_from,
            price_to: this.state.filter.price_to,
            year_from: this.state.filter.year_from,
            year_to: this.state.filter.year_to
        };

        var _this = this;
        fetch('/search/category?' + new URLSearchParams(message))
            .then(response => response.json())
            .then(function(data){
                var newState = Object.assign({}, _this.state);
                newState.searched_books.books = data.books;
                newState.searched_books.total = data.total;
                _this.setState(newState);
            });
    }

    componentDidMount()
    {
        this.fetchBooks();
    }

    handlePageChange = (event, value) => 
    {
        var newState = Object.assign({}, this.state);
        newState.page = value;
        this.setState(newState, () => {
            this.fetchBooks()
        });
    }

    handlePerPageChange = (event) =>
    {
        var newState = Object.assign({}, this.state);
        newState.per_page = event.target.value;
        console.log(newState);
        this.setState(newState, () => {
            this.fetchBooks()
        });
    }

    createBookItem = (idx, book) =>
    {
        return(<td key={idx}><BookItem id={book.id} author={book.author} title={book.title} base64={book.base64} price={book.price} year={book.release_year}/></td>);   
    }

    createTable = () =>
    {
        var table = [];
        var imgs_per_row = 6;
        var nr_of_rows = Math.floor(this.state.searched_books.books.length / imgs_per_row) + (this.state.searched_books.books.length % imgs_per_row === 0 ? 0 : 1);
        var book = null;
        for(var i=0; i < nr_of_rows; i++)
        {
            var row = [];
            
            for(var j=0; j < 6; j++)
            {
                var idx = i * imgs_per_row + j;
                book = this.state.searched_books.books[idx];
                if(book)
                {
                    var bookItem = this.createBookItem(idx, book)
                    row.push(bookItem);
                }    
            }
            table.push(<tr key={i}>{row}</tr>)
        }

        if(nr_of_rows === 0)
        {
            table.push(<tr key={0}>
                <td colSpan="6">
                    <span>No books found.</span>
                </td>
            </tr>)
        }
        return table;
    }

    render()
    {
        return(
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link  to="/">Home</Link>
                    <Link  to={this.props.match.path}>{this.props.category}</Link>
                </Breadcrumbs>
                <Filters setFilterName={this.setFilterName} setFilterPriceFrom={this.setFilterPriceFrom} 
                    setFilterPriceTo={this.setFilterPriceTo} setFilterYearFrom={this.setFilterYearFrom} setFilterYearTo={this.setFilterYearTo}
                    fetchBooks={this.fetchBooks}/>
                <div className="search_category_box">
                <span>{this.props.category.toUpperCase()}</span>
                </div>
                <div className="navigation_bar">
                    <div>
                        <ul className="toolbar">
                            <li className="li_per_page">
                                <div className="per_page">
                                    <span>Arata:</span>
                                    <select value={this.state.per_page} onChange={this.handlePerPageChange}>
                                        {
                                            this.state.per_page_options.map((item,i) => <option key={i}>{item}</option>)
                                        }
                                    </select>
                                </div>
                            </li>
                            <li>
                                <Pagination count={Math.floor(this.state.searched_books.total / this.state.per_page) + (this.state.searched_books.books.total % this.state.per_page === 0 ? 0 : 1)} page={this.state.page} className="paginationWidget" onChange={this.handlePageChange} showFirstButton showLastButton/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="book_list container-flex d-flex">
                    <table>
                        <tbody>
                        {
                            this.createTable()
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default DisplayBooks;