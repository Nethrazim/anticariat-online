import React from 'react';

import Logo from './Logo';
import SearchBoxInput from './SearchBoxInput';
import AccountBtnBox from './AccountBtnBox';
import ContactBtnBox from './ContactBtnBox';
import CartBtnBox from './CartBtnBox';

class TopSearchBox extends React.Component
{
    render() {
        return(
            <div className="row d-flex justify-content-center">
                <Logo/>
                <SearchBoxInput/>
                <ContactBtnBox/>
                <CartBtnBox/>
                <AccountBtnBox/>
            </div>
        );
    }
}

export default TopSearchBox;