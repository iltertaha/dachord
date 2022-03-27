import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';

export default observer( function EventForm(){
    const history = useHistory();
    const { activityStore } = useStore();
    const { createEvent, updateEvent, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    const [event, setEvent] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        location: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(event => setEvent(event!))
    }, [id, loadActivity])

    

    function handleSubmit() {
        if (event.id.length === 0) {
            let newEvent = {
                ...event,
                id: uuid()
            };
            createEvent(newEvent).then(() => {
                history.push(`/musicEvents/${newEvent.id}`);
            })
        }
        else {
            updateEvent(event).then(() => {
                history.push(`/musicEvents/${event.id}`);
            })
        }
    }

    function handleInputChange(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = e.target;
        setEvent({...event, [name] : value})
    }

    if (loadingInitial) return <LoadingComponent content='Loading Music Event...'/>


    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder = 'Title' value={event.title} name="title" onChange={handleInputChange}/>
                <Form.TextArea placeholder = 'Description' value={event.description} name="description" onChange={handleInputChange}/>
                <Form.Input placeholder = 'Category' value={event.category} name="category" onChange={handleInputChange}/>
                <Form.Input type='date' placeholder = 'Date' value={event.date} name="date" onChange={handleInputChange} />
                <Form.Input placeholder = 'Location'  value={event.location} name="location" onChange={handleInputChange}/>
                <Form.Input placeholder = 'Venue' value={event.venue} name="venue" onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={ Link} to='/musicEvents' floated='right' type='button' content='Cancel'/>

            </Form>
        </Segment>
    )
})