import React from 'react';
import BookItem from '../BookComponents/BookItem';
import LinearProgress from "@material-ui/core/LinearProgress";

import './SearchResults.css';

class SearchResults extends React.Component
{
    qs = require('qs');

    state = {
        isLoading: false,
        searchValue: this.qs.parse(this.props.location.search)['?search'],
        books: []
    }

    fetchBooks = () => 
    {
        this.setState(Object.assign({}, this.state, {isLoading: true}));

        var message = {
            search: this.state.searchValue
        };

        var _this = this;
        fetch('/search/name?' + new URLSearchParams(message))
            .then(response => response.json())
            .then(function(data){
                _this.setState(Object.assign({}, _this.state, {isLoading: false, books: data}));
            });
    }

    componentDidMount() {
        this.fetchBooks();
    }

    componentDidUpdate(prevProps)
    {
        if(prevProps.location.search !== this.props.location.search)
        {
            this.setState({...this.state, searchValue: this.qs.parse(this.props.location.search)['?search']}, () => {
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
                            <BookItem id={item.id} author={item.author} title={item.title} base64={item.base64} price={item.price} year={item.release_year}/>
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
        return(<div className="container search_results_page">
             <div className="row">
                <div className="col-md-12">
                    {
                        this.state.isLoading === true && <LinearProgress/>
                    }
                </div>
            </div>
            <div className="container book_results_grid">
                {this.createGrid()}
            </div>
        </div>);
    }
}


export default SearchResults;