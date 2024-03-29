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
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import LoginForm from '../../features/users/LoginForm';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';

function App() {
    const location = useLocation();
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        }
        else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore])


    if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

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
          <ModalContainer/>

          <Route exact path='/' component={HomePage} />
          <Route
              path={'/(.+)'}
              render={() => (<>
                  <NavBar />
                  <Container style={{ marginTop: '7em' }}>
                      <Switch>
                          <PrivateRoute exact path='/musicEvents' component={EventDashboard} />
                          <PrivateRoute path='/musicEvents/:id' component={EventDetails} />
                          <PrivateRoute key={location.key} path={['/createEvent', '/manage/:id']} component={EventForm} />
                          <PrivateRoute path='/profiles/:username' component={ProfilePage} />
                          {/*<PrivateRoute path='/errors' component={TestErrors} />*/}
                          {/*<Route path='/server-error' component={ServerError} />*/}
                          {/*<Route path='/login' component={LoginForm} />*/}
                          <Route component={NotFound} />
                      </Switch>
                      
                  </Container>
              </>)}
          />

          

      
    </>
  );
}

export default observer(App);
