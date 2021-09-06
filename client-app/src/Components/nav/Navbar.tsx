import React, { Fragment, useEffect, useState } from 'react'
import { Container, Dropdown, Menu } from 'semantic-ui-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { history } from '../..';
import './style/style.css';
import { IUser } from '../../app/models/user';
import Avatar from '../assets/Icons/avatar.svg';
import Hamburger from '../assets/Icons/hamburger.svg';
import HamburgerClose from '../assets/Icons/hamburger-close.svg';
import Dashboard from '../assets/Icons/dashboard-active.svg';
import User from '../assets/Icons/users-active.svg';
import Logout from '../assets/Icons/logout-active.svg';
import ArrowDown from '../assets/Icons/arrow-down.svg';
import Search3D from '../assets/Icons/search-3d.svg';
import { toast } from 'react-toastify';
import mainStates from '../../app/state/mainStates';

const Navbar = () => {
    const [user, setUser] = useState<IUser | null>();
    const [openSearch, setOpenSearch] = useState(false)
    const location = useLocation();
    const pathName = location.pathname;
    const userFromTs = mainStates.user;

    let canCreate;
    if (pathName === '/activities') {
        canCreate = true;
    } else {
        canCreate = false;
    }
    const handleOpenSearch = () => {
        setOpenSearch(!openSearch);
    }

    const handleLogout = () => {
        toast.success('Successfully logged out!')
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.setItem('isLoggedIn', 'false');
        setUser(null);
        setTimeout(function () {
            history.push('/login');
            window.location.reload();
        }, 1000);
    }

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')!));
    }, [])
    return (
        <Fragment>
            <Menu fixed='top' inverted>
                <Container className="navContainer">
                    <div className="navContent">
                        <div className='navContentLinks'>
                            <div className="navItem">
                                <NavLink exact to='/' activeClassName="activeLink">
                                    Home
                                </NavLink>
                            </div>
                            <div className="navItem">
                                <NavLink exact to='/categories' activeClassName="activeLink">
                                    Categories
                                </NavLink>
                            </div>
                            <div className="navItem">
                                <NavLink exact to='/events' activeClassName="activeLink">
                                    Events
                                </NavLink>
                            </div>
                            {/* <div className="navItem">
                                <NavLink exact to='/activities' activeClassName="activeLink">
                                    Activities
                                </NavLink>
                            </div>
                            <div className="navItem">
                                <NavLink exact to='/explore' activeClassName="activeLink">
                                    Explore
                                </NavLink>
                            </div> */}
                        </div>
                        <div className='navContentLogo'>
                            <Link to='/'>
                                <Menu.Item header>
                                    <img src="/assets/Logo_Text.svg" id="navbar-logo" alt="logo" />
                                </Menu.Item>
                            </Link>
                        </div>
                        <div className='navContentHamburger'>
                            <img src={Hamburger} alt="Hamburger" />
                        </div>
                        <div className='navContentSearch'>
                            <img src={Search3D} alt='search' onClick={handleOpenSearch} className='searchIconNavbar' />
                            {user !== null ?
                                <Fragment>
                                    <Menu.Item position='right'>
                                        <img src={user?.image || Avatar} alt='userImg' className='userAccountImg' />
                                        <Dropdown className='navbarUserName' text={user?.displayName}>
                                            <Dropdown.Menu>
                                                {
                                                    userFromTs != null && userFromTs.roles.includes("Admin") &&
                                                    <div className='navbarDropdownMenuItem'>
                                                        <img src={Dashboard} alt='dashboard' />
                                                        <Dropdown.Item className='navbarDropdownMenuLink' as={Link} to={'/dashboard'} text='Dashboard' />
                                                    </div>
                                                }
                                                <div className='navbarDropdownMenuItem'>
                                                    <img src={User} alt='userAccount' />
                                                    <Dropdown.Item className='navbarDropdownMenuLink' as={Link} to={`/profile/${user?.displayName}`} text='My Profile' />
                                                </div>
                                                <div className='navbarDropdownMenuItem' onClick={handleLogout}>
                                                    <img src={Logout} alt='logout' />
                                                    <Dropdown.Item className='navbarDropdownMenuLink' text='Logout' />
                                                </div>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <img src={ArrowDown} className='dropdownArrow' alt="arrowDown" />
                                    </Menu.Item>
                                </Fragment>
                                :
                                <div>
                                    <Link to='/login'>
                                        <Menu.Item
                                            className="navItem navItemLogin"
                                            name='Log In'
                                        />
                                    </Link>
                                    <Link to='/register'>
                                        <Menu.Item
                                            className="navItem navItemRegister"
                                            name='Sign Up'
                                        />
                                    </Link>
                                </div>
                            }
                        </div>
                        {openSearch &&
                            <div className='searchInputField'>
                                <input type="text" placeholder='Search' />
                            </div>
                        }
                    </div>
                </Container>
            </Menu>
        </Fragment>

    )
}
export default Navbar