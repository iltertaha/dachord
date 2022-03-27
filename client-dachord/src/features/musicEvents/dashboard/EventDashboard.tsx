import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import EventFilters from './EventFilters';
import EventList from './EventList';


export default observer( function EventDashboard() {

    const { activityStore } = useStore();
    const { loadActivities, musicEventsRegistry } = activityStore;

    // destructure only activityStore from the whole store

    useEffect(() => {
        if (musicEventsRegistry.size <= 1) {
            activityStore.loadActivities();
        } 
        // todo (will be tested)
        // loading icon appears during second add operation
        // setSubmitting(false);

        // notice empty dependency [] to avoid endless loop
        // runs only one time

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicEventsRegistry.size, loadActivities])






    if (activityStore.loadingInitial) return <LoadingComponent content='Loading Dachord App' />


    return(
        <Grid>
            <Grid.Column width="10">
                <EventList/>
            </Grid.Column>
            <Grid.Column width="6">
               <EventFilters/>
            </Grid.Column>
        </Grid>


    )
})