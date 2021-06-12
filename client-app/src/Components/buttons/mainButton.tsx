import React from 'react'
import Button from '@material-ui/core/Button';
import './style.css'

const MainButtonIcon = (props: any) => {
    return (
        <Button {...props} variant="contained" color="primary" className='mainButton' >
            <span className='mainButtonTitle mainButtonTitleIcon'>{props.title}</span>
            <img src={props.icon} alt="mainBtn" className='mainButtonIcon' />
        </Button>

    )
}
const MainButton = (props: any) => {
    return (
        <Button variant="contained" {...props} color="primary" className='mainButton' >
            <span className='mainButtonTitle'>{props.title}</span>
        </Button>

    )
}

export {MainButtonIcon, MainButton}
