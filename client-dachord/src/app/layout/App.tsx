import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import HomePage from '../../features/home/HomePage';
import EventDetails from '../../features/musicEvents/details/EventDetails';
import EventDashboard from '../../features/musicEvents/dashboard/EventDashboard';
import EventForm from '../../features/musicEvents/form/EventForm';

import NavBar from './NavBar';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';

function App() {
    const location = useLocation();



  return (
      <>
          <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
          <Route exact path='/' component={HomePage} />
          <Route
              path={'/(.+)'}
              render={() => (<>
                  <NavBar />
                  <Container style={{ marginTop: '7em' }}>
                      <Switch>
                          <Route exact path='/musicEvents' component={EventDashboard} />
                          <Route path='/musicEvents/:id' component={EventDetails} />
                          <Route key={location.key} path={['/createEvent', '/manage/:id']} component={EventForm} />
                          <Route path='/errors' component={TestErrors} />
                          <Route path='/server-error' component={ServerError} />
                          <Route path='/login' component={LoginForm} />
                          <Route component={NotFound} />
                      </Switch>
                      
                  </Container>
              </>)}
          />

          

      
    </>
  );
}

export default observer(App);
