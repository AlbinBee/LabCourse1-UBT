import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import Navbar from '../../Components/nav/Navbar';
import Footer from '../../Components/footer/footer'
import ActivityDashboard from '../../Components/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { Route, useLocation } from 'react-router-dom';
import Router from '../../Components/router/router';

const App = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity])
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(() => setSubmitting(false));
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
      {/* divide the whole component in three pieces 1.navbar - 2.router - 3.footer*/}
      {notDashboard && <Navbar openCreateForm={handleOpenCreateForm} />}
      <Router />
      {notDashboard && <Footer />}
    </Fragment>
  );
}

export default App;