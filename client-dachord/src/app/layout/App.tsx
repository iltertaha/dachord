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


    useEffect(() => {
        agent.MusicEvents.list().then(response => {
            let activities: Activity[] = [];
            response.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                activities.push(activity);
            })
             
            setEvents(response);
            setLoading(false);

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
        event.id
            ? setEvents([...events.filter(x => x.id !== event.id),event])
            : setEvents([...events,{...event,id: uuid()}]);
        setIsEditable(false);
        setSelectedEvent(event);

    }

    function handleDeleteEvent(id: string){
        setEvents([...events.filter(x => x.id !== id)]);
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
              />
            </Container>

      
    </>
  );
}

export default App;
