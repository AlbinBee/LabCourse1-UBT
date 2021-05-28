import React, { Fragment } from 'react';
import { Button, Container, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Router from '../../Components/router/router';

const Homepage = () => {

    return (
        <Container style={{ marginTop: '7em' }}>
            <h1>Welcome Home</h1>
            <Link to='/home' >
                <Button positive content='Edit Activities' />
            </Link>
            <span style={{ marginLeft: "20px", marginRight: "20px" }}>Or</span>
            <Link to='/explore' >
                <Button content='Explore Activities' color='blue' />
            </Link>
        </Container>
    );
}

export default Homepage;