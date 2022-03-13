import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(response => {
    return sleep(1000).then(() => {
        return response;
    }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
    });
})

//const responseBody = (response: AxiosResponse) => response ? response.data : [];
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
        get: <T> (url: string) => axios.get<T>(url).then(responseBody),
        post: <T> (url: string, body: { }) => axios.post<T>(url, body).then(responseBody),
        put: <T> (url: string, body: { }) => axios.put<T>(url, body).then(responseBody),
        delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const MusicEvents = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities/', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/activities/${id}`)
}

const agent = {
    MusicEvents
}

export default agent;