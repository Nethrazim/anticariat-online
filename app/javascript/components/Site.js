import React from 'react';
import {Router} from 'react-router-dom';

import '../components/Site.css';

import TopSearchBox from './search_box/TopSearchBox';
import TopNav from './top_links/TopNav';
import TopHorizontalLine from './top_links/TopHorizontalLine';

import CategoryLink from './top_categories/CategoryLink';

import ViewPort from './views/ViewPort';
import Footer from './footer/Footer';

import {checkIsLoggedIn} from "../js/actions/index";
import {connect} from "react-redux";

import history from '../js/history/history';

function mapDispatchToProps(dispatch)
{
    return {
       checkIsLoggedIn: () => dispatch(checkIsLoggedIn()) 
    };
}

function mapStateToProps(state)
{
    return {
        token: state.accesstoken
    }
}
class Site extends React.Component
{
    componentDidMount()
    {
        this.checkUserIsLoggedIn();
    }
    
    checkUserIsLoggedIn = () => {
        this.props.checkIsLoggedIn(this.props.token);
    }


    render() {
        return (    
                <Router history={history}>
                <main>
                <div className="top_layout_box">
                    <div className="container-fluid">
                        <TopNav/>
                        <TopSearchBox/>
                    </div> 
                    <div className="container-fluid">
                        <div className="row d-flex justify-content-center">
                            <CategoryLink link_text="LITERATURA" link="literatura"/>
                            <CategoryLink link_text="BIBLIOFILIE" link="bibliofilie"/>
                            <CategoryLink link_text="COPII" link="copii"/>
                            <CategoryLink link_text="ARTA" link="arta"/>
                            <CategoryLink link_text="CULTURA/EDUCATIE" link="cultura_educatie"/>
                            <CategoryLink link_text="ISTORIE/ETNOGRAFIE" link="istorie_etnografie"/>
                            <CategoryLink link_text="STIINTA/TEHNICA" link="stiinta_tehnica"/>
                            <CategoryLink link_text="SPIRITUALITATE" link="spiritualitate"/>
                            <CategoryLink link_text="HOBBY/GHIDURI" link="hobby_ghiduri"/>
                            <CategoryLink link_text="LIMBA STRAINA" link="limba_straina"/>
                            <CategoryLink link_text="ALTELE" link="altele"/>
                        </div>
                    </div>
                </div>
                <TopHorizontalLine/>
                <div className="container-fluid d-flex justify-content-center">
                    <ViewPort/>
                </div>
                <div className="container-fluid d-flex justify-content-center">
                    <Footer/>
                </div>
                </main>
                </Router>
        );

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Site);
