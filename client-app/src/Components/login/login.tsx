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
import { Button } from '@material-ui/core';
import SideImg from '../assets/loginFormSide.svg';
import CircularProgress from '@material-ui/core/CircularProgress';

const Login = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [userDetails, setUserDetails] = useState<IUserFormValues>({
        email: '',
        password: ''
    })
    const [hasEmailError, setHasEmailError] = useState(false)
    const [hasPasswordError, setHasPasswordError] = useState(false)
    const [passwordType, setPasswordType] = useState('password');
    const [submitting, setSubmitting] = useState(false);

    const isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn')!);

    const emailRegex = /^([A-Za-z0-9_\-.]{3,})+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    const passwordRegex = /^[a-zA-Z0-9-!$%^&*()_@#]{5,}$/;

    const HandlePasswordType = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    }

    const handleInputUserChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setUserDetails({ ...userDetails, [name]: value });
    }
    const login = async (values: IUserFormValues) => {
        setSubmitting(true);
        try {
            const user = await agent.User.login(userDetails);
            setUser(user);
            user.email = userDetails.email;
            setSubmitting(false);
            toast.success('Successfully logged in !')
            sessionStorage.setItem('token', user.token)
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('isLoggedIn', 'true');
            setTimeout(function () {
                window.location.reload();
                setTimeout(function () {
                    history.push('/');
                }, 500);
            }, 1000);
        } catch (error) {
            throw error;
        }
    }

    const handleUserSubmit = (e: any) => {
        setSubmitting(true);
        // e.preventDefault();
        if (!userDetails.email.match(emailRegex) || userDetails.email === "") {
            setHasEmailError(true);
            toast.error('Your email is incorrect!')
            setSubmitting(false);
        } else if (!userDetails.password.match(passwordRegex) || userDetails.password === "") {
            setHasEmailError(false);
            setHasPasswordError(true);
            toast.error('Your password is incorrect!')
            setSubmitting(false);
        } else {
            setHasEmailError(false);
            setHasPasswordError(false);
            login(userDetails).catch(error => (
                toast.error(error.data.errors.User),
                toast.error('There was a problem logging you in!'),
                setSubmitting(false)
            ));
        }
    }

    return (
        <div className='loginContainer'>
            {!isLoggedIn
                ? <Fragment>
                    <div className='loginFormContainer'>
                        <div className='loginFormContent'>
                            <div className='loginFormLeftSide'>
                                <h2 className='loginHeaderText'>Login</h2>
                                <TextField
                                    error={hasEmailError}
                                    onChange={handleInputUserChange}
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    className='editPrimaryInputField loginInputField'
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
                                        endAdornment: passwordType === 'password'
                                            ? <Button onClick={HandlePasswordType}><VisibilityOff /></Button>
                                            : <Button onClick={HandlePasswordType}><Visibility /></Button>
                                        ,
                                    }}
                                    variant="outlined"
                                    className='editPrimaryInputField'
                                />
                                <div className='submitEditBtn'>
                                    <button className='submitEditBtn' onClick={handleUserSubmit}>
                                        {submitting ? <CircularProgress size={24} />
                                            : <MainButton title='Login' component='a' />
                                        }
                                    </button>
                                </div>
                                <span className='loginHelpEmail'>
                                    Support: &nbsp;<a href="#">help@post-ks.com</a>
                                </span>
                            </div>
                            <div className='loginFormRightSide'>
                                <img src={SideImg} alt="formLogin" />
                            </div>
                        </div>
                    </div>
                </Fragment>
                : <Fragment>
                    <Redirect to='/' />
                </Fragment>
            }
        </div>
    )
}


export default Login