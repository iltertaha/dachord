import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {Button, FormField, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';


export default observer( function EventForm(){
    const history = useHistory();
    const { activityStore } = useStore();
    const { createEvent, updateEvent, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    const [event, setEvent] = useState <Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        location: '',
        venue: ''
    });

    

    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required.'),
        description: Yup.string().required("The event description is required."),
        category: Yup.string().required(),
        location: Yup.string().required(),
        date: Yup.string().required(),
        venue: Yup.string().required()
    })

    useEffect(() => {
        if (id) loadActivity(id).then(event => setEvent(event!))
    }, [id, loadActivity])

    

    /*function handleSubmit() {
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
    }*/

    if (loadingInitial) return <LoadingComponent content='Loading Music Event...'/>


    return(
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={event}
                onSubmit={values => console.log(values)}>
                {({ handleSubmit }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name="title" placeholder="Title"/>
                        
                        <MyTextArea rows={3} placeholder='Description' name="description" />
                        <MySelectInput options={categoryOptions} placeholder='Category' name="category" />
                        <MyDateInput
                            placeholderText='Date'
                            name="date"
                            showTimeSelect
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                        <MyTextInput placeholder='Location' name="location"  />
                        <MyTextInput placeholder='Venue' name="venue"  />
                        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/musicEvents' floated='right' type='button' content='Cancel' />

                    </Form>
                    
                    )}
            </Formik>
            
        </Segment>
    )
})