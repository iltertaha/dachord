import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    musicEvents: Activity[] = [];
    // can be null type
    selectedEvent: Activity | undefined = undefined;
    isEditable = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        // infer types whether action(method)
            // or observable(property)
        makeAutoObservable(this)
    }

    // use arrow func
    // otherwise, explicit bound is necessary to use "this"

    // dont have to use async await
    loadActivities = async () => {
        this.setLoadingInitial(true);

        try {
            const activities = await agent.MusicEvents.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.musicEvents.push(activity);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }

    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectEvent = (id: string) => {
        this.selectedEvent = this.musicEvents.find(x => x.id === id);

    }

    cancelSelectedEvent = () => {
        this.selectedEvent = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectEvent(id) : this.cancelSelectedEvent();
        this.isEditable = true;
    }

    closeForm = () => {
        this.isEditable = false;
    }

    createEvent = async (musicEvent: Activity) => {
        this.loading = true;
        musicEvent.id = uuid();
        try {
            await agent.MusicEvents.create(musicEvent);
            runInAction(() => {
                this.musicEvents.push(musicEvent);
                this.selectedEvent = musicEvent;
                this.isEditable = false;
                this.loading = false;

            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
            
        }
    }

    updateEvent = async (musicEvent: Activity) => {
        this.loading = true;
        try {
            await agent.MusicEvents.update(musicEvent);
            runInAction(() => {
                this.musicEvents = [...this.musicEvents.filter(x => x.id !== musicEvent.id), musicEvent];
                this.selectedEvent = musicEvent;
                this.isEditable = false;
                this.loading = false;
                
                this.musicEvents.push(musicEvent);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }

    }

    deleteEvent = async (id: string) => {
        this.loading = true;
        try {
            await agent.MusicEvents.delete(id);
            runInAction(() => {
                this.musicEvents = [...this.musicEvents.filter(x => x.id !== id)];
                // to avoid showing the event after deletion
                if (this.selectedEvent?.id === id) {
                    this.cancelSelectedEvent();
                }
                this.loading = false;
            })
        } catch (error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}