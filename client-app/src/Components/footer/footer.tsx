import React from 'react';
import './style/style.css';
import Logo from '../assets/Logo_Text.svg';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import dashboardIconWhite from '../assets/Icons/dashboard-white.svg';

const Footer = () => {
    return (
        <div className='footerContainer'>
            <div className='footerContent'>
                <div>
                    <img src={Logo} className='footerLogo' alt="logo" />
                    <p className='footerAboutUs'>
                        posto-ks is a market-leading provider of digital marketing services, using proprietary tools and methodologies to generate high-value engagement for our customers.
                    </p>
                </div>
                <div className='footerMenuSocial'>
                    <div className='footerMenu'>
                        <Link to='/'>
                            <Menu.Item
                                className="navItem"
                                name='Home'
                            />
                        </Link>
                        <Link to='/activities'>
                            <Menu.Item
                                className="navItem"
                                name='Activities'
                            />
                        </Link>
                        <Link to='/explore'>
                            <Menu.Item
                                className="navItem"
                                name='Explore'
                            />
                        </Link>
                        {/* <Link to='/login'>
                            <Menu.Item
                                className="navItem navItemLogin"
                                name='Log In'
                            />
                        </Link>
                        <Link to='/register'>
                            <Menu.Item
                                className="navItem navItemLogin"
                                name='Sign Up'
                            />
                        </Link> */}
                    </div>
                    <div className='footerSocial'>
                        <Link to='/dashboard'><button className='footerDashboard'><img src={dashboardIconWhite} alt="icon" /><span>Dashboard</span></button></Link>
                    </div>
                </div>
            </div>
            <div className='footerCopyright'>
                <p>All rights reserved Posto-ks | Copyright @2021 </p>
            </div>
        </div>
    )
}
export default Footer;