import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/musicEvents/EventDashboard';
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
              <EventDashboard/>
            </Container>

      
    </>
  );
}

export default observer(App);
