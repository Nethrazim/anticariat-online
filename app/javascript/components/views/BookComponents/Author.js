import React from 'react';
import BookItem from '../BookComponents/BookItem';
import LinearProgress from "@material-ui/core/LinearProgress";
import Pagination from "@material-ui/lab/Pagination";

import './Author.css';

class Author extends React.Component
{

    qs = require('qs');

    state = {
        isLoading: false,
        page: 1, 
        per_page: 20,
        per_page_options: [10, 20, 40],
        total: 0,
        searchValue: this.props.match.params.author_name,
        books: []
    }

    fetchBooks = () => 
    {
        this.setState(Object.assign({}, this.state, {isLoading: true}));

        var message = {
            search: this.state.searchValue,
            page: this.state.page,
            per_page: this.state.per_page
        };

        var _this = this;
        fetch('/search/author?' + new URLSearchParams(message))
            .then(response => response.json())
            .then(function(data){
                _this.setState(Object.assign({}, _this.state, {isLoading: false, books: data.books, total: data.total}));
            });
    }

    handlePageChange = (event, value) => 
    {
        this.setState(Object.assign({}, this.state, {page:value}), () => {
            this.fetchBooks()
        })
    }

    handlePerPageChange = (event) =>
    {
        this.setState(Object.assign({}, this.state, {per_page: event.target.value}),() => {
            this.fetchBooks()
        });
    }

    componentDidMount() {
        this.fetchBooks();
    }

    componentDidUpdate(prevProps)
    {
        if(prevProps.location.search !== this.props.location.search)
        {
            this.setState({...this.state, searchValue: this.props.match.params.id}, () => {
                this.fetchBooks();
            });
        }
    }

    createGrid =() => 
    {
        var start = 0;
        var length = 6;
        var rows = [];
        for(var idx =0; idx <(Math.floor(this.state.books.length / length) + (this.state.books.length % length == 0 ? 0 : 1)); idx ++)
        {
            var sliced_books = this.state.books.slice(start, start + length); 
            var row = [];   
            sliced_books.forEach((item, i) => {
                row.push(<div key={i + idx * length} className="col-xs-2">
                            <BookItem book={item}/>
                            <hr/>
                        </div>)
            });

            rows.push(<div key = {idx} className="row book_results_grid">{row}</div>);
            start += length;
        }
        
        return rows;
    }

    render()
    {
        this.createGrid.bind(this);
        return(<div className="container author_page">
            <div className="row">
                <div className="col-md-12">
                    <span className="header">Carti ale autorului {this.state.searchValue}:</span>
                </div>
            </div>
             <div className="row">
                <div className="col-md-12">
                    {
                        this.state.isLoading === true && <LinearProgress/>
                    }
                </div>
            </div>
            <div className="row pagination_row">
                <div className="col-md-12">
                    <div className="pagination_widget">
                        <Pagination count={Math.floor(this.state.total / this.state.per_page) + (this.state.total % this.state.per_page === 0 ? 0 : 1)} page={this.state.page} className="paginationWidget" onChange={this.handlePageChange.bind(this)} showFirstButton showLastButton/>
                    </div>
                    <div className="per_page">
                        <span>Arata:</span>
                        <select value={this.state.per_page} onChange={this.handlePerPageChange.bind(this)}>
                            {
                                this.state.per_page_options.map((item,i) => <option key={i}>{item}</option>)
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className="container book_results_grid">
                {this.createGrid()}
            </div>
        </div>);
    }
}


export default Author;