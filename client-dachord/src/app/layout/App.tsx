import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Header, List } from 'semantic-ui-react';

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
      <div>
    
      <Header as='h2' icon='users' content='dachord' />
          <List>
              {activities.map((activity: any) => (
                  <List.Item key={activity}>
                      {activity.title}

                  </List.Item>))}
          </List>
      
    </div>
  );
}

export default App;
