import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import {Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';
import { useStore } from '../../app/stores/store';



export default observer(function EventList() {
    const { activityStore } = useStore();
    const { deleteEvent, musicEvents, loading } = activityStore;


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
                                <Button onClick={() => activityStore.selectEvent(m.id)} floated="right" content="Show" color="blue" />
                                <Button
                                    name={ m.id}
                                    loading={loading && target === m.id}
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
})

