import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";


export default class ActivityStore {
    musicEventsRegistry = new Map<string, Activity>();
    // can be null type
    selectedEvent: Activity | undefined = undefined;
    isEditable = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        // infer types whether action(method)
            // or observable(property)
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.musicEventsRegistry.values()).sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date);
        })
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((musicEvents, event) => {
                const date = event.date;
                musicEvents[date] = musicEvents[date] ? [...musicEvents[date], event] : [event];
                return musicEvents;
            }, {} as {[key: string]: Activity[] })
        )
    }

    private getMusicEvent = (id: string) => {
        return this.musicEventsRegistry.get(id);
    }

    private setMusicEvent = (event: Activity) => {
        event.date = event.date.split('T')[0];
        this.musicEventsRegistry.set(event.id, event);
    }
    // use arrow func
    // otherwise, explicit bound is necessary to use "this"

    // dont have to use async await
    loadActivities = async () => {
        this.loadingInitial = true;


        try {
            const activities = await agent.MusicEvents.list();
            activities.forEach(activity => {
                this.setMusicEvent(activity);
            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }

    }

    loadActivity = async (id: string) => {
        let event = this.getMusicEvent(id);
        if (event) {
            this.selectedEvent = event;
            return event;
        }
        else {
            this.loadingInitial = true;
            try {
                event = await agent.MusicEvents.details(id);
                this.setMusicEvent(event);
                runInAction(() => {
                    this.selectedEvent = event;
                })
                
                this.setLoadingInitial(false);
                return event;

            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createEvent = async (musicEvent: Activity) => {
        this.loading = true;
        try {
            await agent.MusicEvents.create(musicEvent);
            runInAction(() => {
                this.musicEventsRegistry.set(musicEvent.id,musicEvent);
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
                this.musicEventsRegistry.set(musicEvent.id, musicEvent);
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

    deleteEvent = async (id: string) => {
        this.loading = true;
        try {
            await agent.MusicEvents.delete(id);
            runInAction(() => {
                this.musicEventsRegistry.delete(id);
                // to avoid showing the event after deletion
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