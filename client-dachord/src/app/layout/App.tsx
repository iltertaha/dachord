import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/musicEvents/EventDashboard';
import EventForm from '../../features/musicEvents/form/EventForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import NavBar from './NavBar';

function App() {
    // destructure only activityStore from the whole store
    const { activityStore } = useStore();

    useEffect(() => {
        activityStore.loadActivities();
      // todo (will be tested)
     // loading icon appears during second add operation
       // setSubmitting(false);

        // notice empty dependency [] to avoid endless loop
        // runs only one time
}, [activityStore])

    


    

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading Dachord App' />


  return (
      <>
          <NavBar/>
          <Container style={{ marginTop: '7em' }}>
              <Route exact path='/' component={HomePage} />
              <Route path='/musicEvents' component={EventDashboard} />
              <Route path='/createEvent' component={EventForm} />
            </Container>

      
    </>
  );
}

export default observer(App);
