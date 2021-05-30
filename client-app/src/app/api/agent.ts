import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { IEvent } from '../models/event';
import { IUser } from '../models/user';
import { IAd } from '../models/ad';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;
const sleep = (ms: number) =>(response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
}

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`)
}

const Events = {
    list: (): Promise<IEvent[]> => requests.get('/events'),
    details: (id: string) => requests.get(`/events/${id}`),
    create: (event: IEvent) => requests.post('/events', event),
    update: (event: IEvent) => requests.put(`/events/${event.id}`, event),
    delete: (id: string) => requests.delete(`/events/${id}`)
}

const Users = {
    list: (): Promise<IUser[]> => requests.get('/users'),
    details: (id: string) => requests.get(`/users/${id}`),
    create: (user: IUser) => requests.post('/users', user),
    update: (user: IUser) => requests.put(`/users/${user.id}`, user),
    delete: (id: string) => requests.delete(`/users/${id}`)
}

const Ads = {
    list: (): Promise<IAd[]> => requests.get('/ads'),
    details: (id: string) => requests.get(`/ads/${id}`),
    create: (ad: IAd) => requests.post('/ads', ad),
    update: (ad: IAd) => requests.put(`/ads/${ad.id}`, ad),
    delete: (id: string) => requests.delete(`/ads/${id}`)
}

export default {
    Activities, Events, Users, Ads
}