import React, {Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import {Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import EventDashboard from '../../features/musicEvents/EventDashboard';


function App() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/Activities').then(response => {
            setActivities(response.data);
            console.log(response);

        })
        // notice empty dependency [] to avoid endless loop
        // runs only one time
    },[])
  return (
      <>
          <NavBar/>
            <Container style={{marginTop: '7em'}}>
              <EventDashboard musicEvents={activities}/>
            </Container>

      
    </>
  );
}

export default App;
