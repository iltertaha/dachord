import React, {Fragment, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import EventDashboard from '../../features/musicEvents/EventDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
    const [events, setEvents] = useState<Activity[]>([]);
    const [selectedEvent,setSelectedEvent] = useState<Activity | undefined>(undefined);
    const [isEditable,setIsEditable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);


    useEffect(() => {
        agent.MusicEvents.list().then(response => {
            let activities: Activity[] = [];
            response.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                activities.push(activity);
            })
             
            setEvents(response);
            setLoading(false);

            // todo (will be tested)
            // loading icon appears during second add operation
            setSubmitting(false);

        })
        // notice empty dependency [] to avoid endless loop
        // runs only one time
    },[])

    function handleSelectEvent(id: string) {
        setSelectedEvent(events.find( x => x.id === id));
    }

    function handleCancelSelectEvent() {
        setSelectedEvent(undefined);
    }

    function handleFormOpen(id?: string){
        id ? handleSelectEvent(id) : handleCancelSelectEvent();
        setIsEditable(true);
    }

    function handleFormClose(){
        setIsEditable(false);

    }

    function handleCreateOrEditEvent(event:Activity){
        // update if exists
        // add if not exists
        setSubmitting(true);
        if (event.id) {
            agent.MusicEvents.update(event).then(() => {
                setEvents([...events.filter(x => x.id !== event.id), event])
                setSelectedEvent(event);
                setIsEditable(false);
                setSubmitting(false);
            })

        }
        else {
            event.id = uuid();
            agent.MusicEvents.create(event).then(() => {
                setEvents([...events, event]);
                setSelectedEvent(event);
                setIsEditable(false);
                setSubmitting(false);
            })
        }

        

    }

    function handleDeleteEvent(id: string) {
        setSubmitting(true);
        agent.MusicEvents.delete(id).then(() => {
            setEvents([...events.filter(x => x.id !== id)]);
            setSubmitting(false);

        })
        
    }

    if (loading) return <LoadingComponent content='Loading Dachord App' />


  return (
      <>
          <NavBar openForm={handleFormOpen}/>
            <Container style={{marginTop: '7em'}}>
              <EventDashboard
                  musicEvents={events}
                  selectedEvent={selectedEvent}
                  selectEvent={handleSelectEvent}
                  cancelSelectEvent={handleCancelSelectEvent}
                  isEditable={isEditable}
                  openForm={handleFormOpen}
                  closeForm={handleFormClose}
                  createOrEdit={handleCreateOrEditEvent}
                  deleteEvent={handleDeleteEvent}
                  submitting={submitting}

              />
            </Container>

      
    </>
  );
}

export default App;
