import React from 'react';

import NewsLetterBar from './NewsLetterBar';
import FooterLinks from './FooterLinks';

class Footer extends React.Component
{
    render()
    {
        return (
            <div>
                <NewsLetterBar/>
                <FooterLinks/>
            </div>
        );
    }
}

export default Footer;