import React from 'react';
import {Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';

interface Props {
    musicEvents: Activity[];
    selectEvent: (id: string) => void;
    deleteEvent: (id: string) => void;
}

export default function EventList({musicEvents, selectEvent,deleteEvent} : Props) {
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
                                <Button onClick={() => selectEvent(m.id)} floated="right" content="Show" color="blue"/>
                                <Button onClick={() => deleteEvent(m.id)} floated="right" content="Remove" color="red"/>
                                <Label basic content={m.category}/>
                            </Item.Extra>
                        </Item.Content>

                    </Item>
                ))}
            </Item.Group>
        </Segment>)
}

