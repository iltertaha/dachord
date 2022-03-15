import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
    musicEvents: Activity[] = [];
    // can be null type
    selectedEvent: Activity | null = null;
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
}