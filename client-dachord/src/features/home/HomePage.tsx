import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <Segment inverted textAlign="center" vertical className="intropage">
            <Container>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    D'achord
                </Header>
                <Header as='h2' inverted content="Welcome to D'achord!" />
                <Button as={Link} to='/musicEvents' size='huge' inverted> Take me to the musical events</Button>
            </Container>
        </Segment>
        )
}