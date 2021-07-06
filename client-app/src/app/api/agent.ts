import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { IEvent } from '../models/event';
import { IListUser, IUser, IUserFormValues } from '../models/user';
import { IAd } from '../models/ad';
import { IEmail } from '../models/email';
import { IMyTask } from '../models/myTask';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IPhoto, IProfile } from '../models/profile';
import { ICategory } from '../models/category';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token')!;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    Promise.reject(error);
})

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network Error - make sure API is running!')
    }
    const { status, data, config } = error.response
    if (error.response !== undefined) {
        if (status === 400) {
            history.push('/notfound');
            toast.error('There was a problem with your request!')
        }
        if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
            history.push('/notfound');
            toast.error('There was a problem with your request!')
        }
        if (status === 500) {
            toast.error('Server Error - check terminal!')
            toast.error('There was a problem with the server!')
        }
        throw error.response;
    }
    // console.log(axios.interceptors.response);
})

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post(url, formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(responseBody)
    }
};

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
const Categories = {
    list: (): Promise<ICategory[]> => requests.get('/categories'),
    details: (id: number) => requests.get(`/categories/${id}`),
    create: (category: ICategory) => requests.post('/categories', category),
    update: (category: ICategory) => requests.put(`/categories/${category.id}`, category),
    delete: (id: number) => requests.delete(`/categories/${id}`)
}

const User = {
    list: (): Promise<IListUser[]> => requests.get('/users'),
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user)
}

const Profiles = {
    // list: (): Promise<IProfile[]> => requests.get('/profiles'),
    get: (username: string): Promise<IProfile> => requests.get(`/profiles/${username}`),
    uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos`, photo),
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
    updateProfile: (profile: Partial<IProfile>) => requests.put(`/profiles`, profile)
}

const Ads = {
    list: (): Promise<IAd[]> => requests.get('/ads'),
    details: (id: string) => requests.get(`/ads/${id}`),
    create: (ad: IAd) => requests.post('/ads', ad),
    update: (ad: IAd) => requests.put(`/ads/${ad.id}`, ad),
    delete: (id: string) => requests.delete(`/ads/${id}`)
}

const Emails = {
    list: (): Promise<IEmail[]> => requests.get('/emails'),
    details: (id: string) => requests.get(`/emails/${id}`),
    create: (email: IEmail) => requests.post('/emails', email),
    update: (email: IEmail) => requests.put(`/emails/${email.id}`, email),
    delete: (id: string) => requests.delete(`/emails/${id}`)
}

const MyTasks = {
    list: (): Promise<IMyTask[]> => requests.get('/mytasks'),
    details: (id: string) => requests.get(`/mytasks/${id}`),
    create: (myTask: IMyTask) => requests.post('/mytasks', myTask),
    update: (myTask: IMyTask) => requests.put(`/mytasks/${myTask.id}`, myTask),
    delete: (id: string) => requests.delete(`/mytasks/${id}`)
}



export default {
    Activities, Events, User, Profiles, Ads, Emails, MyTasks, Categories
}