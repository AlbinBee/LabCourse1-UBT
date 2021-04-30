import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';

interface IProps {
    openCreateForm: () => void;
}

export const Navbar: React.FC<IProps> = ({ openCreateForm }) => {
    const location = useLocation();
    const pathName = location.pathname;
    let homeRoute;
    if (pathName === '/home') {
        homeRoute = true;
    } else {
        homeRoute = false;
    }
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Link to='/'>
                    <Menu.Item header>
                        <img src="/assets/logo-svg.svg" alt="logo" style={{ marginRight: '10px' }} />
                    Posto-ks
                </Menu.Item>
                </Link>
                <Link to='/'>
                    <Menu.Item
                        name='Home'
                    />
                </Link>
                <Link to='/home'>
                    <Menu.Item
                        name='Activities'
                    />
                </Link>
                <Link to='/explore'>
                    <Menu.Item
                        name='Explore'
                    />
                </Link>
                <Menu.Item>
                    {homeRoute && <Button onClick={openCreateForm} positive content='Create Activity' />}
                </Menu.Item>
            </Container>
        </Menu>
    )
}
