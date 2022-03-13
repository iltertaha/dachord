import React from 'react';
import {Grid } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';
import EventDetails from './details/EventDetails';
import EventList from './EventList';
import EventForm from './form/EventForm';

interface Props{
    musicEvents: Activity[];
    selectedEvent: Activity | undefined;
    selectEvent: (id: string) => void;
    cancelSelectEvent: () => void;
    isEditable: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (event: Activity) => void;
    deleteEvent: (id: string) => void;
    submitting: boolean;
}

export default function EventDashboard({musicEvents,selectedEvent,
                                           selectEvent,cancelSelectEvent,
                                                isEditable,openForm,closeForm,
                                                    createOrEdit, deleteEvent,
                                                    submitting} : Props){
    return(
        <Grid>
            <Grid.Column width="10">
                <EventList
                    musicEvents={musicEvents}
                    selectEvent={selectEvent}
                    deleteEvent={deleteEvent}
                />
            </Grid.Column>
            <Grid.Column width="6">
                {selectedEvent && !isEditable && <EventDetails
                                    musicEvent={selectedEvent}
                                    cancelSelectEvent={cancelSelectEvent}
                                    openForm={openForm}
                /> }
                {isEditable && <EventForm

                    closeForm={closeForm}
                    event={selectedEvent}
                    createOrEdit={createOrEdit}
                    submitting={submitting}                />}
            </Grid.Column>
        </Grid>


    )
}