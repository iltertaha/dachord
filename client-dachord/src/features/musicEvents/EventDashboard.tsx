import { observer } from 'mobx-react-lite';
import React from 'react';
import {Grid } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';
import { useStore } from '../../app/stores/store';
import EventDetails from './details/EventDetails';
import EventList from './EventList';
import EventForm from './form/EventForm';

interface Props{
    musicEvents: Activity[];
    deleteEvent: (id: string) => void;
    submitting: boolean;
}

export default observer( function EventDashboard({ musicEvents, deleteEvent, submitting }: Props) {

    const { activityStore } = useStore();
    const { selectedEvent, isEditable } = activityStore;
    return(
        <Grid>
            <Grid.Column width="10">
                <EventList
                    musicEvents={musicEvents}
                    
                    deleteEvent={deleteEvent}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width="6">
                {selectedEvent && !isEditable && <EventDetails/> }
                {isEditable && <EventForm/>}
            </Grid.Column>
        </Grid>


    )
})