import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import './style/style.css';

interface IProps {
    openCreateForm: () => void;
}

const Navbar: React.FC<IProps> = ({ openCreateForm }) => {
    const location = useLocation();
    const pathName = location.pathname;
    let canCreate;
    if (pathName === '/activities') {
        canCreate = true;
    } else {
        canCreate = false;
    }
    return (
        <Menu fixed='top' inverted>
            <Container className="navContainer">
                <div>
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
                    <Menu.Item>
                        {canCreate && <Button onClick={openCreateForm} positive content='Create Activity' />}
                    </Menu.Item>
                </div>
                <div>
                    <Link to='/'>
                        <Menu.Item header>
                            <img src="/assets/Logo_Text.svg" id="navbar-logo" alt="logo"/>
                        </Menu.Item>
                    </Link>
                </div>
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
            </Container>
        </Menu>
    )
}
export default Navbar