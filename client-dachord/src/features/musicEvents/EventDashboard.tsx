import React from 'react';
import { List,Grid } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';
import EventList from './EventList';

interface Props{
    musicEvents: Activity[];
}

export default function EventDashboard({musicEvents} : Props){
    return(
        <Grid.Column width="10">
            <EventList musicEvents ={musicEvents}/>
        </Grid.Column>
    )
}