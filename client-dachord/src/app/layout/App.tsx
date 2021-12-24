import React, {Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import {Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import EventDashboard from '../../features/musicEvents/EventDashboard';


function App() {
    const [events, setEvents] = useState<Activity[]>([]);
    const [selectedEvent,setSelectedEvent] = useState<Activity | undefined>(undefined);
    const [isEditable,setIsEditable] = useState(false);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/Activities').then(response => {
            setEvents(response.data);
            console.log(response);

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
              />
            </Container>

      
    </>
  );
}

export default App;
