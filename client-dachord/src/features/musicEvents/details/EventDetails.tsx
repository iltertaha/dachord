import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';



export default observer( function EventDetails() {

    const { activityStore } = useStore();
    const { selectedEvent: musicEvent, loadActivity, loadingInitial, clearSelectedEvent } = activityStore;
    const { id } = useParams<{id: string}>();


    useEffect(() => {
        if (id) loadActivity(id);
        return () => clearSelectedEvent();

    }, [id, loadActivity, clearSelectedEvent]);

    if (loadingInitial || !musicEvent) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={6}>
                <EventDetailedSidebar activity={musicEvent!} />
            </Grid.Column>
            <Grid.Column width={10}>
                <EventDetailedHeader event={musicEvent} />
                <EventDetailedInfo event={musicEvent} />
                <EventDetailedChat activityId={musicEvent.id} />
            </Grid.Column>
            
        </Grid>
    )
})