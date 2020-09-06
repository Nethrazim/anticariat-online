import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

import './Filters.css'

class Filters extends React.Component
{
    state = {
        search: {
            name: '',
            price: {
                from: '1',
                to: ''
            },
            years: {
                from: '',
                to: ''
            }
        }
    };

    removeFilter = (filter) =>
    {
        var newState = Object.assign({}, this.state);
        switch(filter) {
            case 'name':
                newState.search.name = '';
                this.setState(newState, () => this.props.setFilterName(this.state.search.name));
                break;
            case 'price':
                newState.search.price.to = '';
                this.setState(newState, () => {
                    this.props.setFilterPriceTo(this.state.search.price.to)
                });
                break;
            case 'year': 
                newState.search.years.from = '';
                newState.search.years.to = '';
                this.setState(newState, () => {
                    this.props.setFilterYearFrom(this.state.search.years.from)
                    this.props.setFilterYearTo(this.state.search.years.to)
                });
                break;
            default:
                break;
        };
    }

    handleSearch = (event) =>
    {
        this.props.fetchBooks();
    }

    handleSearchNameChange = (event) =>
    {
        var newState = Object.assign({}, this.state);
        newState.search.name = event.target.value;
        this.setState(newState, () => this.props.setFilterName(this.state.search.name));
    }

    handlePriceFromChange = (event) =>
    {   
        var newState = Object.assign({}, this.state);
        newState.search.price.from = event.target.value;
        this.setState(newState, () => this.props.setFilterPriceFrom(this.state.search.price.from));
    }

    handlePriceToChange = (event) =>
    {
        var newState = Object.assign({}, this.state);
        newState.search.price.to = event.target.value;
        this.setState(newState, () => this.props.setFilterPriceTo(this.state.search.price.to));   
    }

    handleYearFromChange = (event) =>
    {
        var newState = Object.assign({}, this.state);
        newState.search.years.from = event.target.value;
        this.setState(newState, () => this.props.setFilterYearFrom(this.state.search.years.from));
    }

    handleYearToChange = (event) =>
    {
        var newState = Object.assign({}, this.state);
        newState.search.years.to = event.target.value;
        this.setState(newState, () => this.props.setFilterYearTo(this.state.search.years.to));
    }

    render()
    {
        return(
            <div className="filter">
            <ul className="filters">
                <li className="title_wrappper">
                    <span className="title">FILTRE</span>
                    <hr/>
                </li>
                <li>
                    <Accordion className="filter_name" defaultExpanded>
                        <AccordionSummary>
                            <span>FILTRARE NUME</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <input type="text" name="search_in_category" value={this.state.search.name} onChange={this.handleSearchNameChange}/>
                                <button className="search_in_category_icon" onClick={this.handleSearch}>
                                    <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                                        <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                    </svg>
                                </button>
                                <button className="remove_filter" onClick={() => this.removeFilter('name')}>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                                        <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                                    </svg>  
                                </button>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </li>
                <li>
                    <Accordion className="filter_price" defaultExpanded>
                        <AccordionSummary>
                            <span>FILTRARE PRET</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="filter_box">
                                <input type="text" name="priceFrom" className="price" value={this.state.search.price.from} readOnly/>
                                    &nbsp;-&nbsp;
                                <input type="text" name="priceTo" className="price" value={this.state.search.price.to} onChange={this.handlePriceToChange}/>
                                <span>&nbsp;lei&nbsp;</span>
                                <button className="search_in_category_icon" onClick={this.handleSearch}>
                                    <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                                        <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                    </svg>
                                </button>
                                <button className="remove_filter" onClick={() => this.removeFilter('price')}>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                                        <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                                    </svg>  
                                </button>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </li>
                <li>
                    <Accordion className="filter_years" defaultExpanded>
                        <AccordionSummary>
                            <span>FILTRARE ANI</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="filter_box"> 
                                <input type="text" name="yearFrom" className="years" value={this.state.search.years.from} onChange={this.handleYearFromChange}/>
                                    &nbsp;-&nbsp;
                                <input type="text" name="yearTo" className="years" value={this.state.search.years.to} onChange={this.handleYearToChange}/>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="search_in_category_icon" onClick={this.handleSearch}>
                                    <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                                        <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                    </svg>
                                </button>
                                <button className="remove_filter" onClick={() => this.removeFilter('year')}>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                                        <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                                    </svg>  
                                </button>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </li>
            </ul>
        </div>
        );
    }
}


export default Filters;