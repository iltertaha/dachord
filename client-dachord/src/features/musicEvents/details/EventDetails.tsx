import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {Button, Card, Grid, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';



export default observer( function EventDetails() {

    const { activityStore } = useStore();
    const { selectedEvent: musicEvent, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{id: string}>();


    useEffect(() => {
        if (id) loadActivity(id);

    },[id,loadActivity] );

    if (loadingInitial || !musicEvent) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={6}>
                <EventDetailedSidebar />
            </Grid.Column>
            <Grid.Column width={10}>
                <EventDetailedHeader event={musicEvent} />
                <EventDetailedInfo event={musicEvent} />
                <EventDetailedChat />
            </Grid.Column>
            
        </Grid>
    )
})