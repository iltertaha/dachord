import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import HomePage from '../../features/home/HomePage';
import EventDetails from '../../features/musicEvents/details/EventDetails';
import EventDashboard from '../../features/musicEvents/EventDashboard';
import EventForm from '../../features/musicEvents/form/EventForm';

import NavBar from './NavBar';

function App() {
  

  return (
      <>
          <NavBar/>
          <Container style={{ marginTop: '7em' }}>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/musicEvents' component={EventDashboard} />
              <Route path='/musicEvents/:id' component={EventDetails} />
              <Route path='/createEvent' component={EventForm} />
            </Container>

      
    </>
  );
}

export default observer(App);
