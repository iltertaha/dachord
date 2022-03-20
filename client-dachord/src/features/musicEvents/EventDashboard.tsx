import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {Grid } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Activity } from '../../app/models/activity';
import { useStore } from '../../app/stores/store';
import EventDetails from './details/EventDetails';
import EventList from './EventList';
import EventForm from './form/EventForm';



export default observer( function EventDashboard() {

    const { activityStore } = useStore();
    const { selectedEvent, isEditable } = activityStore;

    // destructure only activityStore from the whole store

    useEffect(() => {
        activityStore.loadActivities();
        // todo (will be tested)
        // loading icon appears during second add operation
        // setSubmitting(false);

        // notice empty dependency [] to avoid endless loop
        // runs only one time
    }, [activityStore])






    if (activityStore.loadingInitial) return <LoadingComponent content='Loading Dachord App' />


    return(
        <Grid>
            <Grid.Column width="10">
                <EventList/>
            </Grid.Column>
            <Grid.Column width="6">
               <h2> Filter Events </h2>
            </Grid.Column>
        </Grid>


    )
})