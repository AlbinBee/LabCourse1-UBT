import React, { FormEvent, useState } from 'react';
import agent from '../../app/api/agent';
import { IUser, IUserFormValues } from '../../app/models/user';
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";
import './style/style.css';
import { MainButton } from '../buttons/mainButton';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Fragment } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Button, FormControlLabel } from '@material-ui/core';
import SideImg from '../assets/registerFormSide.svg';
import Checkbox from '@material-ui/core/Checkbox';


const Register = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [checked, setChecked] = React.useState(true);
    const [userDetails, setUserDetails] = useState<IUserFormValues>({
        email: '',
        username: '',
        displayName: '',
        password: ''
    })
    const [hasEmailError, setHasEmailError] = useState(false)
    const [hasUsernameError, setHasUsernameError] = useState(false)
    const [hasPasswordError, setHasPasswordError] = useState(false)
    const [passwordType, setPasswordType] = useState('password');
    const [submitting, setSubmitting] = useState(false);

    const isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn')!);

    const emailRegex = /^([A-Za-z0-9_\-.]{3,})+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    const passwordRegex = /^[a-zA-Z0-9-!$%^&*()_@#]{5,}$/;

    const HandlePasswordType = () => {
        if (passwordType == 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    }

    const handleChecked = () => {
        setChecked(!checked);
    }

    const handleInputUserChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setUserDetails({ ...userDetails, [name]: value });
    }

    const register = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.register(userDetails);
            setUser(user);
            toast.success('Successfully registered !')
            console.log(user);
            setTimeout(function () {
                history.push('/login');
                window.location.reload();
            }, 1000);
        } catch (error) {
            throw error;
        }
    }

    const handleUserSubmit = (e: any) => {
        // e.preventDefault();
        if (!userDetails.email.match(emailRegex) || userDetails.email == "") {
            setHasEmailError(true);
            toast.error('Please enter a valid email!')
        } else if (userDetails.displayName == '' || userDetails.username == '') {
            setHasEmailError(false);
            setHasUsernameError(true);
            toast.error('Your username or display name cannot be empty!')
        }
        else if (!userDetails.password.match(passwordRegex) || userDetails.password == "") {
            setHasEmailError(false);
            setHasUsernameError(false);
            setHasPasswordError(true);
            toast.error('Please enter a valid password!')
        } else {
            setHasEmailError(false);
            setHasUsernameError(false);
            setHasPasswordError(false);
            register(userDetails).catch(error => (
                toast.error('There was a problem logging you in!')
            ));
        }
    }

    return (
        <div className='registerContainer'>
            {!isLoggedIn
                ? <Fragment>
                    <div className='loginFormContainer'>
                        <div className='loginFormContent'>
                            <div className='loginFormLeftSide'>
                                <h2 className='loginHeaderText'>Register Now</h2>
                                <TextField
                                    error={hasEmailError}
                                    onChange={handleInputUserChange}
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    className='editPrimaryInputField registerInputField asdasdasdasdads'
                                />
                                <TextField
                                    error={hasUsernameError}
                                    onChange={handleInputUserChange}
                                    required
                                    id="outlined-required"
                                    label="Display Name"
                                    name="displayName"
                                    variant="outlined"
                                    className='editPrimaryInputField registerInputField'
                                />
                                <TextField
                                    error={hasUsernameError}
                                    onChange={handleInputUserChange}
                                    required
                                    id="outlined-required"
                                    label="Username"
                                    name="username"
                                    variant="outlined"
                                    className='editPrimaryInputField registerInputField'
                                />
                                <TextField
                                    error={hasPasswordError}
                                    onChange={handleInputUserChange}
                                    required
                                    id="outlined-required"
                                    label="Password"
                                    name="password"
                                    type={passwordType}
                                    InputProps={{
                                        endAdornment: passwordType == 'password'
                                            ? <Button><VisibilityOff onClick={HandlePasswordType} /></Button>
                                            : <Button><Visibility onClick={HandlePasswordType} /></Button>
                                        ,
                                    }}
                                    variant="outlined"
                                    className='editPrimaryInputField'
                                />
                                {/* <Message error>
                                <Message.Header>{error.statusText}</Message.Header>
                                {error.data && Object.keys(error.data.errors).length > 0  && (
                                    <Message.List>
                                        {Object.values(error.data.errors).flat().map((err, i) => (
                                            <Message.Item key={i}>
                                                {error}
                                            </Message.Item>
                                        ))}
                                    </Message.List>
                                )}
                            </Message> */}
                                <div className='termsAndConditionsCheckbox'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={handleChecked}
                                                name="checkBox"
                                                color="primary"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                        }
                                        label={
                                            <span>I Agree to <a href="#" className='termsAndConditions'>Terms & Conditions</a></span>
                                        }
                                    />
                                </div>
                                <div className='submitEditBtn'>
                                    <button className='submitEditBtn' onClick={handleUserSubmit}>
                                        <MainButton title='Submit' component='a' loading={submitting} />
                                    </button>
                                </div>
                                <span className='loginHelpEmail'>
                                    Support: &nbsp;<a href="#">help@post-ks.com</a>
                                </span>
                            </div>
                            <div className='registerFormRightSide'>
                                <img src={SideImg} alt="formRegister" />
                            </div>
                        </div>
                    </div>
                </Fragment>
                : <Fragment>
                    <Redirect to='/' />
                </Fragment>
            }
        </div >
    )
}


export default Register