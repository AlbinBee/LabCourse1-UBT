import React, { Component, Fragment } from 'react'
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

const AdminDashboard = () => {
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