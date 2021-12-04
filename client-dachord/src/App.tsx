import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/Activities').then(response => {
            setActivities(response.data);
            console.log(response);

        })
        // notice empty dependency [] to avoid endless loop
        // runs only one time
    },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
              <ul>
                  {activities.map((activity: any) => (
                      <li key={activity}>
                          {activity.title}

                      </li>))}
              </ul>
      </header>
    </div>
  );
}

export default App;
