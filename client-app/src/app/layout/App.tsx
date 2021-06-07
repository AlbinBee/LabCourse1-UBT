import React, { useState, useEffect, Fragment } from 'react';
import { IActivity } from '../models/activity';
import Navbar from '../../Components/nav/Navbar';
import Footer from '../../Components/footer/footer'
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useLocation } from 'react-router-dom';
import Router from '../../Components/router/router';

const App = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true)

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        // console.log(response);
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split('.')[0]
          activities.push(activity);
        })
        setActivities(activities)
      }).then(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingComponent content='Loading...' />
  }

  let notDashboard;
  if (pathName.startsWith('/dashboard')) {
    notDashboard = false;
  } else {
    notDashboard = true;
  }

  return (
    <Fragment>
      {notDashboard && <Navbar openCreateForm={handleOpenCreateForm} />}
      <Router />
      {notDashboard && <Footer />}
    </Fragment>
  );
}

export default App;