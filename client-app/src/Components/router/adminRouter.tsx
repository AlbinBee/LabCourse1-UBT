import { useEffect, useState } from 'react'
import { Switch, Route } from "react-router-dom";
import { history } from '../..';

import { IAd } from '../../app/models/ad';
import { ICategory } from '../../app/models/category';
import { IEvent } from '../../app/models/event';
import { IMyTask } from '../../app/models/myTask';

import agent from '../../app/api/agent';
import EditPosts from '../adminDashboard/dashboardPosts/editPosts';
import DashboardUsers from '../adminDashboard/dashboardUsers/dashboardUsers';
import MainDashboard from '../adminDashboard/mainDashboard/mainDashboard';
import DashboardPosts from '../adminDashboard/dashboardPosts/dashboardPosts';
import DashboardSales from '../adminDashboard/dashboardSales/dashboardSales';
import DashboardAds from '../adminDashboard/dashboardAds/dashboardAds';
import EditAds from '../adminDashboard/dashboardAds/editAds';
import DashboardMails from '../adminDashboard/dashboardMails/dashboardMails';
import DashboardTasks from '../adminDashboard/dashboardTasks/dashboardTasks';
import EditTasks from '../adminDashboard/dashboardTasks/editTasks';
import DashboardCv from '../adminDashboard/dashboardCv/dashboardCv';
import DashboardSettings from '../adminDashboard/dashboardSettings/dashboardSettings';
import CreatePost from '../adminDashboard/dashboardPosts/createPost';
import DashboardCategories from '../adminDashboard/dashboardCategories/dashboardCategories';
import EditCategories from '../adminDashboard/dashboardCategories/editCategories';
import CreateCategory from '../adminDashboard/dashboardCategories/createCategory';
import mainStates from '../../app/state/mainStates';
import { toast } from 'react-toastify';

const AdminRouter = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
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
        agent.Categories.list()
            .then(response => {
                // console.log(response);
                let categories: ICategory[] = [];
                response.forEach((category) => {
                    categories.push(category);
                })
                setCategories(categories)
            });
    }, []);
    const user = mainStates.user;

    if(user == null || !user.roles.includes("Admin")){
        history.push('/');
        toast.info("You don't have access there!")
    }
    return (
        <div className='routerContainer'>
            <Switch>
                <Route
                    exact
                    path="/dashboard/"
                    render={() => (
                        <MainDashboard />
                    )}
                />
                <Route
                    exact
                    path="/dashboard/posts"
                    render={() => (
                        <DashboardPosts />
                    )}
                />
                <Route
                    exact
                    path="/dashboard/posts/create"
                    render={() => (
                        <CreatePost events={events} categories={categories} />
                    )}
                />
                {events.map((event) => (
                    <Route
                        key={event.id}
                        exact
                        path={`/dashboard/posts/edit/${event.id}`}
                        render={() => (
                            <EditPosts event={event} events={events} key={event.id} />
                        )}
                    />
                ))}
                {categories.map((category) => (
                    <Route
                        key={category.id}
                        exact
                        path={`/dashboard/category/edit/${category.id as number}`}
                        render={() => (
                            <EditCategories category={category} categories={categories} key={category.id} />
                        )}
                    />
                ))}
                <Route
                    exact
                    path="/dashboard/categories"
                    render={() => (
                        <DashboardCategories />
                    )}
                />
                <Route
                    exact
                    path="/dashboard/categories/create"
                    render={() => (
                        <CreateCategory categories={categories} />
                    )}
                />
                <Route
                    exact
                    path="/dashboard/users"
                    render={() => (
                        <DashboardUsers />
                    )}
                />
                <Route
                    exact
                    path="/dashboard/sales"
                    render={() => (
                        <DashboardSales />
                    )}
                />
                <Route
                    exact
                    path="/dashboard/ads"
                    render={() => (
                        <DashboardAds />
                    )}
                />
                {ads.map((ad) => (
                    <Route
                        key={ad.id}
                        exact
                        path={`/dashboard/edit/ads/${ad.id}`}
                        render={() => (
                            <EditAds ad={ad} key={ad.id} />
                        )}
                    />
                ))}
                <Route
                    exact
                    path="/dashboard/mails"
                    render={() => (
                        <DashboardMails />
                    )}
                />
                <Route
                    exact
                    path="/dashboard/tasks"
                    render={() => (
                        <DashboardTasks />
                    )}
                />
                {myTasks.map((task) => (
                    <Route
                        key={task.id}
                        exact
                        path={`/dashboard/edit/tasks/${task.id}`}
                        render={() => (
                            <EditTasks task={task} key={task.id} />
                        )}
                    />
                ))}
                <Route
                    exact
                    path="/dashboard/cv"
                    render={() => (
                        <DashboardCv />
                    )}
                />
                <Route
                    exact
                    path="/dashboard/settings"
                    render={() => (
                        <DashboardSettings />
                    )}
                />
            </Switch>
        </div>
    );
}


export default AdminRouter