import React from 'react';

/*css*/
import './FooterLinks.css';

/*Components */
import FooterLink from './FooterLink';
class FooterLinks extends React.Component
{
    render()
    {
        return( 
            <div className="row footer_links_box">
                <div className="col-sm-3 flb_col_width">
                    <div>
                        <ul>
                            <li className="list_title">
                                <span>INFORMATII</span>
                            </li>
                            <li>
                                <FooterLink link_text="Cumparam carti"/>
                            </li>
                            <li>
                                <FooterLink link_text="Despre noi"/>
                            </li>
                            <li>
                                <FooterLink link_text="Politica de returnare"/>
                            </li>
                            <li>
                                <FooterLink link_text="Cum platesc?"/>
                            </li>
                            <li>
                                <FooterLink link_text="Informatii despre livrare"/>
                            </li>
                            <li>
                                <FooterLink link_text="Prelucrarea datelor cu caracter personal"/>
                            </li>
                            <li>
                                <FooterLink link_text="Termeni si conditii"/>
                            </li>
                            <li>
                                <FooterLink link_text="Politica de utilizare Cookie-uri"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-3 flb_col_width">
                    <div>
                        <ul>
                            <li className="list_title">
                                <span>SERVICII CLIENTI</span>
                            </li>
                            <li>
                                <FooterLink link_text="Contact"/>
                            </li>
                            <li>
                                <FooterLink link_text="Returnari"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-3 flb_col_width">
                    <div>
                        <ul>
                            <li className="list_title">
                                <span>UTILE</span>
                            </li>
                            <li>
                                <FooterLink link_text="Autori"/>
                            </li>
                            <li>
                                <FooterLink link_text="Edituri"/>
                            </li>
                            <li>
                                <FooterLink link_text="Idei de cadou"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-3 flb_col_width">
                    <div>
                        <ul className="account_wish_cart">
                            <li className="list_title"></li>
                            <li>
                                <FooterLink link_text="Cont"/>
                            </li>
                            <li>
                                <FooterLink link_text="Wish List"/>
                            </li>
                            <li>
                                <FooterLink link_text="Cosul meu"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}


export default FooterLinks;