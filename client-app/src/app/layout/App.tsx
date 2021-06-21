import React, { useState, useEffect, Fragment } from 'react';
import Navbar from '../../Components/nav/Navbar';
import Footer from '../../Components/footer/footer'
import agent from '../api/agent';
import { useLocation, Route } from 'react-router-dom';
import Router from '../../Components/router/router';
import { IUser } from '../models/user';

const App = () => {

  const location = useLocation();
  const pathName = location.pathname;
  const [user, setUser] = useState<IUser | null>();
  const tokenFromSession = sessionStorage.getItem('token')!;
  const [token, setToken] = useState<string | null>(tokenFromSession);

  const getUser = async () => {
    try {
      const user = await agent.User.current();
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      // console.log('token from app: ' + token);
      getUser();
    }
  }, [token]);

  let notAdminDashboard;
  if (pathName.startsWith('/dashboard')) {
    notAdminDashboard = false;
  } else {
    notAdminDashboard = true;
  }

  return (
    <Fragment>
      {notAdminDashboard && <Navbar />}
      <Router />
      {notAdminDashboard && <Footer />}
    </Fragment>
  );
}

export default App;