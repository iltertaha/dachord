import React, {useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Button, Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import EventDashboard from '../../features/musicEvents/EventDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
    // destructure only activityStore from the whole store
    const { activityStore } = useStore();

    const [events, setEvents] = useState<Activity[]>([]);
    const [submitting, setSubmitting] = useState(false);


    useEffect(() => {
        activityStore.loadActivities();
      // todo (will be tested)
     // loading icon appears during second add operation
       // setSubmitting(false);

        // notice empty dependency [] to avoid endless loop
        // runs only one time
}, [activityStore])

    


    function handleDeleteEvent(id: string) {
        setSubmitting(true);
        agent.MusicEvents.delete(id).then(() => {
            setEvents([...events.filter(x => x.id !== id)]);
            setSubmitting(false);

        })
        
    }

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading Dachord App' />


  return (
      <>
          <NavBar/>
          <Container style={{ marginTop: '7em' }}>          
              <EventDashboard
                  musicEvents={activityStore.musicEvents}
                  deleteEvent={handleDeleteEvent}
                  submitting={submitting}

              />
            </Container>

      
    </>
  );
}

export default observer(App);
