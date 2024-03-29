import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { Router  } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { createBrowserHistory } from 'history';
import ScrollTop from './app/layout/ScrollTop';


export const history = createBrowserHistory();

ReactDOM.render(
  /*Commented strictmode to overcome 
   * the 3rd party deprecated implementation warnings*/

    /*<React.StrictMode>*/
    <StoreContext.Provider value={store}>
        <Router history={history}>
            <ScrollTop/>
            <App />
        </Router>
        
    </StoreContext.Provider>
    
  /*</React.StrictMode>*/,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
