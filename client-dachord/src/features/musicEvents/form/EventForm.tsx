import React from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import {Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    event: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (event:Activity) => void;
}


export default function EventForm({event:selectedEvent,closeForm,createOrEdit}:Props){

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
        createOrEdit(event)
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
                <Form.Input placeholder = 'Date' value={event.date} name="date" onChange={handleInputChange} />
                <Form.Input placeholder = 'Location'  value={event.location} name="location" onChange={handleInputChange}/>
                <Form.Input placeholder = 'Venue' value={event.venue} name="venue" onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>

            </Form>
        </Segment>
    )
}