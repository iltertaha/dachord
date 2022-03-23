import { observer } from 'mobx-react-lite';
import {Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import EventListItem from './EventListItem';



export default observer(function EventList() {
    const { activityStore } = useStore();
    const { activitiesByDate } = activityStore;



    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(m => (
                    <EventListItem key={ m.id} event={m} />
                ))}
            </Item.Group>
        </Segment>)
})

