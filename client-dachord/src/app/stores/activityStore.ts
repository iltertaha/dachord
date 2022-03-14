import { makeObservable, observable } from "mobx";

export default class ActivityStore {
    title = 'Hello from mobx';

    constructor() {
        makeObservable(this, {
            title: observable
        })
    }
}