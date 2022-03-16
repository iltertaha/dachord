import { observer } from 'mobx-react-lite';
import React from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import {Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';


export default observer( function EventForm(){

    const { activityStore } = useStore();
    const { selectedEvent, closeForm, createEvent, updateEvent, loading } = activityStore;

    const initialState = selectedEvent ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        location:'',
        venue: ''
    }

    const [event,setEvent] = useState(initialState);

    function handleSubmit() {
        event.id ? updateEvent(event) : createEvent(event);
    }

    function handleInputChange(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = e.target;
        setEvent({...event, [name] : value})
    }


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
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>

            </Form>
        </Segment>
    )
})