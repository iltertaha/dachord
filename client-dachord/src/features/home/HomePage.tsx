import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <Container style={{marginTop: '7em'}}>
            <h1>Home Page</h1>
            <h3>Take me to the <Link to='/musicEvents'>Music Events</Link></h3>
        </Container>
        )
}