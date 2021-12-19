import React from 'react';
import { List,Grid } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';
import EventDetails from './details/EventDetails';
import EventList from './EventList';
import EventForm from './form/EventForm';

interface Props{
    musicEvents: Activity[];
    selectedEvent: Activity | undefined;
    selectEvent: (id: string) => void;
    cancelSelectEvent: () => void;

}

export default function EventDashboard({musicEvents,selectedEvent,
                                           selectEvent,cancelSelectEvent} : Props){
    return(
        <Grid>
            <Grid.Column width="10">
                <EventList musicEvents ={musicEvents} selectEvent={selectEvent}/>
            </Grid.Column>
            <Grid.Column width="6">
                {selectedEvent && <EventDetails musicEvent={selectedEvent} cancelSelectEvent={cancelSelectEvent}/> }
                <EventForm />
            </Grid.Column>
        </Grid>


    )
}