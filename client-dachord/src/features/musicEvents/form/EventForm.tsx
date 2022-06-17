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

    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required.')
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
                        <FormField>
                            <Field placeholder='Title' name="title" />
                            <ErrorMessage name="title"
                                render={error => <Label basic color='red'
                                content={error} />} />
                        </FormField>
                        
                        <Field placeholder='Description'  name="description"  />
                        <Field placeholder='Category' name="category"  />
                        <Field type='date' placeholder='Date'  name="date"  />
                        <Field placeholder='Location' name="location"  />
                        <Field placeholder='Venue' name="venue"  />
                        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/musicEvents' floated='right' type='button' content='Cancel' />

                    </Form>
                    
                    )}
            </Formik>
            
        </Segment>
    )
})