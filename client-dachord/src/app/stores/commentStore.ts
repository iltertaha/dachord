import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatComment } from "../models/comment";
import { store } from "./store";

export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (activityId: string) => {
        if (store.activityStore.selectedEvent) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(process.env.REACT_APP_CHAT_URL +'?activityId=' + activityId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start()
                .catch(error => console.log("Error while creating signalr connection: ", error));

            this.hubConnection.on("LoadComments", (comments: ChatComment[]) => {
                // use run in action, since we are updating an observable
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z');
                    })
                    this.comments = comments;
                });

            });

            this.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt);
                    this.comments.push(comment);
                });
            } )

        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log("Error while stopping signalr connection: ", error));
    }

    // Clear comments when user disconnect
    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();

    }

    addComment = async (values: any) => {
        values.activityId = store.activityStore.selectedEvent?.id;
        try {
            await this.hubConnection?.invoke('SendComment', values);
        } catch (error) {
            console.log(error)
        }
    }
}