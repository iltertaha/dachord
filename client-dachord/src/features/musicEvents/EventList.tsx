import React, { SyntheticEvent, useState } from 'react';
import {Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';

interface Props {
    musicEvents: Activity[];
    selectEvent: (id: string) => void;
    deleteEvent: (id: string) => void;
    submitting: boolean;
}

export default function EventList({musicEvents, selectEvent,deleteEvent,submitting} : Props) {
    const [target, setTarget] = useState('');

    function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteEvent(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {musicEvents.map(m => (
                    <Item key={m.id}>

                        <Item.Content>
                            <Item.Header as='a'>{m.title}</Item.Header>
                            <Item.Meta>{m.date}</Item.Meta>
                            <Item.Description>
                                <div>{m.description}</div>
                                <div>{m.location}, {m.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectEvent(m.id)} floated="right" content="Show" color="blue" />
                                <Button
                                    name={ m.id}
                                    loading={submitting && target === m.id}
                                    onClick={(e) => handleEventDelete(e,m.id)}
                                    floated="right"
                                    content="Remove"
                                    color="red" />
                                <Label basic content={m.category}/>
                            </Item.Extra>
                        </Item.Content>

                    </Item>
                ))}
            </Item.Group>
        </Segment>)
}

