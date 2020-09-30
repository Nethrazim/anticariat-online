import React from 'react';
import Slider from '@material-ui/core/Slider';
import Pagination from "@material-ui/lab/Pagination";
import './BooksWithPriceReductions.css';
import BookItem from '../BookComponents/BookItem';

class BooksWithPriceReductions extends React.Component
{
    state = {
        isLoading: false,
        filter: {
            author: '',
            title: '',
            price: [1, 50],
            range: [1, 500],
            total: 0,
            page: 1,
            per_page: 20
        },
        books: []
    };

    handlePriceChange = (event, newValue) => {
        this.setState(Object.assign({}, this.state, {filter:{...this.state.filter, price: newValue}}));
    }

    handleAuthorChange = (event) => {
        this.setState(Object.assign({}, this.state, {filter:{...this.state.filter, author: event.target.value}}));
    }

    handleTitleChange = (event) => {
        this.setState(Object.assign({}, this.state, {filter:{...this.state.filter, title: event.target.value}}));
    }

    handlePageChange = (event, newValue) => 
    {
        this.setState(Object.assign({}, this.state, {filter: {...this.state.filter, page:newValue}}), () => {
            this.fetchBooks()
        })
    }

    handlePriceFrom = (event) => 
    {
        if(parseInt(event.target.value))
        {
            var newPrice = this.state.filter.price;
            newPrice[0] = event.target.value;
    
            this.setState(Object.assign({}, this.state, {filter: {...this.state.filter, price: newPrice}}));    
        }
    }

    handlePriceTo = (event) => 
    {
        if(parseInt(event.target.value))
        {
            var newPrice = this.state.filter.price;
            newPrice[1] = event.target.value;

            this.setState(Object.assign({}, this.state, {filter: {...this.state.filter, price: newPrice}}));    
        }
    }

    createBookItem = (idx, book) =>
    {
        return(<td key={idx}><BookItem book={book}/></td>);   
    }

    createTable = ()  =>
    {
        var table = [];
        var imgs_per_row = 6;
        var nr_of_rows = Math.floor(this.state.books.length / imgs_per_row) + (this.state.books.length % imgs_per_row === 0 ? 0 : 1);
        var book = null;

        for(var i=0; i < nr_of_rows; i++)
        {
            var row = [];
            
            for(var j=0; j < 6; j++)
            {
                var idx = i * imgs_per_row + j;
                book = this.state.books[idx];
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

    fetchBooks = () =>
    {
        this.setState(Object.assign({}, this.state, {isLoading: true}));

        var message = {
            per_page: this.state.filter.per_page,
            page: this.state.filter.page,
            author: this.state.filter.author,
            title: this.state.filter.title,
            price_from: this.state.filter.price[0],
            price_to: this.state.filter.price[1],
        };

        var _this = this;
        fetch('/search/price_reductions?' + new URLSearchParams(message))
            .then(response => response.json())
            .then(function(data){
                var newState = Object.assign({}, _this.state);
                newState.books = data.books;
                newState.filter.total = data.total;
                newState.isLoading = false;
                _this.setState(newState);
            });
    }

    componentDidMount()
    {
        this.fetchBooks();
    }

    render()
    {
        return(<div className="container books_with_price_reductions_page">
                    <div className="row">
                        <div className="col-md-12">
                            <span>Filtre:</span>
                        </div>
                    </div>
                    <div className="row filter_row">
                        <div className="col-md-4">
                            <div className="filters filter_author">
                                <span>Autor: </span>
                                <input type="text" value={this.state.filter.author}  onChange={this.handleAuthorChange.bind(this)}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="filters filter_author">
                                <span>Titlu: </span>
                                <input type="text" value={this.state.filter.title}  onChange={this.handleTitleChange.bind(this)}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="filters filter_price_slider">
                                <div className="d-flex">
                                    <span className="price">Pret:</span>
                                    <Slider 
                                        value={this.state.filter.price}
                                        onChange={this.handlePriceChange.bind(this)}
                                        min={this.state.filter.range[0]}
                                        max={this.state.filter.range[1]}
                                    />
                                </div>
                                <div className="filter_price">
                                    <span>De la:</span><input className="price_input price_from" type="text" value={this.state.filter.price[0]} onChange={this.handlePriceFrom.bind(this)}/>
                                    <span className="filter_spacing">pana la :</span><input className="price_input price_to" type="text" value={this.state.filter.price[1]} onChange={this.handlePriceTo.bind(this)}/>                                    
                                    <span className="filter_spacing">RON</span>
                                </div>
                                <div className="search_btn_wrapper">
                                    <button onClick={this.fetchBooks.bind(this)} className="search_btn">CAUTA</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-12">
                            <div className="filters filter_pagination">
                            <Pagination 
                                count={Math.floor(this.state.filter.total / this.state.filter.per_page) + (this.state.total % this.state.filter.per_page === 0 ? 0 : 1)} 
                                page={this.state.filter.page} 
                                className="paginationWidget" 
                                onChange={this.handlePageChange.bind(this)} 
                                showFirstButton 
                                showLastButton/>
                            </div>
                        </div>
                    </div>

                    <div className="row table_row">
                        <div className="col-md-12">
                            <div className="table_wrapper">
                                <table>
                                    <tbody>
                                        {
                                            this.createTable()
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>);
    }
}



export default BooksWithPriceReductions;