import React, { Component, Fragment, useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import './style/style.css';
import AdminSidebar from './adminSidebar';
import { Route, Switch } from 'react-router-dom';
import DashboardPosts from './dashboardPosts/dashboardPosts';
import DashboarUsers from './dashboardUsers/dashboardUsers';
import DashboardSales from './dashboardSales/dashboardSales';
import DashboardMails from './dashboardMails/dashboardMails';
import DashboardSettings from './dashboardSettings/dashboardSettings';
import DashboardCv from './dashboardCv/dashboardCv';
import DashboardAds from './dashboardAds/dashboardAds';
import MainDashboard from './mainDashboard/mainDashboard';
import DashboardTasks from './dashboardTasks/dashboardTasks';
import agent from '../../app/api/agent';
import { IEvent } from '../../app/models/event';
import { IAd } from '../../app/models/ad';
import { IMyTask } from '../../app/models/myTask';
import EditPosts from './dashboardPosts/editPosts';
import EditAds from './dashboardAds/editAds';
import EditTasks from './dashboardTasks/editTasks';

const AdminDashboard = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [ads, setAds] = useState<IAd[]>([]);
    const [myTasks, setMyTasks] = useState<IMyTask[]>([]);

    useEffect(() => {
        agent.Events.list()
            .then(response => {
                // console.log(response);
                let events: IEvent[] = [];
                response.forEach((event) => {
                    event.dateCreated = event.dateCreated.split('.')[0]
                    event.dateOfEvent = event.dateOfEvent.split('.')[0]
                    events.push(event);
                })
                setEvents(events)
            });
        agent.Ads.list()
            .then(response => {
                // console.log(response);
                let ads: IAd[] = [];
                response.forEach((ad) => {
                    ad.dateCreated = ad.dateCreated.split('.')[0]
                    ad.expirationDate = ad.expirationDate.split('.')[0]
                    ads.push(ad);
                })
                setAds(ads)
            });
        agent.MyTasks.list()
            .then(response => {
                // console.log(response);
                let tasks: IMyTask[] = [];
                response.forEach((task) => {
                    task.dateCreated = task.dateCreated.split('.')[0]
                    tasks.push(task);
                })
                setMyTasks(tasks)
            });
    }, []);

    return (
        <div>
            <div className='dashboardContainer'>
                <div className='dashboardSidebar'>
                    <AdminSidebar />
                </div>
                <div className='dashboardContent'>
                    <div className="dashboardRouteContent">
                        <Switch>
                            <Route
                                exact
                                path="/dashboard/"
                                render={() => (
                                    <MainDashboard />
                                )}
                            />
                        </Switch>
                        <Switch>
                            <Route
                                exact
                                path="/dashboard/posts"
                                render={() => (
                                    <DashboardPosts />
                                )}
                            />
                        </Switch>
                        {events.map((event) => (
                            <Switch>
                                <Route
                                    exact
                                    path={`/dashboard/edit/posts/${event.id}`}
                                    render={() => (
                                        <EditPosts event={event} key={event.id} />
                                    )}
                                />
                            </Switch>
                        ))}
                        <Switch>
                            <Route
                                exact
                                path="/dashboard/users"
                                render={() => (
                                    <DashboarUsers />
                                )}
                            />
                        </Switch>
                        <Switch>
                            <Route
                                exact
                                path="/dashboard/sales"
                                render={() => (
                                    <DashboardSales />
                                )}
                            />
                        </Switch>
                        <Switch>
                            <Route
                                exact
                                path="/dashboard/ads"
                                render={() => (
                                    <DashboardAds />
                                )}
                            />
                        </Switch>
                        {ads.map((ad) => (
                            <Switch>
                                <Route
                                    exact
                                    path={`/dashboard/edit/ads/${ad.id}`}
                                    render={() => (
                                        <EditAds ad={ad} key={ad.id} />
                                    )}
                                />
                            </Switch>
                        ))}
                        <Switch>
                            <Route
                                exact
                                path="/dashboard/mails"
                                render={() => (
                                    <DashboardMails />
                                )}
                            />
                        </Switch>
                        <Switch>
                            <Route
                                exact
                                path="/dashboard/tasks"
                                render={() => (
                                    <DashboardTasks />
                                )}
                            />
                        </Switch>
                        {myTasks.map((task) => (
                            <Switch>
                                <Route
                                    exact
                                    path={`/dashboard/edit/tasks/${task.id}`}
                                    render={() => (
                                        <EditTasks task={task} key={task.id} />
                                    )}
                                />
                            </Switch>
                        ))}
                        <Switch>
                            <Route
                                exact
                                path="/dashboard/cv"
                                render={() => (
                                    <DashboardCv />
                                )}
                            />
                        </Switch>
                        <Switch>
                            <Route
                                exact
                                path="/dashboard/settings"
                                render={() => (
                                    <DashboardSettings />
                                )}
                            />
                        </Switch>
                    </div>

                    {/* <DashboardPosts />
                    <DashboarUsers /> */}
                </div>
            </div>
        </div>
    )
}
export default AdminDashboard