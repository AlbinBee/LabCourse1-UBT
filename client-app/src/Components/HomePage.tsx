import React from 'react'
import {Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


const HomePage = () => {
    return (
        <div>
            <h1>Welcome Home</h1>
            <Link to='/home' >
                <Button positive content='Edit Activities' />
            </Link>
            <span style={{ marginLeft: "20px", marginRight: "20px" }}>Or</span>
            <Link to='/explore' >
                <Button content='Explore Activities' color='blue'/>
            </Link>
        </div>
    )
}

export default HomePage
