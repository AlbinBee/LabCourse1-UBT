import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Switch, Route } from "react-router-dom";
import Login from '../login/login';
import Register from '../register/register';
import Cv from '../cv/cv';
import ActivityDashboard from '../activities/dashboard/ActivityDashboard';
import { IActivity } from '../../app/models/activity';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import Explore from '../explore/Explore';
import ActivityPage from '../ActivityPage';
import Homepage from '../homepage/homepage';
import { Container } from 'semantic-ui-react';
import AdminDashboard from '../adminDashboard/adminDashboard';
import NotFound from '../../app/layout/NotFound';
import { toast } from 'react-toastify';

const Router = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [activity, setActivity] = useState<IActivity>();
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

    return (
        <div className='routerContainer'>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Homepage />
                    )}
                />
                <Route
                    exact
                    path="/login"
                    render={() => (
                        <Login />
                    )}
                />
                <Route
                    exact
                    path="/register"
                    render={() => (
                        <Register />
                    )}
                />
                <Route exact path='/activities' render={() => (
                    <ActivityDashboard
                        activities={activities}
                        selectActivity={handleSelectActivity}
                        selectedActivity={selectedActivity}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        setSelectedActivity={setSelectedActivity}
                        createActivity={handleCreateActivity}
                        editActivity={handleEditActivity}
                        deleteActivity={handleDeleteActivity}
                        submitting={submitting}
                        target={target}
                    />
                )} />
                <Route path='/explore' exact render={() => (
                    <Explore activities={activities} />
                )} />
                <Route
                    exact
                    path="/cv"
                    render={() => (
                        <Cv />
                    )}
                />
                <Route
                    path="/dashboard"
                    render={() => (
                        <AdminDashboard />
                    )}
                />
                {activities.map((activity) => (
                    <Route path={`/explore/${activity.id}`} key={activity.id} render={() => (
                        <Container style={{ marginTop: '8em' }}>
                            <ActivityPage key={activity.id} activity={activity} />
                        </Container>
                    )} />
                ))}


                <Route component={NotFound} />
            </Switch>


        </div>
    );
}


export default Router