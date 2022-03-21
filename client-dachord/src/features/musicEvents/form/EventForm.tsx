import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';


export default observer( function EventForm(){

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
        event.id ? updateEvent(event) : createEvent(event);
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
                <Button floated='right' type='button' content='Cancel'/>

            </Form>
        </Segment>
    )
})