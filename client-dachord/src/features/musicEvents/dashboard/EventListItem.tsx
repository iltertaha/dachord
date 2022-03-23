import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Item, Label } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store';


interface Props {
    event: Activity;

}

export default function EventListItem({ event }: Props) {
    const { activityStore } = useStore();
    const { deleteEvent, loading } = activityStore;


    const [target, setTarget] = useState('');

    function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteEvent(id);
    }

    return (
        <Item key={event.id}>

            <Item.Content>
                <Item.Header as='a'>{event.title}</Item.Header>
                <Item.Meta>{event.date}</Item.Meta>
                <Item.Description>
                    <div>{event.description}</div>
                    <div>{event.location}, {event.venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button as={Link} to={`/musicEvents/${event.id}`} floated="right" content="Show" color="blue" />
                    <Button
                        name={event.id}
                        loading={loading && target === event.id}
                        onClick={(e) => handleEventDelete(e, event.id)}
                        floated="right"
                        content="Remove"
                        color="red" />
                    <Label basic content={event.category} />
                </Item.Extra>
            </Item.Content>

        </Item>
        )
}