import { computed, makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile, UserEvent } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploadingPhoto = false;
    loading = false;
    followings: Profile[] = [];
    loadingFollowings: boolean = false;
    currentTab = 0;
    userEvents: UserEvent[] = [];
    loadingEvents = false;

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.currentTab, currentTab => {
                if (currentTab === 3 || currentTab === 4) {
                    const predicate = currentTab === 3 ? 'followers' : 'following';
                    this.loadFollowings(predicate);
                }
                else {
                    this.followings = [];
                }
            }
        )
    }

    setCurrentTab = (currentTab: any) => {
        this.currentTab = currentTab;
    }

    get isCurrentUser() {

        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    uploadPhoto = async (file: Blob) => {
        this.uploadingPhoto = false;
        try {
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMainPhoto && store.userStore.user) {
                        store.userStore.setPhoto(photo.url);
                        this.profile.image = photo.url;
                    }
                }

                this.uploadingPhoto = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploadingPhoto = false);
        }
    }

    setMainPhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.setPhoto(photo.url);
            runInAction(() => {
                
                if (this.profile && this.profile.photos) {
                    // Set current main photo to false
                    this.profile.photos.find(p => p.isMainPhoto)!.isMainPhoto = false;
                    // Set new photo as main photo
                    this.profile.photos.find(p => p.id === photo.id)!.isMainPhoto = true;
                    this.profile.image = photo.url;
                    this.loading = false;
                }
            });
        } catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);
        }

    }

    deletePhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => { this.loading = false; });
            console.log(error);
        }
    }


    // following property in the func signature is value that we will set the following to.
    updateFollowing = async (username: string, following: boolean) => {
        this.loading = true;
        try {
            await agent.Profiles.updateFollowing(username);
            store.activityStore.updateAttendeeFollowing(username);
            runInAction(() => {
                if (this.profile && this.profile.username !== store.userStore.user?.username
                    && this.profile.username !== username) {
                    following ? this.profile.followersCnt++ : this.profile.followersCnt--;
                    this.profile.following = !this.profile.following;
                }
                if (this.profile && this.profile.username === store.userStore.user?.username) {
                    following ? this.profile.followingCnt++ : this.profile.followingCnt--;
                }
                this.followings.forEach(profile => {
                    if (profile.username === username) {
                        // profile.following indicates what the following status currently is.
                        profile.following ? profile.followersCnt-- : profile.followersCnt++;
                        profile.following = !profile.following;
                    }
                })
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => { this.loading = false; });

        }
    }

    loadFollowings = async (predicate: string) => {
        this.loadingFollowings = true;
        try {
            const followings = await agent.Profiles.listFollowings(this.profile!.username, predicate);
            runInAction(() => {
                this.followings = followings;
                this.loadingFollowings = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingFollowings = false; 
            })
        }
    }

    loadUserEvents = async (username: string, predicate?: string) => {
        this.loadingEvents = false;
        try {
            const events = await agent.Profiles.listEvents(username, predicate!);
            runInAction(() => {
                this.userEvents = events;
                this.loadingEvents = false;
            }) 

        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingEvents = false;
            })
        }
    }
}