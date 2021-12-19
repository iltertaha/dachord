import React from 'react';
import { List,Grid } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';
import EventDetails from './details/EventDetails';
import EventList from './EventList';
import EventForm from './form/EventForm';

interface Props{
    musicEvents: Activity[];
}

export default function EventDashboard({musicEvents} : Props){
    return(
        <Grid>
            <Grid.Column width="10">
                <EventList musicEvents ={musicEvents}/>
            </Grid.Column>
            <Grid.Column width="6">
                {musicEvents[0] && <EventDetails musicEvent={musicEvents[0]}/> }
                <EventForm />
            </Grid.Column>
        </Grid>


    )
}