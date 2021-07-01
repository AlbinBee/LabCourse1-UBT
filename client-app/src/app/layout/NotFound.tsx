import React from 'react';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Page404 from "../../Components/assets/404Page.svg";
import { MainButton } from '../../Components/buttons/mainButton';

const NotFound = () => {
    return (
        <Container style={{ marginTop: '8em' }}>
            <div className='NotFoundContainer'>
                <div className='NotFoundImgContainer'>
                    <img src={Page404} alt="NotFound" className='Page404Img' />
                </div>
                <div className='NotFoundContentContainer'>
                    <h2>Uh Oh! Looks like the page went on vacation.</h2>
                    <h5 className='NotFoundSpanTxt'> We've looked everywhere but couldn't find this page</h5>
                    <Link to='/' className='NotFoundGoBack'>
                        <MainButton title={'Return to Homepage'} />
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default NotFound;