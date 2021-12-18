import React from 'react';
import { List,Grid } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';

interface Props{
    musicEvents: Activity[];
}

export default function ActivityDashboard({musicEvents} : Props){
    return(
        <Grid.Column width="10">
            <List style={{marginTop:'7em'}}>
                {musicEvents.map(activity => (
                    <List.Item key={activity.id}>
                        {activity.title}

                    </List.Item>))}
            </List>
        </Grid.Column>
    )
}