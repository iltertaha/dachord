import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Activity, ActivityFormValues } from '../models/activity';
import { history } from '../../index';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get'
                && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            
            
            break;
        case 401:
            toast.error('unauthorised', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;
        case 404:
            history.push('not-found');
            /*toast.error('not found', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });*/
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            // toast.error('server error', { theme: "colored" });
            break;
    }
    return Promise.reject(error);
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
    create: (activity: ActivityFormValues) => requests.post<void>('/activities/', activity),
    update: (activity: ActivityFormValues) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/activities/${id}`),
    join: (id: string) => requests.post<void>(`/activities/${id}/join`, {})
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)

}


const agent = {
    MusicEvents,
    Account
}

export default agent;