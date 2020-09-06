import React from 'react';

import { addArticle } from "../../js/actions/index";
import { connect } from "react-redux";

import './SearchBoxInput.css';

function mapDispatchToProps(dispatch) {
    return {
        addArticle: article => dispatch(addArticle(article))
    };
}

class SearchBox extends React.Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
          searchValue: ''  
        };
    }

    handleChangeSearchValue = (event) => {
        this.setState({
            searchValue: event.target.value
        });;
    }

    handleSubmit = (event) => {
        const { searchValue } = this.state;
        this.props.addArticle(searchValue);
    }

    render()
    {
        return(
            <div className="search_box_input">
                <input type="search" value={this.state.searchValue} onChange={this.handleChangeSearchValue} placeholder="Cauta titlu, autor sau editura"/>
                <span className="search_box_btn" onClick={this.handleSubmit}>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-search" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                        <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                    </svg>
                </span>
            </div>   
        );
    }
}

const SearchBoxInput = connect(null, mapDispatchToProps)(SearchBox);
export default SearchBoxInput;