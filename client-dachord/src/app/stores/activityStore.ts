import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity, ActivityFormValues } from "../models/activity";
import { format } from "date-fns";
import { store } from "./store";
import { Profile } from "../models/profile";


export default class ActivityStore {
    musicEventsRegistry = new Map<string, Activity>();
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

    get activitiesByDate() {
        return Array.from(this.musicEventsRegistry.values()).sort((a, b) => {
            return a.date!.getTime() - b.date!.getTime();
        })
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((musicEvents, event) => {
                const date = format(event.date!, 'dd MMM yyyy');
                musicEvents[date] = musicEvents[date] ? [...musicEvents[date], event] : [event];
                return musicEvents;
            }, {} as {[key: string]: Activity[] })
        )
    }

    private getMusicEvent = (id: string) => {
        return this.musicEventsRegistry.get(id);
    }

    private setMusicEvent = (event: Activity) => {
        const user = store.userStore.user;
        if (user) {
            event.isGoing = event.attendees!.some(
                a => a.username === user.username
            )
            event.isHost = event.hostUsername === user.username;
            event.host = event.attendees?.find(x => x.username === event.hostUsername);

        }
        event.date = new Date(event.date!);
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


    createEvent = async (musicEvent: ActivityFormValues) => {

        const user = store.userStore.user;
        const attendee = new Profile(user!);

        try {
            await agent.MusicEvents.create(musicEvent);
            const newEvent = new Activity(musicEvent);
            newEvent.hostUsername = user!.username;
            newEvent.attendees = [attendee];
            this.setMusicEvent(newEvent);

            runInAction(() => {
                this.selectedEvent = newEvent;
            })

        } catch (error) {
            console.log(error);
           
            
        }
    }

    updateEvent = async (musicEvent: ActivityFormValues) => {
        
        try {
            await agent.MusicEvents.update(musicEvent);
            runInAction(() => {
                if (musicEvent.id) {
                    let updatedEvent = { ...this.getMusicEvent(musicEvent.id), ...musicEvent }
                    this.musicEventsRegistry.set(musicEvent.id, updatedEvent as Activity);
                    this.selectedEvent = updatedEvent as Activity;
                }
                
                
            })
        } catch (error) {
            console.log(error);
            
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

    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.MusicEvents.join(this.selectedEvent!.id);
            runInAction(() => {
                if (this.selectedEvent?.isGoing) {
                    this.selectedEvent.attendees = this.selectedEvent.attendees?.filter(
                        a => a.username !== user?.username
                    );
                    this.selectedEvent.isGoing = false;
                }
                else {
                    const attendee = new Profile(user!);
                    this.selectedEvent?.attendees?.push(attendee);
                    this.selectedEvent!.isGoing = true;
                   
                }

                this.musicEventsRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
            })
        } catch (error) {
            console.log(error);
        }
        finally {
            // Always turn off loading when finished
            runInAction(() => this.loading = false);
        }
    }


    cancelEventToggle = async () => {
        this.loading = true;
        try {
            await agent.MusicEvents.join(this.selectedEvent!.id);
            runInAction(() => {
                this.selectedEvent!.isCancelled = !this.selectedEvent?.isCancelled;
                this.musicEventsRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }



    }

}